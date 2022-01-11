import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function AddParkEmployee() {

    const [parkID, setParkID] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const [parkNames, setParkNames] = useState([]);
    const [employeeNames, setEmployeeNames] = useState([]);

    const history = useHistory();

    const handleParkChange = (e) => {
        setParkID(e.target.value);
    }

    const handleEmployeeChange = (e) => {
        setEmployeeID(e.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    useEffect(() => {
        loadParks();
        loadEmployee();
    }, []);

    // Need this info for the dropdown
    const loadParks = async () => {
        console.log("Load parks called");
        const url = '/parks'
        const response = await fetch(url);
        const data = await response.json();
        console.log("Loaded Parks" + data);
        setParkNames(data);
    }

    // Need this info for the dropdown
    const loadEmployee = async () => {
        console.log("Load employee called");
        const url = '/employees'
        const response = await fetch(url);
        const data = await response.json();
        console.log("Loaded Employees" + data);
        setEmployeeNames(data);
    }

    const addParkEmployee = async () => {
        if (parkID == "") {
            alert("Please select a park ID.")
            return
        }
        if (employeeID == "") {
            alert("Please select an employee ID.")
            return
        }

        console.log("Ran Add Park Employee");
        const newParkEmployee = { parkID, employeeID};
        const response = await fetch('/parks_employees', {
            method: 'POST',
            body: JSON.stringify(newParkEmployee),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        history.push("/parks-employees");
    };

    return (
        <>
        <Navbar></Navbar>
        <h2>Add Park Employee Relationship</h2>
                 <form onSubmit={handleSubmit}>
                    <label>
                        <select onChange={handleParkChange}>
                            <option value="ParkName"> -- Park -- </option>
                            {parkNames === null ? parkNames = null :parkNames.map((park, i) => <option value = {park.parkID} 
                            key = {i}
                            >{park.parkName + " ID: " + park.parkID}</option>)}
                        </select>
                    </label>
                    <label>
                        <select onChange={handleEmployeeChange}>
                            <option value="EmployeeName"> -- Employee Name -- </option>
                            {employeeNames === null ? employeeNames = null :employeeNames.map((employee, i) => <option value = {employee.employeeID} 
                            key = {i}
                            >{employee.firstName + " " + employee.lastName + " ID: " + employee.employeeID}</option>)}
                        </select>
                    </label>
                     <button
                        onClick ={addParkEmployee}
                    >Add</button>
                 </form>
                 <Link to='/parks-employees'>Cancel and return</Link>
        </>
    );
}

export default AddParkEmployee;
