import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../modals/modalActions";

const actions = {
  openModal
};

const mapStateToProps = state => ({
  data: state.test.data
});

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };
  handleFormSubmit = event => {
    event.preventDefault();
  };

  onChange = address => {
    this.setState({ address });
  };

  render() {
    const { data, openModal } = this.props;
    console.log(data);
    return (
      <div>
        <Button
          onClick={() => openModal("TestModal", { data: 43 })}
          color="teal"
          content="Open Modal"
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(TestComponent);
