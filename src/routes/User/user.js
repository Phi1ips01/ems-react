import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { showUserThunk } from '../../features/user/userSlice';

import { logOutUser } from '../../features/login/loginSlice';


function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.userId)
  const user = useSelector((state) => state.user.showUserData);
  console.log(user)
  const handleLogOut=()=>{
    dispatch(logOutUser()).then(()=>navigate('/login'))
    
    
  }
  useEffect(() => {
    dispatch(showUserThunk(loggedUser));
  }, [loggedUser]);

  const [leaveMessage, setLeaveMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user-dashboard">
      <div className="user-header">
        <img src={'./'} alt="Logo" className="user-logo" />
        <h2>Welcome back, {user.name} !</h2>
      </div>
      <div className="user-details">
        <h3>User Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>available leave: {user.leave}</p>

      </div>
      <div className="leave-application">
        <h3>Leave Application</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="user-textarea"
            placeholder="Enter your leave message..."
            value={leaveMessage}
            onChange={(e) => setLeaveMessage(e.target.value)}
          ></textarea>
          <button type="submit" className="user-button">Apply for Leave</button>
        </form>
      </div>
      <button className="user-logout" onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default User;
