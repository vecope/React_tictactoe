import React from "react";

function Info(props) {
	return (
		<div className="game-info">
					<div>{props.obj.status}</div>
					<div>
						Step: {props.obj.stepNumber} Current:{" "}
						{props.obj.currentStep}
					</div>
					<div>{props.obj.bolder}</div>
					<div>Last Move</div>
					<div>{props.obj.last}</div>
					<div>{props.obj.toggle}</div>
					<ol>{props.obj.moves}</ol>
				</div>
		);
}
export default Info;