import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedEvents from "./UserDetailedEvents";
import { userDetailedQuery } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEvents, followUser, unfollowUser } from "../userActions";

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    events: state.events,
    eventsLoading: state.async.loading,
    following: state.firestore.ordered.following
  };
};

const actions = {
  getUserEvents,
  followUser,
  unfollowUser
};

class UserDetailedPage extends Component {
  async componentDidMount() {
    let events = await this.props.getUserEvents(this.props.userUid);
    console.log(events);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      events,
      eventsLoading,
      followUser,
      following,
      unfollowUser
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    const isFollowing = !isEmpty(following);
   

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar
          isEmpty={isFollowing}
          profile={profile}
          followUser={followUser}
          isCurrentUser={isCurrentUser}
          unfollowUser={unfollowUser}
          isFollowing={isFollowing}
        />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedEvents
          changeTab={this.changeTab}
          events={events}
          eventsLoading={eventsLoading}
        />
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  firestoreConnect((auth, userUid, match) =>
    userDetailedQuery(auth, userUid, match)
  )
)(UserDetailedPage);
