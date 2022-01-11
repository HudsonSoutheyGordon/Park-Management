import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js'
import ParkEmployeeList from "../components/ParkEmployeeList"


function ParksEmployees( { setParkEmployeeToEdit } ){

    const [parkEmployees, setParkEmployees] = useState([])
    const [equipmentID] = useState('');
    const [equipmentType] = useState('');

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const onEdit = parkEmployee => {
        setParkEmployeeToEdit(parkEmployee);
        history.push("/edit-park-employee");
    }

    const onDelete = async parkEmployee => {
        console.log("Called on delete");
        const response = await fetch(`/parks_employees/${parkEmployee.parkID}/${parkEmployee.employeeID}`, {
            method: "DELETE"
        });
        
        if (response.status === 204){
            window.location.reload(false); // Force refresh the page to remove the deleted one
        } else {
            console.error(`Failed to delete park with id = ${parkEmployee.parkID}, status code = ${response.status}`);
        }
        
    };

    const loadParkEmployees = async () => {
        const url = '/parks_employees'
        const response = await fetch(url);
        const data = await response.json();
        setParkEmployees(data);
    }

    useEffect(() => {
        loadParkEmployees();
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <h2>Park Employees</h2>
            <ParkEmployeeList parkEmployees={parkEmployees} onDelete={onDelete} onEdit={onEdit}></ParkEmployeeList>
            <Link to='/add-park-employee'>Add a new relationship</Link>
        </>
    )
    }

export default ParksEmployees;
