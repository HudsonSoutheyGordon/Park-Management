import React from 'react';
import MaintenanceEquipment from './MaintenanceEquipment';

function MaintenanceEquipmentList({ maintenanceEquipments, onDelete, onEdit }) {
  return (
    <table id="maintenance-equipment">
      <thead>
        <tr>
            <th>EquipmentID</th>
            <th>Equipment Type</th>
            <th>Date Purchased</th>
            <th>Storage Location</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {maintenanceEquipments.map((maintenanceEquipment, i) => <MaintenanceEquipment maintenanceEquipment={maintenanceEquipment}
          onDelete={onDelete}
          onEdit={onEdit}
          key={i} />)}
      </tbody>
    </table>
  )
}

export default MaintenanceEquipmentList
