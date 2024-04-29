import React from "react";
import InputField from "../InputField";
import InputButton from "../InputButton";
import "./newUserForm.css";
const NewUserForm = ({ handleFormSubmit, showAllDeptsData }) => {
  return (
    <div className="add-new-user-container">
      <form className="admin-add-form" onSubmit={handleFormSubmit}>
        <h3>Add New User</h3>
        <div className="input-group">
          <InputField
            type="text"
            id="emp_Id"
            name="emp_Id"
            className="admin-add-input"
            placeholder="Employee ID"
            required
          />
          <InputField
            type="text"
            id="name"
            name="name"
            className="admin-add-input"
            placeholder="Name"
            required
          />
        </div>
        <div className="input-group">
          <InputField
            type="text"
            id="address"
            name="address"
            className="admin-add-input"
            placeholder="Address"
            required
          />

          <InputField
            type="text"
            id="contact"
            name="contact"
            className="admin-add-input"
            placeholder="Contact"
            required
          />
        </div>
        <div className="input-group">
          <InputField
            type="email"
            id="email"
            name="email"
            className="admin-add-input"
            placeholder="Email"
            required
          />
          <InputField
            type="password"
            id="password"
            name="password"
            className="admin-add-input"
            placeholder="Password"
            required
          />
        </div>
        <div className="input-group">
          <select
            className="admin-add-select"
            id="dept"
            name="dept"
            placeholder="Department"
            required
          >
            <option disabled selected>
              Select Department
            </option>
            {showAllDeptsData.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <InputField
            type="text"
            id="designation"
            name="designation"
            className="admin-add-input"
            placeholder="Designation"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="date"
            id="joiningDate"
            name="joiningDate"
            className="admin-add-input"
            placeholder="Joining Date"
            required
          />

          <InputButton className="admin-add-submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
