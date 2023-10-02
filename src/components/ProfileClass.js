import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // Create state
    this.state = {
      userInfo: {
        name: "Dummy name",
        location: "Dummy location",
      },
    };
    console.log("Constructor " + this.props.name);
  }
  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/akshaymarch7");
    const json = await data.json();
    console.log(json);
    this.setState({
      userInfo: json,
    });
    this.timer = setInterval(() => {
      console.log("Set Interval");
    }, 1000);
    console.log("componentDidMount " + this.props.name);
  }
  componentDidUpdate() {
    console.log("Component Did Update");
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    console.log("Component Will Unmount");
  }
  render() {
    console.log("render " + this.props.name);
    return (
      <div>
        <h2>Profile Class Component</h2>
        <img src={this.state?.userInfo?.avatar_url} />
        <h3>Name: {this.state?.userInfo?.name}</h3>
        <h3>Location: {this.state?.userInfo?.location}</h3>
        {/* <button
          onClick={() => {
            // We Do Not Mutate State Directly
            // Never Do this.state = something
            this.setState({
              count: this.state.count + 1,
              count2: 2,
            });
          }}
        >
          SetCount
        </button> */}
      </div>
    );
  }
}
/**
 * Child - Constructor
 * Child - render
 * Child componentDidMount
 *
 * API call
 * set State
 * DOM updates
 * Child - render
 *
 * Component Did Update
 * componentWillUnmount
 */
export default Profile;
