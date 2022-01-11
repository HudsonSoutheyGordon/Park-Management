import React from 'react';
import ParkFacility from './ParkFacility';

function ParkFacilitiesList({ parkFacilities, onDelete, onEdit }) {
  return (
    <table id="park-facilities">
      <thead>
        <tr>
            <th>facilityID</th>
            <th>Facility Type</th>
            <th>Facility Location</th>
            <th>Maintenance Status</th>
            <th>Monthly Cost</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {parkFacilities.map((parkFacility, i) => <ParkFacility parkFacility={parkFacility}
          onDelete={onDelete}
          onEdit={onEdit}
          key={i} />)}
      </tbody>
    </table>
  )
}

export default ParkFacilitiesList
