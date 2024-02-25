/* eslint-disable prettier/prettier */
import React from 'react';
import Flag from './components/Flag';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default props => {
   return (
  <View style={styles.container}>
    <View style={styles.flagContainer}>
      <TouchableOpacity onPress={props.onFlagPress} style={styles.flagButton}>
        <Flag bigger />
      </TouchableOpacity>
      <Text style={styles.flagsLeft}> = {props.flagsLeft}</Text>
    </View>
    <TouchableOpacity style={styles.button} onPress={props.onNewGame}>
      <Text style={styles.buttonLabel}>Novo Jogo</Text>
    </TouchableOpacity>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   flexDirection: 'row',
   backgroundColor: '#FFFFFF',
   alignItems: 'center',
   justifyContent: 'space-around',
   paddingTop: 20,
   paddingHorizontal: 20,
  },
  flagContainer: {
   flexDirection: 'row',
  },
  flagButton: {
   marginTop: 10,
   minWidth: 30,
  },
  button: {
   backgroundColor: '#ddd',
   padding: 5,
   margin: 5
  },
  flagsLeft: {
   fontSize: 20,
   fontWeight: 'bold',
   paddingTop: 5,
   color: '#000',
   marginLeft: 20,

  },
  buttonLabel:{
   fontSize: 20,
   color: '#000',
   fontWeight: 'bold',
  },
});
