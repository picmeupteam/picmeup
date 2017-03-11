import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';

const Main = props => {

  const { children, handleClick, user } = props;
  // const loggedIn = !!user.id;

  const styles = {
    navbar: {
      background: '#21282F',
    },
    h4: {
      color: '#EFB4A8'
    }
  }

  return (
    <div>

    <nav className="bar navbar navbar-default" style={styles.navbar}>
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/home"><h4 style={styles.h4}>PicMe♥p</h4></Link>
        </div>
      </div>
    </nav>
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
