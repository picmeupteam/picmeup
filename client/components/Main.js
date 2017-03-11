import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';

const Main = props => {

  const { children, handleClick, user } = props;
  const loggedIn = !!user.id;

  return (
    <div>
    <div className='bar'>
      <h1>PIC ME UP</h1>
      { loggedIn ?
          <div className = 'bar-links'>
            <Link to="/home">Home</Link>
            <a href="" onClick={handleClick}>Logout</a>
          </div> :
          <div className = 'bar-links'>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
      }
    </div>
    <hr />
      { children }
    </div>
  );
};

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
