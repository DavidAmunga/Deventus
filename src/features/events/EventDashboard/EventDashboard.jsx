import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import { deleteEvent } from "../eventActions";

const mapStateToProps = state => ({
  events: state.events
});
const actions = {
  deleteEvent
};

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList deleteEvent={this.handleDeleteEvent} events={events} />
          </Grid.Column>
          <Grid.Column width={6} />
        </Grid>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
