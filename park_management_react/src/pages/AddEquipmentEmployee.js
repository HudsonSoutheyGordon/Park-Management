import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function AddEquipmentEmployee() {

    const [equipmentID, setEquipmentID] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const [equipmentNames, setEquipmentNames] = useState([]);
    const [employeeNames, setEmployeeNames] = useState([]);

    const history = useHistory();

    const handleEquipmentChange = (e) => {
        setEquipmentID(e.target.value);
    }

    const handleEmployeeChange = (e) => {
        setEmployeeID(e.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    useEffect(() => {
        loadEquipment();
        loadEmployee();
    }, []);

    // Need this info for the dropdown
    const loadEquipment = async () => {
        console.log("Load equipment called");
        const url = '/maintenanceequipment'
        const response = await fetch(url);
        const data = await response.json();
        console.log("Loaded Equipment" + data);
        setEquipmentNames(data);
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

    const addEquipmentEmployee = async () => {
        if (equipmentID == "") {
            alert("Please select an equipment ID.")
            return
        }
        if (employeeID == "") {
            alert("Please select an employee ID.")
            return
        }

        console.log("Ran Add Equipment Employee");
        const newEquipmentEmployee = { equipmentID, employeeID};
        const response = await fetch('/equipment_employees', {
            method: 'POST',
            body: JSON.stringify(newEquipmentEmployee),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        history.push("/equipment-employees");
    };

    return (
        <>
        <Navbar></Navbar>
        <h2>Add Equipment Employee Relationship</h2>
                 <form onSubmit={handleSubmit}>
                    <label>
                        <select onChange={handleEquipmentChange}>
                            <option value="EquipmentName"> -- Equipment Name -- </option>
                            {equipmentNames === null ? equipmentNames = null :equipmentNames.map((equipment, i) => <option value = {equipment.equipmentID} 
                            key = {i}
                            >{equipment.equipmentType + " ID: " + equipment.equipmentID}</option>)}
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
                        onClick ={addEquipmentEmployee}
                    >Add</button>
                 </form>
                 <Link to='/equipment-employees'>Cancel and return</Link>
        </>
    );
}

export default AddEquipmentEmployee;
