import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDirectory from "./UserDirectory";

export default function App() {

  const [activeTab, setActiveTab] = useState("employees");

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Apoorva", department: "IT" },
      { id: 2, name: "Riya", department: "HR" },
      { id: 3, name: "Raj", department: "Finance" },
    ];
  });

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (name === "" || department === "") {
      alert("Fill all fields");
      return;
    }
    const newEmployee = { id: Date.now(), name, department };
    setEmployees([...employees, newEmployee]);
    setName("");
    setDepartment("");
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  let filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "name") {
    filteredEmployees = [...filteredEmployees].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "department") {
    filteredEmployees = [...filteredEmployees].sort((a, b) =>
      a.department.localeCompare(b.department)
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Employee Management System</h1>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            Employees
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            User Directory (API)
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === "employees" ? (
        <div>
          <h5>Total Employees: {employees.length}</h5>

          <input
            type="text"
            className="form-control my-3"
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mb-3">
            <span className="me-2 fw-bold">Sort by:</span>
            <button
              className={`btn btn-sm me-2 ${sortBy === "name" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setSortBy(sortBy === "name" ? "none" : "name")}
            >
              Name
            </button>
            <button
              className={`btn btn-sm ${sortBy === "department" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setSortBy(sortBy === "department" ? "none" : "department")}
            >
              Department
            </button>
          </div>

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.department}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h5 className="mt-4">Add Employee</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addEmployee}>
            Add Employee
          </button>
        </div>
      ) : (
        <UserDirectory />
      )}
    </div>
  );
}