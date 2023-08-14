import React from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../store/user';

class AllUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h2>All Users</h2>
        <ul></ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
