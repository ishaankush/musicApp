import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { LayoutProvider, RecyclerListView } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av';

export default class AudioList extends Component {
    
   static contextType = AudioContext;

   constructor(props){
    super(props);
    this.state = {
      optionModalVisible: false
    };
    this.currentItem = {}
   }
   layoutProvider = new LayoutProvider(
    i => 'audio',
    (type, dim)=>{
    dim.width = Dimensions.get('window').width;
    dim.height = 70;
   });

   handleAudioPress = (audio)=>{
    console.log(audio);
    const playbackobj = new Audio.Sound()
    playbackobj.loadAsync(({uri:audio.uri},{shouldPlay: true}));
    console.log('presses audio');
   };
   rowRenderer = (type, item)=>{
    return <AudioListItem title={item.title} duration={item.duration} onAudioPress={()=> this.handleAudioPress(item)} onOptionPress= {
      ()=> {
        this.currentItem = item;
        this.setState({...this.state, optionModalVisible: true})
      }
    }/>
   }

  render(){
  return (
   <AudioContext.Consumer>
    {({dataProvider})=>{
      return (
      <Screen>
        <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer}/>
        <OptionModal currentItem={this.currentItem} onClose={()=> this.setState({...this.state, optionModalVisible: false})} visible={this.state.optionModalVisible}/>
      </Screen>)
    }}
   </AudioContext.Consumer>
  )
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})