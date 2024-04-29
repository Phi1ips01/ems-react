import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  showAllUsersThunk,
  addNewUserThunk,
  deleteUserThunk,
  updateUserThunk,
  showAdminThunk,
  replyMessageThunk,
  showAllMessagesThunk,
  showAllDeptsThunk,
  addNewDeptThunk,
} from "../../features/admin/adminSlice";
import { logOutUser } from "../../features/login/loginSlice";
import UserDetailsTable from "../../Components/userDetailsTable";
import NewUserForm from "../../Components/NewUserForm";
import AllMessagesTables from "../../Components/AllMessagesTables";
import NewDeptForm from "../../Components/NewDeptForm";
import NavBar from "../../Components/NavBar";

import "./admin.css";

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAllAdminData = useSelector((state) => state.admin.showAllAdminData);
  const showAllStatus = useSelector((state) => state.admin.showAllStatus);
  const showOneAdmin = useSelector((state) => state.admin.showOneAdminData);
  const showAllDeptsData = useSelector((state) => state.admin.showAllDeptsData);
  const replyingMessages = useSelector((state) => state.admin.replyingMessages);
  const repliedMessages = useSelector((state) => state.admin.repliedMessages);
  const loggedAdmin = useSelector((state) => state.auth.userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [rejectId, setRejectId] = useState("");
  const [selectedAdminId, setSelectedAdminId] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const handleLogOut = () => {
    dispatch(logOutUser()).then(() => navigate("/login"));
  };
  useEffect(() => {
    if (showAllStatus === "idle") {
      dispatch(showAllUsersThunk({ searchColumn: "", searchKeyword: "" }));
    }
    dispatch(showAllMessagesThunk());
    dispatch(showAllDeptsThunk());
  }, [showAllStatus]);
  useEffect(() => {
    dispatch(showAdminThunk(loggedAdmin));
  }, [loggedAdmin]);
  const handleFormSubmit = (e) => {
    let formData = {};
    e.preventDefault();
    for (let i = 0; i < e.target.length; i++) {
      formData = { ...formData, [e.target[i].name]: e.target[i].value };
    }
    dispatch(addNewUserThunk(formData));
    e.target.reset();
  };
  const handleDeleteRow = (adminId, top, left) => {
    setCalendarPosition({ top, left });
    setShowCalendar(true);
    setSelectedAdminId(adminId);
  };
  const handleUpdateRow = (userData) => {
    setSelectedUser(userData);
    setIsModalOpen(true);
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    let formData = {};
    for (let i = 0; i < e.target.length; i++) {
      formData = { ...formData, [e.target[i].name]: e.target[i].value };
    }
    dispatch(updateUserThunk(formData));
  };

  const handleApproveButton = (id, userId) => {
    const message = replyingMessages.find((msg) => msg._id === id);
    if (message) {
      if (message.userId.leave - message.numberOfDates >= 0) {
        const approveData = {
          id: id,
          userId: userId,
          adminId: loggedAdmin,
          status: true,
          adminMessage: "Approved",
        };
        dispatch(replyMessageThunk(approveData));
      } else {
        alert("User doesn't have enough leaves left to approve this request.");
      }
    }
  };
  const handleRejectButton = (adminMessage) => {
    const rejectionData = {
      id: rejectId,
      adminId: loggedAdmin,
      status: false,
      adminMessage: adminMessage,
    };
    dispatch(replyMessageThunk(rejectionData));
  };

  const handleNewDept = (e) => {
    e.preventDefault();
    const newDeptName = e.target.newDept.value;
    const DeptExists = showAllDeptsData.some(
      (Dept) => Dept.name === newDeptName
    );
    if (DeptExists) {
      alert(`Dept "${newDeptName}" already exists.`);
      return; // Stop further execution
    }
    const DeptData = {
      name: newDeptName,
    };
    dispatch(addNewDeptThunk(DeptData));
    e.target.reset();
  };
  const [showMessagesState, setShowMessagesState] = useState(false);
  const handleShowMessageButtonFunction = () => {
    setShowMessagesState(!showMessagesState);
  };
  const [showUserDetails, setShowUserDetails] = useState(false);
  const handleShowUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };
  return (
    <>
      <div className="container">
        <NavBar showOne={showOneAdmin} handleLogOut={handleLogOut} />
        {showAllStatus === "loading" && <p>Loading...</p>}
        {showAllStatus === "error" && <p>Error fetching data</p>}
        {/* {console.log("before useDetail", showAllAdminData)} */}
        <div className="admin-main">
          <div className="left-bar">
            <NewUserForm
              handleFormSubmit={handleFormSubmit}
              showAllDeptsData={showAllDeptsData}
            />
          </div>
          <div className="right-bar">
            <NewDeptForm handleNewDept={handleNewDept} />
            <button
              className={`side-button ${
                showMessagesState ? "side-button-active" : ""
              }`}
              onClick={handleShowMessageButtonFunction}
            >
              {showMessagesState ? (
                "Click here to hide the application table"
              ) : (
                <span>
                  Click here to show the leave applications.
                  <br />
                  <i>pending </i>
                  <b>{replyingMessages.length}</b>
                </span>
              )}
            </button>
            <button
              className={`side-button ${
                showUserDetails ? "side-button-active" : ""
              }`}
              onClick={handleShowUserDetails}
            >
              {showUserDetails ? (
                "Click here to hide the User table"
              ) : (
                <>Click here to show User Details</>
              )}
            </button>
          </div>
        </div>
        {showMessagesState && (
          <AllMessagesTables
            handleApproveButton={handleApproveButton}
            setRejectId={setRejectId}
            replyingMessages={replyingMessages}
            repliedMessages={repliedMessages}
            onSubmit={handleRejectButton}
            adminMessage={adminMessage}
            setAdminMessage={setAdminMessage}
          />
        )}
        {showUserDetails &&
          showAllStatus === "succeeded" &&
          !!showAllAdminData && (
            <UserDetailsTable
              showAllAdminData={showAllAdminData}
              handleDeleteRow={handleDeleteRow}
              handleUpdateRow={handleUpdateRow}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
              calendarPosition={calendarPosition}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedAdminId={selectedAdminId}
              isModalOpen={isModalOpen}
              handleUpdateSubmit={handleUpdateSubmit}
              setIsModalOpen={setIsModalOpen}
              selectedUser={selectedUser}
              showAllDeptsData={showAllDeptsData}
              deleteUserThunk={deleteUserThunk}
            />
          )}
      </div>
    </>
  );
}

export default Admin;
