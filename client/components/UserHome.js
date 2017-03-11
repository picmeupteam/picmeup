import React from 'react';
import { connect } from 'react-redux';

const UserHome = props => {

  const { user } = props;

  return (
    <div className='landing'>
      <h3>welcome, { user.email }</h3>
      <button type="button" className="btn btn-primary btn-lg">create new</button>
      <button type="button" className="btn btn-secondary btn-lg">view all</button>
    </div>
  );
}

const mapState = ({ user }) => ({ user });

export default connect(mapState)(UserHome);
