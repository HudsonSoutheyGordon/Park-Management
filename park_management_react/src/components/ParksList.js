import React from 'react';
import Park from './Park';

function ParksList({ parks, onDelete, onEdit }) {
  return (
    <table id="parks">
      <thead>
        <tr>
            <th>parkID</th>
            <th>Park Name</th>
            <th>Borough</th>
            <th>Area (square meters)</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {parks.map((park, i) => <Park park={park}
          onDelete={onDelete}
          onEdit={onEdit}
          key={i} />)}
      </tbody>
    </table>
  )
}

export default ParksList
