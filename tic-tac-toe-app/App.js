import React from 'react';
import { StyleSheet, View, Text, Image, Button} from 'react-native';
import GameScreen from './components/GameScreen';


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      homeScreen: true,
      gameScreen: false,
    }
  }
  startButton = () => {
    this.setState({
      homeScreen: false,
      gameScreen: true,
    })
  }
  render() {
    return (
      <View style={styles.container}>
      {this.state.homeScreen &&   
        (
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={[styles.banner, {marginBottom: 40}]}>
              <Text style={{fontSize: 60, fontWeight: 'bold'}}>TIC TAC TOE</Text>
            </View>
            <View>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Tic_Tac_Toe.gif'}}
                style={styles.img}
              />
            </View>
            <View style={{paddingTop: 40}}>
            <Button 
            title="Let's Play!" 
            color= 'black'
            onPress={()=> this.startButton()}
            />
            </View>
          </View>
        )}
        {this.state.gameScreen && <GameScreen/>}
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
  banner: {
    width: 365,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    width: 270,
    height: 250,
    justifyContent: 'center',
    alignItems:'center'
  },
})

