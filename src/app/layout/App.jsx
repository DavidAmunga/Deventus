import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import EventForm from "../../features/events/EventForm/EventForm";
import EventDashboard from "../../features/events/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import UserDetailPage from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import HomePage from "../../features/home/HomePage";
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from '../../features/modals/ModalManager';
import {  UserIsAuthenticated} from '../../features/auth/authWrapper'

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/manage/:id" component={UserIsAuthenticated(EventForm)} />
                  <Route path="/people" component={UserIsAuthenticated(PeopleDashboard)} />
                  <Route path="/profile/:id" component={UserIsAuthenticated(UserDetailPage)} />
                  <Route path="/settings" component={UserIsAuthenticated(SettingsDashboard)} />
                  <Route path="/createEvent" component={UserIsAuthenticated(EventForm)} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
