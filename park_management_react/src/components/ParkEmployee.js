import React from 'react';

function ParkEmployee({ parkEmployee, onDelete, onEdit }) {
  return(
    <tr>
      <td>{parkEmployee.parkName}</td>
      <td>{parkEmployee.parkID}</td>
      <td>{parkEmployee.firstName + " " + parkEmployee.lastName}</td>
      <td>{parkEmployee.employeeID}</td>
      <td><button onClick = {() => onDelete(parkEmployee)}>Delete</button></td>
    </tr>
  );
}

export default ParkEmployee;
