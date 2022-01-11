import React from 'react';

function EquipmentEmployee({ equipmentEmployee, onDelete, onEdit }) {
  return(
    <tr>
      <td>{equipmentEmployee.equipmentType}</td>
      <td>{equipmentEmployee.equipmentID}</td>
      <td>{equipmentEmployee.firstName + " " + equipmentEmployee.lastName}</td>
      <td>{equipmentEmployee.employeeID}</td>
      <td><button onClick = {() => onDelete(equipmentEmployee)}>Delete</button></td>
    </tr>
  );
}

export default EquipmentEmployee;
