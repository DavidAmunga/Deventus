import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { incrementCounter, decrementCounter } from "./testActions";

class TestComponent extends Component {
  render() {
    const { incrementCounter, decrementCounter, data } = this.props;
    console.log(data);
    return (
      <div>
        <h1>Test Area</h1>
        <h1>The answer is {data}</h1>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
      </div>
    );
  }
}

const actions = {
  incrementCounter,
  decrementCounter
};

const mapStateToProps = state => ({
  data: state.test.data
});

export default connect(
  mapStateToProps,
  actions
)(TestComponent);
