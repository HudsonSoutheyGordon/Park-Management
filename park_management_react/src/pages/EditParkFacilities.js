import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function EditParkFacilities({ parkFacilityToEdit }) {

    const [facilityID, setFacilityID] = useState(parkFacilityToEdit.facilityID);
    const [facilityType, setFacilityType] = useState(parkFacilityToEdit.facilityType);
    const [facilityLocation, setFacilityLocation] = useState(parkFacilityToEdit.facilityLocation);
    const [maintenanceStatus, setMaintenanceStatus] = useState(parkFacilityToEdit.maintenanceStatus);   // Initialized elsewhere below
    const [monthlyCost, setMonthlyCost] = useState(parkFacilityToEdit.monthlyCost);

    const [locationNames, setLocationNames] = useState([]);

    const history = useHistory();

    const handleMaintenanceChange = () => {
        setMaintenanceStatus(!maintenanceStatus);
    };

    const handleLocationChange = (e) => {
        setFacilityLocation(e.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

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

    const editParkFacilities = async () => {
        if (facilityType == "") {
            alert("Please enter a facility type.")
            return
        }

        console.log("Ran Edit ParkFacilities");
        const editedParkFacility = { facilityType, facilityLocation, 
            maintenanceStatus, monthlyCost, facilityID};
        const response = await fetch('/park-facilities', {
            method: 'PUT',
            body: JSON.stringify(editedParkFacility),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        history.push("/park-facilities");
    };

    return (
        <>
        <Navbar></Navbar>
        <h2>Edit the Employee</h2>
        <br></br>
        <h4>All fields mandatory</h4>
        <h2>Update a Park Facility</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder="Facility Type"
                        value={facilityType}
                        onChange={e => setFacilityType(e.target.value)} />
                </label>
                {/*
                <label>
                    <input
                        type="number"
                        placeholder="Park ID"
                        value={facilityLocation}
                        onChange={e => setFacilityLocation(e.target.value)} />
                </label>
                */}
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
                        type="number"
                        placeholder="Monthly Cost"
                        value={monthlyCost}
                        onChange={e => setMonthlyCost(e.target.value)} />
                </label>
                <br></br>
                <label>
                    <input
                        type="checkbox"
                        value = {maintenanceStatus}
                        defaultChecked={maintenanceStatus}
                        onChange={handleMaintenanceChange} />
                Needs Maintenance
                </label>
                <button
                    onClick ={editParkFacilities}
                >Edit</button>
            </form>
    <Link to='/park-facilities'>Cancel and return</Link>
        </>
    );
}

export default EditParkFacilities;
