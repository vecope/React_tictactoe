import React from "react";
import Board from "./Board";

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					number: 0,
					squares: Array(9).fill(null),
					lastMove: null
				}
			],
			stepNumber: 0,
			currentStep: 0,
			xIsNext: true
		};
	}

	jumpTo(step, real) {
		console.log("jumping to: " + step);
		this.setState({
			stepNumber: step,
			currentStep: real,
			xIsNext: step % 2 === 0
		});
	}

	upsideDown() {
		let newHistory = this.state.history.slice().reverse();
		let newStepNumber = newHistory.length - this.state.stepNumber - 1;

		this.setState({
			history: newHistory,
			stepNumber: newStepNumber
		});

		console.log(newHistory);
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		// Si ya está marcada la casilla, o alguno de los jugadores ganó, no hace nada.
		if (calculateWinner(squares)[0] || squares[i]) {
			return;
		}

		// Revisa de quien es el turno
		squares[i] = this.state.xIsNext ? "X" : "O";

		this.setState({
			history: history.concat([
				{
					number: history.length,
					squares: squares,
					lastMove: i
				}
			]),
			stepNumber: history.length,
			currentStep: this.state.currentStep + 1,
			xIsNext: !this.state.xIsNext
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares)[0];
		const winCas = calculateWinner(current.squares)[1];

		const toggle = (
			<button onClick={() => this.upsideDown()}>Reverse order</button>
		);

		const moves = history.map((step, move) => {
			const desc = step.number
				? "go to move # " + step.number
				: "go to start";

			// console.log(step.number);
			// console.log(move);

			if (step.number === this.state.currentStep) {
				return (
					<li key={step.number}>
						<button
							onClick={() => this.jumpTo(move, step.number)}
							style={{ color: "powderblue" }}
						>
							{desc}
						</button>
					</li>
				);
			} else {
				return (
					<li key={step.number}>
						<button onClick={() => this.jumpTo(move, step.number)}>
							{desc}
						</button>
					</li>
				);
			}
		});

		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else if (!winner && this.state.currentStep > 8) {
			status = "It's a Draw";
		} else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
		}

		let lastBoxNumber = [
			this.state.history[this.state.stepNumber].lastMove
		];

		// console.log(this.state.history[this.state.stepNumber]);
		// console.log("At pos: "+this.state.stepNumber);

		let lastColumn;
		let lastRow;

		if (lastBoxNumber != null) {
			lastColumn = (lastBoxNumber % 3) + 1;
			lastRow = Math.floor(lastBoxNumber / 3);
		} else {
			lastColumn = "None";
			lastRow = "None";
		}

		let last = "Row: " + lastRow + " Column: " + lastColumn;

		let bolder;

		if (winCas) {
			// console.log(winCas)
			lastBoxNumber = lastBoxNumber.concat(winCas);
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						bold={lastBoxNumber}
						onClick={i => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<div>
						Step: {this.state.stepNumber} Current:{" "}
						{this.state.currentStep}
					</div>
					<div>{bolder}</div>
					<div>Last Move</div>
					<div>{last}</div>
					<div>{toggle}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return [squares[a], lines[i]];
		}
	}
	return [null, null];
}

export default Game;
