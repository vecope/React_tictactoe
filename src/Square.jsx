import React from "react";

function Square(props){
  if (props.bold) {
    return (
      <button
        className="square"
        onClick={props.onClick}
        style={{ color: "powderblue" }}
      >
        <i>{props.value}</i>
      </button>
    );
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}

export default Square;