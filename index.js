const {
  json,
} = require('micro')
const micro = require('micro')

const PORT = process.env.PORT || 3000
let values = "[[0, 0, 0], [0, 0, 0], [0, 0, 0]]"
const checkForNullValues = (...values) =>
  values.some(value => value !== null)

const checkValues = (...values) =>
  values.every((value) => values[0] === value) &&
  checkForNullValues(values)
//changed to >= 5 


const isValid = board =>
  board.length >= 5 &&
  board.length <= 9

const checkRows = board =>
  checkValues(board[0], board[1], board[2]) ||
  checkValues(board[3], board[4], board[5]) ||
  checkValues(board[6], board[7], board[8])

const checkColumns = board =>
  checkValues(board[0], board[3], board[6]) ||
  checkValues(board[1], board[4], board[7]) ||
  checkValues(board[2], board[5], board[8])

const checkDiagonals = board =>
  checkValues(board[0], board[4], board[8]) ||
  checkValues(board[2], board[4], board[6])

const hasWon = (board = []) =>
  isValid(board) && (
    checkRows(board) ||
    checkColumns(board) ||
    checkDiagonals(board)
  )

const format = (board) =>
  typeof (board) === 'string' ?
    board.split(' ') :
    board.flat()

const server = micro(async (req, res) => {
  const {
    input,
  } = await json(req)
  
  console.log(input)
  const formatted = format(input)
  console.log(formatted)
  
  return {
    won: hasWon(formatted),
  }
})

server.listen(PORT)
