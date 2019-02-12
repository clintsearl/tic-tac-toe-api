const {
  json
} = require('micro')
const micro = require('micro')

const checkValues = (...values) =>
  values.every((value) => values[0] === value)


// function checkRows(board) {


//   if (board[0] === board[1] === board[2]) return true
//   if (board[3] === board[4] === board[5]) return true
//   if (board[6] === board[7] === board[8]) return true

//   return false

// }

const checkRows = (board = ['', '']) => {
  // if (board[0] === board[1] === board[2]) return true
  // if (board[3] === board[4] === board[5]) return true
  // if (board[6] === board[7] === board[8]) return true

  // return false


  return checkValues(board[0], board[1], board[2]) ||
    checkValues(board[3], board[4], board[5]) ||
    checkValues(board[6], board[7], board[8])
}

const checkColumns = (board) => {
  return checkValues(board[0], board[3], board[6]) ||
    checkValues(board[1], board[4], board[7]) ||
    checkValues(board[2], board[5], board[8])
}

const checkDiagonals = (board) => {
  return checkValues(board[0], board[4], board[8]) ||
    checkValues(board[2], board[4], board[6])
}

const hasWon = (board) =>
  checkRows(board) ||
  checkColumns(board) ||
  checkDiagonals(board)


const format = (board) =>
  typeof (board) === 'string' ?
  board.split(' ') :
  board.flat()

const server = micro(async (req, res) => {
  const {
    input
  } = await json(req)
  
  console.log(input)
  const formatted = format(input)
  console.log(formatted)
  
  return {
    won: hasWon(formatted)
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT)
