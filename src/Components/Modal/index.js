import React from "react";
import { Modal } from "react-bootstrap";
import InputField from "../InputField";
import "./modal.css";
const MyModal = ({
  show,
  handleClose,
  onSubmit,
  selectedUser,
  showAllDeptsData,
}) => {
  const handleSubmit = (e) => {
    onSubmit(e);
    handleClose();
  };

  return (
    <div className="modal-center">
      <Modal
        show={show}
        onHide={handleClose}
        className="user-detail-update-modal"
      >
        <div className="user-detail-update-modal-content">
          <Modal.Header>
            <div className="user-detail-update-modal-header">
              <Modal.Title>Update User</Modal.Title>
              <button
                className="user-detail-update-modal-close"
                onClick={handleClose}
              >
                X
              </button>
            </div>
          </Modal.Header>
          <Modal.Body className="user-detail-update-modal-body">
            <form
              onSubmit={handleSubmit}
              className="user-detail-update-modal-form"
            >
              <input
                type="hidden"
                id="_id"
                name="_id"
                value={selectedUser && selectedUser._id}
              />
              <div className="form-row">
                <InputField
                  type="text"
                  id="emp_Id"
                  name="emp_Id"
                  className="MyModal-input"
                  placeholder={`emp ID = ${
                    selectedUser && selectedUser.emp_Id
                  }`}
                />
                <InputField
                  type="text"
                  id="name"
                  name="name"
                  className="MyModal-input"
                  placeholder={`name = ${selectedUser && selectedUser.name}`}
                />
              </div>
              <div className="form-row">
                <InputField
                  type="text"
                  id="address"
                  name="address"
                  className="MyModal-input"
                  placeholder={`address = ${
                    selectedUser && selectedUser.address
                  }`}
                />
                <InputField
                  type="text"
                  id="email"
                  name="email"
                  className="MyModal-input"
                  placeholder={`email = ${selectedUser && selectedUser.email}`}
                />
              </div>
              <div className="form-row">
                <InputField
                  type="text"
                  id="password"
                  name="password"
                  className="MyModal-input"
                  placeholder={`password =`}
                />
                <select
                  className="MyModal-select"
                  id="dept"
                  name="dept"
                  placeholder="Department"
                >
                  <option disabled>Select Department</option>
                  {showAllDeptsData.map((dept) => (
                    <option key={dept._id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <InputField
                  type="text"
                  id="designation"
                  name="designation"
                  className="MyModal-input"
                  placeholder={`designation = ${
                    selectedUser && selectedUser.designation
                  }`}
                />
                <InputField
                  type="text"
                  id="contact"
                  name="contact"
                  className="MyModal-input"
                  placeholder={`contact = ${
                    selectedUser && selectedUser.contact
                  }`}
                />
              </div>
              <div className="form-row">
                <InputField
                  type="text"
                  id="leave"
                  name="leave"
                  className="MyModal-input"
                  placeholder={`leave = ${selectedUser && selectedUser.leave}`}
                />
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  className="MyModal-input"
                  placeholder="Joining Date"
                />
              </div>
              <input type="submit" value="Update" className="MyModal-submit" />
            </form>
          </Modal.Body>
          <Modal.Footer className="user-detail-update-modal-footer"></Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
