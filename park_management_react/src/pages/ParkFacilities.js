import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js'
import ParkFacilitiesList from '../components/ParkFacilitiesList';



function ParkFacilities( { setParkFacilityToEdit } ){

    const [parkFacilities, setParkFacilities] = useState([]);
    const [facilityID, setFacilityID] = useState('');
    const [facilityType, setFacilityType] = useState('');
    const [facilityLocation, setFacilityLocation] = useState('');
    const [maintenanceStatus, setMaintenanceStatus] = useState('');
    const [monthlyCost, setMonthlyCost] = useState('');

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const onEdit = parkFacility => {
        setParkFacilityToEdit(parkFacility);
        history.push("/edit-park-facility");
    }


    const onDelete = async parkFacilities => {
        console.log("Called on delete");
        const response = await fetch(`/park-facilities/${parkFacilities}`, {
            method: "DELETE"
        });
        
        if (response.status === 204){
            window.location.reload(false); // Force refresh the page to remove the deleted one
        } else {
            console.error(`Failed to delete park with id = ${parkFacilities}, status code = ${response.status}`);
        }
        
    };

    const loadParkFacilities = async () => {
        const url = '/park-facilities'
        const response = await fetch(url);
        const data = await response.json();
        setParkFacilities(data);
    }

    useEffect(() => {
        loadParkFacilities();
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <h2>Park Facilities</h2>
            <ParkFacilitiesList parkFacilities={parkFacilities} onDelete={onDelete} onEdit={onEdit}></ParkFacilitiesList>
            <Link to='/add-park-facility'>Add a new Park Facility</Link>
        </>
    )
}

//     return (
//         <>
//             <Navbar></Navbar>
//             <p>
//                 <h2>
//                     Park Facilities
//                 </h2>
//                 <br></br>
//                 <table id="parkFacilities">
//                     <thead>
//                         <tr>
//                             <th>facility_ID</th>
//                             <th>Facility Type</th>
//                             <th>Facility Location</th>
//                             <th>Maintenance Status</th>
//                             <th>Monthly Cost</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>92145</td>
//                             <td>Bathroom</td>
//                             <td>52134</td>
//                             <td>Needs Maintenance</td>
//                             <td>$500</td>
//                             <td><button>Edit</button></td>
//                             <td><button>Delete</button></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </p>
//             <br></br>
//
//         <div class = "flex-container">
//             <div class = "flex-child A">
//                 {/* Citation: The below form is modified from content submitted
//                     from one of our group members CS290 Project.*/ }
//                     <h2>Add a Park Facility</h2>
//                 <form onSubmit={handleSubmit}>
//                     <fieldset>
//                         <label>
//                             <input
//                                 type="text"
//                                 placeholder="Facility Type"
//                                 value={facilityType}
//                                 onChange={e => setFacilityType(e.target.value)} />
//                         </label>
//                         <label>
//                             <input
//                                 type="number"
//                                 placeholder="Park ID"
//                                 value={facilityLocation}
//                                 onChange={e => setFacilityLocation(e.target.value)} />
//                         </label>
//                         <label>
//                             <input
//                                 type="number"
//                                 placeholder="Monthly Cost"
//                                 value={monthlyCost}
//                                 onChange={e => setMonthlyCost(e.target.value)} />
//                         </label>
//                         <br></br>
//                         <label>
//                             <input
//                                 type="radio"
//                                 placeholder="Storage Location"
//                                 value={maintenanceStatus}
//                                 onChange={e => setMaintenanceStatus(e.target.value)} />
//                         Needs Maintenance
//                         </label>
//                         <button>Add</button>
//                     </fieldset>
//                 </form>
//             </div>
//
//             <div class = "flex-child B">
//                 {/* Citation: The below form is modified from content submitted
//                     from one of our group members CS290 Project.*/ }
//                     <h2>Update a Park Facility</h2>
//                 <form onSubmit={handleSubmit}>
//                     <fieldset>
//                     <label>
//                             <input
//                                 type="text"
//                                 placeholder="facility_ID"
//                                 value={facilityID}
//                                 onChange={e => setFacilityID(e.target.value)} />
//                         </label>
//                         <label>
//                             <input
//                                 type="text"
//                                 placeholder="Facility Type"
//                                 value={facilityType}
//                                 onChange={e => setFacilityType(e.target.value)} />
//                         </label>
//                         <label>
//                             <input
//                                 type="number"
//                                 placeholder="Park ID"
//                                 value={facilityLocation}
//                                 onChange={e => setFacilityLocation(e.target.value)} />
//                         </label>
//                         <label>
//                             <input
//                                 type="number"
//                                 placeholder="Monthly Cost"
//                                 value={monthlyCost}
//                                 onChange={e => setMonthlyCost(e.target.value)} />
//                         </label>
//                         <br></br>
//                         <label>
//                             <input
//                                 type="radio"
//                                 placeholder="Storage Location"
//                                 value={maintenanceStatus}
//                                 onChange={e => setMaintenanceStatus(e.target.value)} />
//                         Needs Maintenance
//                         </label>
//                         <button>Update</button>
//                     </fieldset>
//                 </form>
//             </div>
//         </div>
//         </>
//     )
// }

export default ParkFacilities;
