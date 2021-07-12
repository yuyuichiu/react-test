import React from 'react';

export class Board extends React.Component {
  renderSquare(idx) {
    return <Square
      value={this.props.board[idx]}
      onClick={() => this.props.onClick(idx)}
    />
  }

  render() {
    // Return the board JSX
    return (
      <div>
        <div className="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

export class Square extends React.Component {
  render() {
      // Return the square, which its value references state of Board
      return (
        <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
        </button>
      )
  }
}
