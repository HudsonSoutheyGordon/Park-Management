import React from 'react';

function ParkFacility({ parkFacility, onDelete, onEdit }) {
  return(
    <tr>
      <td>{parkFacility.facilityID}</td>
      <td>{parkFacility.facilityType}</td>
      <td>{parkFacility.facilityLocation}</td>
      <td>{parkFacility.maintenanceStatus === 1 ? "Needs Maintenance" : "In Good Shape"}</td>
      <td>{parkFacility.monthlyCost}</td>
      <td><button onClick = {() => onEdit(parkFacility)}>Update</button></td>
      <td><button onClick = {() => onDelete(parkFacility.facilityID)}>Delete</button></td>
    </tr>
  );
}

export default ParkFacility;
