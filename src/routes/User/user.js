import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  applyLeaveThunk,
  showMessageThunk,
  showUserThunk,
} from "../../features/user/userSlice";
import { logOutUser } from "../../features/login/loginSlice";
import NavBar from "../../Components/NavBar";

import "./user.css";
function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [leaveMessage, setLeaveMessage] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const loggedUser = useSelector((state) => state.auth.userId);
  const user = useSelector((state) => state.user.showUserData);
  const MessageNotification = useSelector((state) => state.user.messageData);

  const handleLogOut = () => {
    dispatch(logOutUser()).then(() => navigate("/login"));
  };
  useEffect(() => {
    dispatch(showUserThunk(loggedUser));
    dispatch(showMessageThunk(loggedUser));
  }, [loggedUser]);
  function calculateNumberOfDays() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1; // Add 1 to include both start and end dates
    return diffDays;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const numOfDays = calculateNumberOfDays();
    if (user.leave - numOfDays >= 0) {
      const applyRequest = {
        userId: user._id,
        message: leaveMessage,
        date: fromDate === toDate ? `${fromDate}` : `(${fromDate})-(${toDate})`,
        numberOfDates: numOfDays,
      };
      dispatch(applyLeaveThunk(applyRequest));
      setFromDate("");
      setToDate("");
      e.target.reset();
      setLeaveMessage("");
    } else {
      e.target.reset();
      setLeaveMessage("");
      setFromDate("");
      setToDate("");
      alert(`you only have ${user.leave} leaves left`);
    }
  };

  return (
    <div className="container">
      <NavBar showOne={user} handleLogOut={handleLogOut} />
      <div className="leave-application">
        <h3>Leave Application</h3>
        <p>
          <i>Number of leaves Available: {user.leave}</i>
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="user-textarea"
            placeholder="Enter your leave message..."
            value={leaveMessage}
            onChange={(e) => setLeaveMessage(e.target.value)}
            required
          ></textarea>
          <br />
          <label className="user-label">From Date</label>
          <br />
          <input
            type="date"
            className="user-input"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setFromDate(e.target.value);
              setToDate(e.target.value);
            }}
            required
          />
          <br />
          <label className="user-label">To Date</label>
          <br />
          <input
            type="date"
            className="user-input"
            min={fromDate}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="user-button">
            Apply for Leave
          </button>
        </form>
      </div>

      <h3>Leave Application</h3>
      <div className="user-messages">
        <table className="user-table">
          <thead>
            <tr>
              <th>Leave Message</th>
              <th>Leave Date</th>
              <th>Number of Dates</th>
              <th>Status</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {MessageNotification.map((message) => (
              <tr key={message._id}>
                <td>{message.userMessage}</td>
                <td>{message.leaveDate}</td>
                <td>{message.numberOfDates}</td>
                <td className={`status-${message.status}`}>
                  {message.status === "approved" ? (
                    <p>{message.status}</p>
                  ) : message.status === "rejected" ? (
                    <p>{`Rejected, ${message.adminMessage}`}</p>
                  ) : (
                    <p>Pending</p>
                  )}
                </td>
                <td>{new Date(message.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
