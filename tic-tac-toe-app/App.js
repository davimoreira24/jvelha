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
              <Text style={{fontSize: 40}}>Jogo da Velha</Text>
            </View>
            <View>
              <Image
                source={{ uri: 'https://media0.giphy.com/media/3o85xu3OLHOVvzZNra/giphy.gif'}}
                style={styles.img}
                resizeMode='cover'
              />
            </View>
            <View style={{paddingTop: 40}}>
            <Button 
            title="Bora jogar!" 
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
    backgroundColor: '#325ca8'
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

