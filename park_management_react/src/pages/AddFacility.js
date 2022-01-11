import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function AddFacility() {

    const [facilityType, setFacilityType] = useState('');
    const [facilityLocation, setFacilityLocation] = useState('');
    const [maintenanceStatus, setMaintenanceStatus] = useState('');
    const [monthlyCost, setMonthlyCost] = useState('');

    const [locationNames, setLocationNames] = useState([]);

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const handleLocationChange = (e) => {
        setFacilityLocation(e.target.value);
    }

    const handleMaintenanceChange = () => {
        setMaintenanceStatus(!maintenanceStatus);
    };

    // Need this info for the dropdown
    const loadParks = async () => {
        console.log("Load parks called");
        const url = '/parks'
        const response = await fetch(url);
        const data = await response.json();
        console.log("Loaded Parks" + data);
        setLocationNames(data);
    }

    useEffect(() => {
        loadParks();
    }, []);

    const addFacility = async () => {
        if (facilityType == "") {
            alert("Please enter a facility type.")
            return
        }

        console.log("Ran Add Park Facility");
        const newFacility = { facilityType, facilityLocation, 
            maintenanceStatus, monthlyCost };
        const response = await fetch('/park-facilities', {
            method: 'POST',
            body: JSON.stringify(newFacility),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        history.push("/park-facilities");
    };

    return (
        <>
        <Navbar></Navbar>
        <h2>Add a Park Facility</h2>
                 <form onSubmit={handleSubmit}>
                     <label>
                         <input
                             type="text"
                             placeholder="Facility Type"                             
                             value={facilityType}
                             onChange={e => setFacilityType(e.target.value)} />
                     </label>
                     <label>
                        <select onChange={handleLocationChange}>
                            <option value="Location"> -- Location -- </option>
                            {locationNames === null ? locationNames = null :locationNames.map((location, i) => <option value = {location.parkID} 
                            key = {i}
                            >{location.parkName + " ID: " + location.parkID}</option>)}
                        </select>
                    </label>
                     
                     <label>
                        <input
                            type="checkbox"
                            value = {maintenanceStatus}
                            defaultChecked={maintenanceStatus}
                            onChange={handleMaintenanceChange} />
                        Needs Maintenance
                        </label>
                     <label>
                         <input
                             type="number"
                             placeholder="Monthly Cost"                             
                             value={monthlyCost}
                             onChange={e => setMonthlyCost(e.target.value)} />
                     </label>
                     <button
                        onClick ={addFacility}
                    >Add</button>
                 </form>
                 <Link to='/park-facilities'>Cancel and return</Link>
        </>
    );
}

export default AddFacility;
