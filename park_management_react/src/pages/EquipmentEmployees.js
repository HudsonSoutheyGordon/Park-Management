import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';
import EquipmentEmployeeList from '../components/EquipmentEmployeeList';


function EquipmentEmployees( { setEquipmentEmployeeToEdit }){

    const [equipmentEmployees, setEquipmentEmployees] = useState([])

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const onEdit = equipmentEmployee => {
        setEquipmentEmployeeToEdit(equipmentEmployee);
        history.push("/edit-park-employee");
    }

    const onDelete = async equipmentEmployee => {
        const response = await fetch(`/equipment_employees/${equipmentEmployee.equipmentID}/${equipmentEmployee.employeeID}`, {
            method: "DELETE"
        });
        
        console.log(response);

        if (response.status === 204){
            window.location.reload(false); // Force refresh the page to remove the deleted one
        } else {
            console.error(`Failed to delete park with id = ${equipmentEmployee.equipmentID}, status code = ${response.status}`);
        }
        
    };

    const loadEquipmentEmployees = async () => {
        const url = '/equipment_employees'
        const response = await fetch(url);
        const data = await response.json();
        setEquipmentEmployees(data);
    }

    useEffect(() => {
        loadEquipmentEmployees();
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <h2>Equipment Employees</h2>
            <EquipmentEmployeeList equipmentEmployees={equipmentEmployees} onDelete={onDelete} onEdit={onEdit}></EquipmentEmployeeList>
            <Link to='/add-equipment-employee'>Add a new relationship</Link>
        </>
    )
}

export default EquipmentEmployees;
