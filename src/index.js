import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';

require('file-loader?name=[name].[ext]!./index.html');

ReactDOM.render(<App />, document.getElementById('root'));
