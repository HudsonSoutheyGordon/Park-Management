import React from 'react';

function Employee({ employee, onDelete, onEdit }) {
  return(
    <tr>
      <td>{employee.employeeID}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      {/* <td>{employee.borough}</td> */}
      <td>{employee.email}</td>
      <td>{employee.phoneNumber}</td>
      <td>{employee.jobTitle}</td>
      <td>{employee.hourlyRate===null ? 0 : employee.hourlyRate}</td>
      <td><button onClick = {() => onEdit(employee)}>Update</button></td>
      <td><button onClick = {() => onDelete(employee.employeeID)}>Delete</button></td>
    </tr>
  );
}

export default Employee;