/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Field from './components/Field';
import MinedField from './components/MinedField';
import params from './Params';
import {
   createMinedBoard,
   openField,
   cloneBoard,
   hadExplosion,
   wonGame,
   showMines,
   invertFlag,
   flagsUsed,


} from './components/Functions';
import Header from './Header';

export default class App extends React.Component {

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();

    return Math.ceil(columns * rows * params.difficultLevel);
  };
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  createState = () => {
    const rows = params.getRowsAmount();
    const cols = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
    // eslint-disable-next-line semi
    }
  };

  onOpenField = (row, column) => {
   const board = cloneBoard(this.state.board);
   openField(board, row, column);
   const lost = hadExplosion(board);
   const won = wonGame(board);

   if (lost){
      showMines(board);
      Alert.alert('Perdeu, otaario');
   }
   if (won){
      Alert.alert('Vc ganhou!!');
   }
   this.setState({board, lost, won});
  };

  onSelectField = (row, column) => {
   const board = cloneBoard(this.state.board);
   invertFlag(board, row, column);
   const won = wonGame(board);
   if (won){
      Alert.alert('Vc ganhou!!');
   }
   this.setState({board, won});
  };
  render() {
    return (
      <View style={style.container}>
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())}/>
        <View style={style.board}>
          <MinedField board={this.state.board} onOpenField={this.onOpenField} onSelectField={this.onSelectField} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
