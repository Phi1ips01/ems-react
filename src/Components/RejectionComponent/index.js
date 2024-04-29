import React from "react";
import "./rejectionModal.css";
const RejectionModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  adminMessage,
  setAdminMessage,
}) => {
  const handleSubmit = () => {
    onSubmit(adminMessage);
    setAdminMessage("");
    onRequestClose();
  };

  return (
    <>
      {isOpen && (
        <div className="rejection-modal">
          <div className="rejection-modal-content">
            <h2>Enter Rejection Message</h2>
            <input
              type="text"
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
              placeholder="Enter rejection message..."
            />
            <u>
              <button onClick={handleSubmit}>Submit</button>
            </u>
            <u>
              <button onClick={onRequestClose}>Close</button>
            </u>
          </div>
        </div>
      )}
    </>
  );
};

export default RejectionModal;
