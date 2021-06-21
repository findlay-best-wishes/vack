import App from './App';
import React from 'react';
import ReactDom from 'react-dom';

document.title = require("../../package.json")["name"];
ReactDom.render(<App />, document.getElementById("app"));
