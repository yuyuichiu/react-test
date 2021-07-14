import React from 'react'
import { Board } from "./board.js";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Next player: X',
      xIsNext: true,
      step: 0,
      reverse: false,
      board: ['','','','','','','','',''],
      history: [{ past: ['','','','','','','','',''] }],
    }
  }

  // onClick
  cellClicked(idx) {
    // make a temp board for new changes
    const squares = this.state.board.slice();
    if(squares[idx] !== '' || checkWin(squares)) return

    // Update temp board
    squares[idx] = this.state.xIsNext ? 'X' : 'O';

    // Change the move history
    let newHistory = this.state.history.slice(0,this.state.step+1).concat({past: squares})

    // Reflect new changes to the ReactDON
    this.setState({
      board: squares,
      status: `Next player: ${!this.state.xIsNext ? 'X' : 'O'}`,
      xIsNext: !this.state.xIsNext,
      step: this.state.step + 1,
      history: newHistory,
    })
    styleUndoButtons(this.state.step + 1)

    // Check win/tie conditions
    if(checkWin(squares)) {
      this.setState({ board: squares, status: `Winner: ${checkWin(squares)}` })
      return }
    if(!squares.includes('')) {
      this.setState({ board: squares, status: `Tie!` })
      return }
  }

  // History Editing
  moveTimeline(idx) {
    // Edit the board to previous state
    let updatedNext = !this.state.reverse ? idx % 2 === 0 : !(idx % 2 === 0);
    this.setState({
      board: this.state.history[idx].past,
      step: idx,
      xIsNext: updatedNext,
      status: `Next player: ${updatedNext ? 'X' : 'O'}`
    })

    // Style the undo button and cells
    styleUndoButtons(idx)
    styleCells(this.state.history[idx].past);
  }

  // Swap player order
  swapOrder() {
    // Return if the current game was ended
    if(checkWin(this.state.board) || !this.state.board.includes('')) return

    // Flip the reverse switch and update the board
    let updatedBoard = this.state.board.slice();
    updatedBoard = updatedBoard.map(c => c === "X" ? "O" : c === "O" ? "X" : "");

    let updatedHistory = this.state.history.slice();
    updatedHistory = updatedHistory.map((h) => {
      return { past: h.past.map(c => c === "X" ? "O" : c === "O" ? "X" : "") }
    });

    this.setState({
      xIsNext: !this.state.xIsNext,
      status: `Next player: ${!this.state.xIsNext ? 'X' : 'O'}`,
      board: updatedBoard,
      history: updatedHistory,
      reverse: !this.state.reverse
    })
  }

  render() {
    let historyItem = this.state.history.slice();
    historyItem = historyItem.map((h, idx) => (
      <li key={idx}><button className="undo" onClick={() => this.moveTimeline(idx)}>{idx === 0 ? `To start` : `Go to step #${idx}`}</button></li>
    ));

    return (
    <div className="game">
      <div className="game-board">
      <Board board={this.state.board} onClick={(i) => this.cellClicked(i)}/>
      <button onClick={() => this.swapOrder()}>Switch Order</button>
      </div>
      <div className="game-info">
      <div>{this.state.status}</div>
      <ol>{historyItem}</ol>
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
  const cells = document.querySelectorAll('.square');
  cells.forEach((c) => c.classList.remove('victory'));

  // return winner when win condition met
  let result = false;
  winPath.forEach((p) => {
    if(board[p[0]] === 'X' && board[p[1]] === 'X' && board[p[2]] === 'X') {
      result = 'X';
      cells[p[0]].classList.add('victory')
      cells[p[1]].classList.add('victory')
      cells[p[2]].classList.add('victory')
      
    } else if(board[p[0]] === 'O' && board[p[1]] === 'O' && board[p[2]] === 'O') {
      result = 'O';
      cells[p[0]].classList.add('victory')
      cells[p[1]].classList.add('victory')
      cells[p[2]].classList.add('victory')
    }
  })

  return result
}

function styleUndoButtons(step) {
  const undoButtons = document.querySelectorAll("button.undo");
    undoButtons.forEach((btn, i) => {
      btn.classList.remove('pasted')
      btn.classList.remove('current')
      if(i > step) btn.classList.add("pasted");
      else if (i === step) btn.classList.add('current')
    })
}

function styleCells(board) {
  const cells = document.querySelectorAll('.square');
  cells.forEach((c) => c.classList.remove('victory'));
  checkWin(board);
}