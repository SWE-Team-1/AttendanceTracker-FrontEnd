import React from 'react'
import ReactDOM from 'react-dom';
import App from '../js/App.js'


test('renders without crashing', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
});


