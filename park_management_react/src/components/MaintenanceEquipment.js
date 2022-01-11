import React from 'react';

function MaintenanceEquipment({ maintenanceEquipment, onDelete, onEdit }) {
  return(
    <tr>
      <td>{maintenanceEquipment.equipmentID}</td>
      <td>{maintenanceEquipment.equipmentType}</td>
      <td>{maintenanceEquipment.datePurchased}</td>
      <td>{maintenanceEquipment.storageLocation}</td>
      <td><button onClick = {() => onEdit(maintenanceEquipment)}>Update</button></td>
      <td><button onClick = {() => onDelete(maintenanceEquipment.equipmentID)}>Delete</button></td>
    </tr>
  );
}

export default MaintenanceEquipment;
