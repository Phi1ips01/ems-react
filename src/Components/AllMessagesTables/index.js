import React, { useState } from "react";
import "./allMessagesTables.css";
import RejectionModal from "../RejectionComponent";
const AllMessagesTables = ({
  repliedMessages,
  replyingMessages,
  handleApproveButton,
  setRejectId,
  onSubmit,
  adminMessage,
  setAdminMessage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const handleRejectModalOpen = (id) => {
    setIsRejectionModalOpen(true);
    setRejectId(id);
  };
  const filteredReplyingMessages = replyingMessages.filter((message) =>
    message.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRepliedMessages = repliedMessages.filter((message) =>
    message.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <input
        type="text"
        placeholder="🔍Search by User Name"
        value={searchTerm}
        className="all-messages-search-bar"
        onChange={handleSearchChange}
      />
      <div className="admin-message">
        {searchTerm ? (
          <>
            <h3>Leave requests yet to respond</h3>
            {filteredReplyingMessages.length < 1 ? (
              <p>No leave applications match the search criteria</p>
            ) : (
              <div className="admin-message-pending-table-container">
                <table className="admin-message-pending-table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Leave Date</th>
                      <th>Leave Count</th>
                      <th>User Message</th>
                      <th>Status</th>
                      <th>Available Leaves</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {replyingMessages.map((message) => (
                      <tr key={message._id}>
                        <td>{message.userId.name}</td>
                        <td>{message.leaveDate}</td>
                        <td>{message.numberOfDates}</td>
                        <td>{message.userMessage}</td>
                        <td>{message.status}</td>
                        <td>{message.userId.leave}</td>
                        <td>{message.createdAt.split("T")[0]}</td>
                        <td>
                          <button
                            className="approve-button"
                            onClick={() =>
                              handleApproveButton(
                                message._id,
                                message.userId._id
                              )
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="reject-button"
                            onClick={() => handleRejectModalOpen(message._id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <h3>Responded leave applications</h3>
            {filteredRepliedMessages.length < 1 ? (
              <p>
                No leave applications that are replied match the search criteria
              </p>
            ) : (
              <div className="admin-message-replied-table-container">
                <table className="admin-message-replied-table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Date</th>
                      <th>User Message</th>
                      <th>Status</th>
                      <th>Available Leaves</th>
                      <th>Applied Date</th>
                      <th>Admin Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repliedMessages.map((message) => (
                      <tr key={message._id}>
                        <td>{message.userId.name}</td>
                        <td>{message.leaveDate}</td>
                        <td>{message.userMessage}</td>
                        <td>{message.status}</td>
                        <td>{message.userId.leave}</td>
                        <td>{message.createdAt.split("T")[0]}</td>
                        <td>{message.adminMessage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <h3>Leave requests yet to respond</h3>
            {replyingMessages.length < 1 ? (
              <p>There is no leave application to be replied</p>
            ) : (
              <div className="admin-message-pending-table-container">
                <table className="admin-message-pending-table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Leave Date</th>
                      <th>Leave Count</th>
                      <th>User Message</th>
                      <th>Status</th>
                      <th>Available Leaves</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {replyingMessages.map((message) => (
                      <tr key={message._id}>
                        <td>{message.userId.name}</td>
                        <td>{message.leaveDate}</td>
                        <td>{message.numberOfDates}</td>
                        <td>{message.userMessage}</td>
                        <td>{message.status}</td>
                        <td>{message.userId.leave}</td>
                        <td>{message.createdAt.split("T")[0]}</td>
                        <td>
                          <button
                            className="approve-button"
                            onClick={() =>
                              handleApproveButton(
                                message._id,
                                message.userId._id
                              )
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="reject-button"
                            onClick={() => handleRejectModalOpen(message._id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <h3>Leave application which are responded</h3>
            {repliedMessages.length < 1 ? (
              <p>There is no leave application that is replied</p>
            ) : (
              <div className="admin-message-replied-table-container">
                <table className="admin-message-replied-table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Date</th>
                      <th>User Message</th>
                      <th>Status</th>
                      <th>Available Leaves</th>
                      <th>Applied Date</th>
                      <th>Admin Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repliedMessages.map((message) => (
                      <tr key={message._id}>
                        <td>{message.userId.name}</td>
                        <td>{message.leaveDate}</td>
                        <td>{message.userMessage}</td>
                        <td>{message.status}</td>
                        <td>{message.userId.leave}</td>
                        <td>{message.createdAt.split("T")[0]}</td>
                        <td>{message.adminMessage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        <div>
          <RejectionModal
            isOpen={isRejectionModalOpen}
            onRequestClose={() => setIsRejectionModalOpen(false)}
            onSubmit={onSubmit}
            adminMessage={adminMessage}
            setAdminMessage={setAdminMessage}
          />
        </div>
      </div>
    </>
  );
};

export default AllMessagesTables;
