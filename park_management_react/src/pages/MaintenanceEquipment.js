import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';
import MaintenanceEquipmentList from '../components/MaintenanceEquipmentList';


function MaintenanceEquipment( { setMaintenanceEquipmentToEdit }){

    const [maintenanceEquipments, setMaintenanceEquipments] = useState([])
    const [equipmentID, setEquipmentID] = useState('');
    const [equipmentType, setEquipmentType] = useState('');
    const [datePurchased, setDatePurchased] = useState('');
    const [storageLocation, setStorageLocation] = useState('');

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const onEdit = maintenanceEquipment => {
        setMaintenanceEquipmentToEdit(maintenanceEquipment);
        history.push("/edit-maintenance-equipment");
    }


    const onDelete = async equipmentID => {
        console.log("Called on delete");
        const response = await fetch(`/maintenanceequipment/${equipmentID}`, {
            method: "DELETE"
        });
        
        if (response.status === 204){
            window.location.reload(false); // Force refresh the page to remove the deleted one
        } else {
            console.error(`Failed to delete park with id = ${equipmentID}, status code = ${response.status}`);
        }
        
    };

    const loadMaintenenanceEquipment = async () => {
        const url = '/maintenanceequipment'
        const response = await fetch(url);
        const data = await response.json();
        setMaintenanceEquipments(data);
    }

    useEffect(() => {
        loadMaintenenanceEquipment();
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <h2>Maintenance Equipment</h2>
            <MaintenanceEquipmentList maintenanceEquipments={maintenanceEquipments} onDelete={onDelete} onEdit={onEdit}></MaintenanceEquipmentList>
            <Link to='/add-equipment'>Add a new Equipment</Link>
        </>
    )
}

export default MaintenanceEquipment;