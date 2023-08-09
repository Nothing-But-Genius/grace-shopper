import React from "react";
import { connect } from "react-redux";
import { createUser } from "../store/user";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    // Bind the methods
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();

    const { username, password } = this.state;
    this.props.createUser({ username, password });
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="username" placeholder="username"></label>
        <input
          name="username"
          value={username}
          onChange={this.handleFormChange}></input>
        <label htmlFor="password" placeholder="password"></label>
        <input
          name="password"
          value={password}
          onChange={this.handleFormChange}></input>
        <button type="submit">Register</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(CreateUser);
