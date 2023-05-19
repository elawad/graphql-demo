import React from 'react';

import Container from '../Container';

import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>GraphQL Demo</h2>
    </div>

    {/*
    // <p className="App-intro">
    //   Totals { selectedValue }
    // </p>
    //
    // <Button raised color="primary" onClick={this.handleClick}>
    //   Primary
    // </Button>
    */}

    <Container />
  </div>
);

export default App;
