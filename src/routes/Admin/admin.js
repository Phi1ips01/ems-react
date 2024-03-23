import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllUsersThunk,addNewUserThunk, deleteUserThunk, updateUserThunk } from '../../features/admin/adminSlice';
import InputField from '../../Components/InputField';
import InputButton from '../../Components/InputButton';
import MyModal from '../../Components/Modal';


function Admin() {
  const dispatch = useDispatch();
  const showAllAdminData = useSelector((state) => state.admin.showAllAdminData);
  const status = useSelector((state) => state.admin.status);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for update


  useEffect(() => {
    if (status === 'idle') {
      dispatch(showAllUsersThunk());
    }
  }, [dispatch, status,showAllAdminData]);
  const handleFormSubmit = (e) => {
    let formData = {};
    e.preventDefault();
    for (let i = 0; i < e.target.length; i++) {
      formData = { ...formData, [e.target[i].name]: e.target[i].value };
    }
    console.log("formData", formData);
    dispatch(addNewUserThunk(formData))
  };
  
  const handleDeleteRow = (userId)=>{
    console.log("userID",userId)
    dispatch(deleteUserThunk({userId}))
  }
  const handleUpdateRow = (userData) => {
    setSelectedUser(userData); // Set the selected user for update
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdateSubmit = (e) =>{
    {
      let formData = {};
      e.preventDefault();
      for (let i = 0; i < e.target.length; i++) {
        formData = { ...formData, [e.target[i].name]: e.target[i].value };
      }
      dispatch(updateUserThunk(formData))
      console.log("formData", formData);
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {console.log("showAlladmin",showAllAdminData)}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error fetching data</p>}
      {status === 'succeeded' && (
    <table border={1}>
        <thead>
            <tr>
                {Object.keys(showAllAdminData[0]).filter((key) => !['_id', 'password', 'isAdmin', 'isVerified', 'token', '__v'].includes(key)).map((key) => (
                    <th key={key}>{key}</th>
                    
                ))}
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {showAllAdminData.map((admin) => (
                <tr key={admin._id}>
                    {Object.keys(admin)
                        .filter((key) => !['_id', 'password', 'isAdmin', 'isVerified', 'token', '__v'].includes(key))
                        .map((key) => (
                            <td key={key}>{admin[key]}</td>
                        ))}
                        <td><button onClick={() => handleDeleteRow(admin._id)}>Delete</button></td>
                        <td><button onClick={()=> handleUpdateRow(admin)}>Update</button></td>
                </tr>
            ))}
        </tbody>
    </table>
)}
 <MyModal show={isModalOpen} handleClose={handleCloseModal} onSubmit={handleUpdateSubmit} selectedUser={selectedUser}>
           
          </MyModal>
<form onSubmit={handleFormSubmit}>

  <InputField type="text" id="name" name="name" className="trip-form-input" placeholder={`name`}/>
  <InputField type="text" id="email" name="email" className="trip-form-input" placeholder="Enter the email" required/>
  <InputField type="text" id="contact" name="contact" className="trip-form-input" placeholder="Enter the contact" required/>
  <InputField type="text" id="password" name="password" className="trip-form-input" placeholder="Enter the password"/>
  <InputField type="text" id="role" name="role" className="trip-form-input" placeholder="Enter the role"/>
  <InputButton className="trip-form-submit" value="Submit" />
</form>

    </div>

  );
}

export default Admin;
