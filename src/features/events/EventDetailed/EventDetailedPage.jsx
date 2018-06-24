import React, { Component } from "react";
import { withFirestore } from "react-redux-firebase";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import EventDetailedHeader from "./EventDetailedHeader";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { objectToArray } from "../../../app/common/util/helper";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";

const mapStateToProps = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event,
    auth: state.firebase.auth
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
            event={event}
            isHost={isHost}
            isGoing={isGoing}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapStateToProps,
    actions
  )(EventDetailedPage)
);
