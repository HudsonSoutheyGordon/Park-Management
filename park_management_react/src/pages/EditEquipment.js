import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function EditEquipment({ equipmentToEdit }) {

    const [equipmentID, setEquipmentID] = useState(equipmentToEdit.equipmentID);
    const [equipmentType, setEquipmentType] = useState(equipmentToEdit.equipmentType);
    const [datePurchased, setDatePurchased] = useState(equipmentToEdit.datePurchased);
    const [storageLocation, setStorageLocation] = useState(equipmentToEdit.storageLocation);

    const [locationNames, setLocationNames] = useState([]);

    const history = useHistory();

    const handleLocationChange = (e) => {
        setStorageLocation(e.target.value);
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

    const editEquipment = async () => {
        if (equipmentType == "") {
            alert("Please enter equipment type.")
            return
        }

        console.log("Ran Edit Equipment");
        const editedEquipment = { equipmentType, datePurchased, 
            storageLocation, equipmentID};
        const response = await fetch('/maintenanceequipment', {
            method: 'PUT',
            body: JSON.stringify(editedEquipment),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        history.push("/maintenance-equipment");
    };

    return (
        <>
        <Navbar></Navbar>
        <h2>Add Maintenance Equipment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder="Equipment Type"                             
                        value={equipmentType}
                        onChange={e => setEquipmentType(e.target.value)} />
                </label>
                <label>
                    <input
                        type="date"
                        placeholder="Date Purchased"
                        value={datePurchased}
                        onChange={e => setDatePurchased(e.target.value)} />
                </label>
                <label>
                    <select onChange={handleLocationChange}>
                        <option value="Storage Location"> -- Location -- </option>
                        {locationNames === null ? locationNames = null :locationNames.map((location, i) => <option value = {location.parkID} 
                        key = {i}
                        >{location.parkName + " ID: " + location.parkID}</option>)}
                    </select>
                </label>
                <button
                onClick ={editEquipment}
            >Edit</button>
            </form>
            <Link to='/maintenance-equipment'>Cancel and return</Link>
        </>
    );
}

export default EditEquipment;
