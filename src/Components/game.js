import React from 'react'
import { Board } from "./board.js";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Next player: X',
      xIsNext: true,
      board: ['','','','','','','','',''],
      history: [],
    }
  }

  // onClick
  cellClicked(idx) {
    const squares = this.state.board.slice();
    if(squares[idx] !== '' || checkWin(squares)) return

    // Update the board
    let updatedHistory = this.state.history.slice().concat({ past: this.state.board })
    squares[idx] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      board: squares,
      status: `Next player: ${!this.state.xIsNext ? 'X' : 'O'}`,
      xIsNext: !this.state.xIsNext,
      history: updatedHistory
    })

    // Check win/tie conditions
    if(checkWin(squares)) {
      this.setState({ board: squares, status: `Winner: ${checkWin(squares)}` })
      return }
    if(!squares.includes('')) {
      this.setState({ board: squares, status: `Tie!` })
      return }
  }

  // Undo
  undo() {
    let localHistory = this.state.history.slice();
    if(localHistory.length < 1 || !localHistory) return

    // Update board and user status to previous step
    let newBoard = localHistory.pop().past;
    this.setState({
      board: newBoard,
      history: localHistory,
      status: `Next player: ${!this.state.xIsNext ? 'X' : 'O'}`,
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    let historyItem = this.state.history.slice();
    historyItem = historyItem.map((h, idx) => (
      <li><button className="undo" onClick={() => this.undo()}>{idx === 0 ? `Back to start` : `Go to step #${idx}`}</button></li>
    ));
    console.log(historyItem);

    return (
    <div className="game">
      <div className="game-board">
      <Board board={this.state.board} onClick={(i) => this.cellClicked(i)}/>
      </div>
      <div className="game-info">
      <div>{this.state.status}</div>
      <ul>{historyItem}</ul>
      </div>
    </div>
    );
  }
}

function checkWin(board) {
  // Possible ways to win
  const winPath = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]

  // return winner when win condition met
  let result = false;
  winPath.forEach((p) => {
    if(board[p[0]] === 'X' && board[p[1]] === 'X' && board[p[2]] === 'X') {
      result = 'X';
    } else if(board[p[0]] === 'O' && board[p[1]] === 'O' && board[p[2]] === 'O') {
      result = 'O';
    }
  })

  return result
}