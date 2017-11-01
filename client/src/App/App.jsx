import React, { Component } from 'react';
import Button from 'material-ui/Button';

import Container from '../Container';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 1,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let { selectedValue } = this.state;
    selectedValue += 1;
    this.setState({ selectedValue });
  }

  render() {
    const { selectedValue } = this.state;

    return (
      <div className="App">
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />

          <h2>GraphQL Demo</h2>
        </div>

        <p className="App-intro">
          Totals { selectedValue }
        </p>

        <Button raised color="primary" onClick={this.handleClick}>
          Primary
        </Button>

        <Container />

      </div>
    );
  }
}

export default App;
