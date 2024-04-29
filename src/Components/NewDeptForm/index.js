import React from "react";
import InputButton from "../InputButton";
import InputField from "../InputField";
import "./newDeptForm.css";
const NewDeptForm = ({ handleNewDept }) => {
  return (
    <div className="form-container">
      <p className="form-container-heading">
        Enter here to add a new Department.
      </p>
      <form onSubmit={handleNewDept} className="form-inline">
        <InputField
          type="text"
          id="newDept"
          name="newDept"
          className="form-container-input"
          placeholder="Enter the Department name"
          required
        />
        <InputButton className="form-container-submit" value="Insert" />
      </form>
    </div>
  );
};

export default NewDeptForm;
