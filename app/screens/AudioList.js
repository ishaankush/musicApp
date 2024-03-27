import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
export * as MediaLibrary from 'expo-media-library'

export default function AudioList() {
    
    const getPermission = async () =>{
        const permission = await MediaLibrary.getPermissionAsync()
        console.log(permission);
    };


  return (
    <View style={styles.container}>
      <Text>AudioList</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})