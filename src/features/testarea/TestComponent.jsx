import React, { Component } from "react";
import { connect } from "react-redux";
import { Button,Icon } from "semantic-ui-react";
import { incrementCounter, decrementCounter } from "./testActions";
import Script from "react-load-script";
import GoogleMapReact from "google-map-react";


const Marker=()=><Icon name='marker' size='big' color='red' />


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
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    const { incrementCounter, decrementCounter, data } = this.props;
    console.log(data);
    return (
      <div>
        {/* <Script
          url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAlJkKTW3QtbZwf4ptO04ybfZq3mdkuwNY&libraries=places`}
          onLoad={this.handleScriptLoad}
        /> */}
        <h1>Test Area</h1>
        <h1>The answer is {data}</h1>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <div style={{ height: "300px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAlJkKTW3QtbZwf4ptO04ybfZq3mdkuwNY"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
              <Marker
              lat={59.12312}
              lng={30.12312}
              text={'Kreyser Avrora'}
              />
          </GoogleMapReact>
        </div>
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
