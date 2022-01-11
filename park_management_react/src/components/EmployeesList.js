import React from 'react';
import Employee from './Employee';

function EmployeesList({ employees, onDelete, onEdit }) {
  return (
    <table id="employees">
      <thead>
        <tr>
            <th>employeeID</th>
            <th>First Name</th>
            <th>Last Name</th>
            {/* <th>Designated Borough</th> */}
            <th>Email</th>
            <th>Phone Number</th>
            <th>Job Title</th>
            <th>Hourly Rate</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, i) => <Employee employee={employee}
          onDelete={onDelete}
          onEdit={onEdit}
          key={i} />)}
      </tbody>
    </table>
  )
}

export default EmployeesList