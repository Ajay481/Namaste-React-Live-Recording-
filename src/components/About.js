import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Profile from "./ProfileClass";
import ProfileFunctionalComponent from "./Profile";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent - Constructor");
  }
  componentDidMount() {
    // Best place to make an API call because it updates after render
    // console.log("Parent - componentDidMount");
  }
  render() {
    // console.log("Parent - render");
    return (
      <div>
        <h1>About Us</h1>
        <UserContext.Consumer>
          {({ user }) => (
            <h4>
              {user.name} - {user.email}
            </h4>
          )}
        </UserContext.Consumer>
        <div>This is a about page of namaste react of finding the path</div>
        {/* <Outlet /> */}
        {/* <ProfileFunctionalComponent name="Ajay" /> */}
        <Profile name="First Child" />
      </div>
    );
  }
}

// Parent - Constructor
// Parent - render
// First Child - Constructor
// First Child - render
// Second Child - Constructor
// Second Child - render
// DOM is updated for children
// First Child - componentDidMount
// Second Child - componentDidMount
// Parent - componentDidMount

export default About;
