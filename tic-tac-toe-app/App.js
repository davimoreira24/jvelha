import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gameState:  [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    })
  }
  getWinnerPlayer = () =>{
    let sum;
    const numTiles = 3;
    let arr = this.state.gameState
    //check rows
    for (let i = 0; i < numTiles; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {return 1}
      else if (sum === -3) {return -1}
    }

    //check cols
    for (let i = 0; i < numTiles; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {return 1}
      else if (sum === -3) {return -1}
    }

    //check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum === 3) {return 1}
    else if (sum === -3) {return -1}

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if (sum === 3) {return 1}
    else if (sum === -3) {return -1}

    //There are no winners

    return 0;

  }
  onTilePress = (row, col) => {
    //Don't allow tiles to change
    let value = this.state.gameState[row][col]
    if (value !== 0) { return }
    let currentPlayer = this.state.currentPlayer;

    //Set the correct tile

    let arr = this.state.gameState.slice()
    arr[row][col] = currentPlayer;
    this.setState({
      gameState: arr,
    })

    //Switch to other player
    let nextPlayer = (currentPlayer === 1) ? -1 : 1
    this.setState({
      currentPlayer: nextPlayer,
    })

    //Check Winner
    let winner = this.getWinnerPlayer()
    if (winner == 1) {
      alert("Player 1 is the Winner");
      this.initializeGame();
    }
    else if (winner == -1) {
      alert("Player 2 is the Winner");
      this.initializeGame();
    }
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col]
    switch (value){
      case 1: 
      return <Icon name="close" style={styles.tileX}></Icon>;
      case -1:
      return <Icon name="circle-outline" style={styles.tileO}></Icon>;
      default:
      return <View />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingBottom: 50}}>
          <Text style={styles.title}>TIC TAC TOE</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
          </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth: 0}]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
           {this.renderIcon(1, 1)} 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth: 0}]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0}]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 50}}>
          <Button title="New Game" onPress={() => this.initializeGame()} style={styles.button}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 70,
  },
  tileO: {
    color: 'green',
    fontSize: 70,
  },
  title:{
    fontSize: 70,
    color: 'blue',
  }
});
