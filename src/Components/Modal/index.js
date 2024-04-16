import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputButton from '../InputButton';
import InputField from '../InputField';

const MyModal = ({ show, handleClose, onSubmit, selectedUser}) => {
  return (
    <Modal show={show} onHide={handleClose} onSubmit={onSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <form onSubmit={onSubmit}>
              <input type='hidden' id="_id" name='_id' value={selectedUser && selectedUser._id}/>
              <InputField type="text" id="name" name="name" className="trip-form-input" placeholder={`name = ${selectedUser && selectedUser.name}`}/>
              <InputField type="text" id="email" name="email" className="trip-form-input" placeholder={`email = ${selectedUser && selectedUser.email}`}/>
              <InputField type="text" id="password" name="password" className="trip-form-input" placeholder={`password =`}/>
              <InputField type="text" id="role" name="role" className="trip-form-input" placeholder={`name = ${selectedUser && selectedUser.role}`}/>
              <InputField type="text" id="contact" name="contact" className="trip-form-input" placeholder={`name = ${selectedUser && selectedUser.contact}`}/>
              <InputField type="text" id="leave" name="leave" className="trip-form-input" placeholder={`leave = ${selectedUser && selectedUser.leave}`}/>
              <input type="submit" value="Update" onClick={handleClose}/>
            </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
