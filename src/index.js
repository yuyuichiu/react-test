import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Game } from "./Components/game";

document.title = "Tic Tac Toe";

// The ultimate render to the real DOM
ReactDOM.render(
    <Game></Game>,
    document.getElementById('root')
);