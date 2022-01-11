import React from 'react';

function Park({ park, onDelete, onEdit }) {
  return(
    <tr>
      <td>{park.parkID}</td>
      <td>{park.parkName}</td>
      <td>{park.borough}</td>
      <td>{park.squareMeterage}</td>
      <td><button onClick = {() => onEdit(park)}>Update</button></td>
      <td><button onClick = {() => onDelete(park.parkID)}>Delete</button></td>
    </tr>
  );
}

export default Park;
