import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Game } from "./Components/game";
// import { MyComponent } from './App';



// The ultimate render to the real DOM
ReactDOM.render(
    <Game></Game>,
    document.getElementById('root')
);