import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailedSidebar = ({
  isCurrentUser,
  profile,
  followUser,
  isFollowing,
  unfollowUser
}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button
            as={Link}
            to="/settings"
            color="purple"
            fluid
            basic
            content="Edit Profile"
          />
        )}
        {!isCurrentUser &&
          !isFollowing && (
            <Button
              onClick={() => followUser(profile)}
              color="purple"
              fluid
              basic
              content="Follow user"
            />
          )}

        {!isCurrentUser &&
          isFollowing && (
            <Button
              onClick={() => unfollowUser(profile)}
              color="purple"
              fluid
              basic
              content="Unfollow"
            />
          )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
