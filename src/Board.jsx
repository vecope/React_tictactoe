import React from "react";
// import ReactDOM from "react-dom";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    // console.log(this.props.bold)
    return (
      <Square
        index={i}
        bold={this.props.bold.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const limit = 3;

    let squares = [];
    for (var i = 0; i < limit; i++) {
      let rows = [];
      for (var j = 0; j < limit; j++) {
        rows.push(<span key={i * 3 + j}>{this.renderSquare(i * 3 + j)}</span>);
      }
      squares.push(
        <div className="board-row" key={i}>
          {rows}
        </div>
      );
    }
    return (
      <div className="game-board">
        <div>{squares}</div>
      </div>
    );
  }
}

export default Board;
