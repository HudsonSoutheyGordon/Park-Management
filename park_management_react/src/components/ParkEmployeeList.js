import React from 'react';
import ParkEmployee from './ParkEmployee';

function ParkEmployeeList({ parkEmployees, onDelete, onEdit }) {
  return (
    <table id="park-employees">
      <thead>
        <tr>
            <th>Name</th>
            <th>parkID</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {parkEmployees.map((parkEmployee, i) => <ParkEmployee parkEmployee={parkEmployee}
          onDelete={onDelete}
          onEdit={onEdit}
          key={i} />)}
      </tbody>
    </table>
  )
}

export default ParkEmployeeList
