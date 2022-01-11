import React from 'react';
import EquipmentEmployee from './EquipmentEmployee';

function EquipmentEmployeeList({ equipmentEmployees, onDelete, onEdit }) {
  return (
    <table id="equipment-employees">
      <thead>
        <tr>
            <th>Equipment Name</th>
            <th>Equipment ID</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {equipmentEmployees.map((equipmentEmployee, i) => <EquipmentEmployee equipmentEmployee={equipmentEmployee}
          onDelete={onDelete}
          onEdit={onEdit}
          key={i} />)}
      </tbody>
    </table>
  )
}

export default EquipmentEmployeeList
