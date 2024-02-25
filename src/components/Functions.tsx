/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

/*Matriz criadora da tabela*/
const createBoard = (rows, columns) => {
  return Array(rows).fill(0).map((_, row) => {
   return Array(columns).fill(0).map((_, column) => {
      return {
         row,
         column,
         opened: false,
         flagged: false,
         mined: false,
         exploded: false,
         nearMines: 0,
      };
   });
  });
};
/*Matriz que espalha as minas com bomba*/
const spreadMines = (board, minesAmount) => {
   const rows = board.length;
   const columns = board[0].length;
   let minesPlanted = 0;
   while (minesPlanted < minesAmount){
      const rowSel = parseInt(Math.random() * rows, 10);
      const columnSel = parseInt(Math.random() * columns, 10);

      if (!board[rowSel][columnSel].mined){
         board[rowSel][columnSel].mined = true;
         minesPlanted++;
      }
   }
};
/**Cria uma tabela com campos e campos minados */
const createMinedBoard = (rows, columns, minesAmount) => {
   const board = createBoard(rows, columns);
   spreadMines(board, minesAmount);
   return board;
};

const cloneBoard = board => {
return board.map(rows => {
   return rows.map(field => {
      return {...field};
   });
});
}


/*Método pra ssaber a vizinhança*/// eslint-disable-next-line no-unreachable
const getNeighbors = (board, row, column) => {
   const neighbors = [];
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const rows = [row - 1, row, row + 1];
   const columns = [column - 1, column, column + 1];
   rows.forEach(r => {
      columns.forEach(c => {
         const diferent = r !== row || c !== column
         const validRow = r >=0 && r < board.length
         const validColumn = c >=0 && c < board[0].length
         if(diferent && validRow && validColumn){
            neighbors.push(board[r][c])
         }
      })
      
   })
   return neighbors
};
/*Método que verifica se os campos vizinhos são seguros*/
const safeNeighboorhood = (board, row, column) => {
   const safes = (result, neighbor) => result && !neighbor.mined
   return getNeighbors(board, row, column).reduce(safes, true)
}

/*Método para abrir os campos adjacentes seguros de forma recursiva*/
const openField = (board, row, column) => {
   const field = board[row][column]
   if(!field.opened){
      field.opened = true
      if(field.mined){
         field.exploded = true
      }else if(safeNeighboorhood(board, row, column)){
         getNeighbors(board, row, column)
         .forEach(n => openField(board, n.row, n.column))
      }else{
         const neighbors = getNeighbors(board, row, column)
         field.nearMines = neighbors.filter(n => n.mined).length
      }
   }
}
/**Função arrow que transforma o board em um array 
 * Recebe um Board de entrada, e retorna os campos em forma de array
 * Concat
 * 
*/
const fields = board => [].concat(...board)
/**Função que verifica se algum campo com mina foi explodido */
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0

const pendding = field => (field.mined && field.flagged) || (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pendding).length === 0

const showMines = board => fields(board).filter(field => field.mined).forEach(f => f.opened = true)
const invertFlag = (board, row, column) => {
   const field = board[row][column]
   field.flagged = !field.flagged;
}

const flagsUsed = (board) => fields(board).filter(field => field.flagged).length
export {
   createMinedBoard,
   cloneBoard,
   openField,
   hadExplosion,
   wonGame,
   showMines,
   invertFlag,
   flagsUsed,

};
