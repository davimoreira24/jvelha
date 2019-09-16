import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons';


export default class GameScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gameState:  [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
      playerX: true,
      playerO: false,
      totalMoves: 0,
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
      playerX: true,
      playerO: false,
      totalMoves: 0,
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

    //checando diagonais
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum === 3) {return 1}
    else if (sum === -3) {return -1}

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if (sum === 3) {return 1}
    else if (sum === -3) {return -1}

    //Sem ganhadores

    return 0;

  }
  onTilePress = (row, col) => {
    //Sem mudança de titulos
    this.state.totalMoves++;
    if(this.state.totalMoves === 9){
      alert("Jogador X Ganhou");
         
        this.initializeGame();
    }
    let value = this.state.gameState[row][col]
    if (value !== 0) { return }
    let currentPlayer = this.state.currentPlayer;

    //Setando o titulo correto

    let arr = this.state.gameState.slice()
    arr[row][col] = currentPlayer;
    this.setState({
      gameState: arr,
    })

    //Troca pra outro player
    let nextPlayer = (currentPlayer === 1) ? -1 : 1
    this.setState({
      currentPlayer: nextPlayer,
    })
    if (currentPlayer == 1) {
        this.setState({
            playerO: true,
            playerX:false
          })
       } else if (currentPlayer == -1){
        this.setState({
            playerX: true,
            playerO:false
          })
       }
    //Vencedor
    let winner = this.getWinnerPlayer()
    if (winner == 1) {
      alert("Jogador X Ganhou");
      this.initializeGame();
    }
    else if (winner == -1) {
      alert("Jogador O Ganhou");
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
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <View style={styles.banner}>
          <Text style={styles.title}>Jogo da Velhazada</Text>
        </View> 
        <View style={{paddingBottom: 20}}>
        {this.state.playerX && <Text style={{fontSize: 30, color:'red'}}>Jogador X</Text> }
        {this.state.playerO && <Text style={{fontSize: 30, color:'green'}}>Jogador O</Text>}
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
          <Button 
          title="Novo Jogo" 
          onPress={() => this.initializeGame()} 
          color='black'></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  banner:{
      marginBottom: 20, 
      backgroundColor: 'yellow', 
      width: 365,
      alignItems: 'center',
      justifyContent: 'center',
    }
});
