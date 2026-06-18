import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Apoorva", department: "IT" },
    { id: 2, name: "Riya", department: "HR" },
    { id: 3, name: "Raj", department: "Finance" },
  ]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");

  const addEmployee = () => {
    if (name === "" || department === "") {
      alert("Fill all fields");
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name,
      department,
    };

    setEmployees([...employees, newEmployee]);
    setName("");
    setDepartment("");
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Employee Management System</h1>

      <h4>Total Employees: {employees.length}</h4>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search Employee"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      <h4 className="mt-4">Add Employee</h4>

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
  );
}