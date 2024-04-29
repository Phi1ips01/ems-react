import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import "react-datepicker/dist/react-datepicker.css";
import "./userDetailsTable.css";
import ReactDatePicker from "react-datepicker";
import MyModal from "../Modal/index";
import { useDispatch } from "react-redux";
import { showAllUsersThunk } from "../../features/admin/adminSlice";

const UserDetailsTable = ({
  showAllAdminData,
  handleDeleteRow,
  handleUpdateRow,
  showCalendar,
  calendarPosition,
  selectedDate,
  setSelectedDate,
  selectedAdminId,
  setShowCalendar,
  isModalOpen,
  handleUpdateSubmit,
  setIsModalOpen,
  selectedUser,
  showAllDeptsData,
  deleteUserThunk,
}) => {
  const [viewMode, setViewMode] = useState("active");
  const [searchColumn, setSearchColumn] = useState("name");
  const [searchKeyword, setSearchKeyword] = useState("");

  const dispatch = useDispatch();

  const activeEmployees = showAllAdminData.filter((admin) => !admin.isQuit);
  const leftEmployees = showAllAdminData.filter((admin) => admin.isQuit);
  const data = viewMode === "active" ? activeEmployees : leftEmployees;

  const columns = useMemo(() => {
    let columns = [];
    if (showAllAdminData.length > 0) {
      columns = [
        ...Object.keys(showAllAdminData[0])
          .filter(
            (key) =>
              ![
                "_id",
                "password",
                "isAdmin",
                "isVerified",
                "token",
                "isQuit",
                "exitDate",
                "__v",
                "role",
              ].includes(key)
          )
          .map((key) => ({
            Header: key === "leave" ? "No. of Leaves" : key,
            accessor: key,
          })),
      ];
    }

    if (viewMode === "active") {
      columns.push(
        {
          Header: "Delete",
          Cell: ({ row }) => (
            <button
              className="delete-button"
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();
                handleDeleteRow(
                  row.original._id,
                  rect.top + window.scrollY,
                  rect.left
                );
              }}
            >
              Delete
            </button>
          ),
        },
        {
          Header: "Update",
          Cell: ({ row }) => (
            <button
              className="update-button"
              onClick={() => handleUpdateRow(row.original)}
            >
              Update
            </button>
          ),
        }
      );
    } else if (viewMode === "left") {
      columns.push({
        Header: "Exit Date",
        accessor: "exitDate",
      });
    }

    return columns;
  }, [showAllAdminData, viewMode]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (userId, exitDate) => {
    const confirmed = window.confirm("Confirm the Deletion");
    if (confirmed) {
      dispatch(deleteUserThunk({ userId, exitDate }));
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(showAllUsersThunk({ searchColumn, searchKeyword }));
  };
  const handleResetSearch = () => {
    dispatch(showAllUsersThunk({ searchColumn: "", searchKeyword: "" }));
  };

  return (
    <div>
      <MyModal
        show={isModalOpen}
        handleClose={handleCloseModal}
        onSubmit={handleUpdateSubmit}
        selectedUser={selectedUser}
        showAllDeptsData={showAllDeptsData}
      />
      <div className="table-container">
        <h3>Details of the Employees</h3>
        <div className="search-bar">
          <select
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="emp_Id">Employee ID</option>
            <option value="department">Department</option>
            <option value="designation">Designation</option>
          </select>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Enter keyword..."
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          <button className="reset-button" onClick={handleResetSearch}>
            Reset
          </button>
        </div>

        <div className="toggle-buttons">
          <button
            className={`toggle-button ${viewMode === "active" ? "active" : ""}`}
            onClick={() => setViewMode("active")}
          >
            Active Employees
          </button>
          <button
            className={`toggle-button ${viewMode === "left" ? "active" : ""}`}
            onClick={() => setViewMode("left")}
          >
            Left Employees
          </button>
        </div>
        <div className="user-detailed-table">
          {rows.length === 0 ? (
            <p>No matching records found.</p>
          ) : (
            <table {...getTableProps()} className="styled-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showCalendar && (
        <div
          className="calendar-popup"
          style={{ top: calendarPosition.top, left: calendarPosition.left }}
        >
          <h3>EXIT DATE</h3>
          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            required
          />
          <button
            className="submit-button"
            onClick={() => {
              handleDelete(selectedAdminId, selectedDate);
              setShowCalendar(false);
            }}
          >
            Confirm
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowCalendar(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetailsTable;
