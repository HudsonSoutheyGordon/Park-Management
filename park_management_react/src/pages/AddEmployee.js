import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function AddEmployee() {

    const [employees, setEmployees] = useState([]);
    const [employeeID, setEmployeeID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [designatedBorough, setDesignatedBorough] = useState('');

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const addEmployee = async () => {
        if (firstName == "") {
            alert("Please enter a first name.")
            return
        }
        if (lastName == "") {
            alert("Please enter a last name.")
            return
        }
        if (email == "") {
            alert("Please enter an email.")
            return
        }
        if (phoneNumber == "") {
            alert("Please enter a phone number.")
            return
        }
        if (jobTitle == "") {
            alert("Please enter a job title.")
            return
        }

        console.log("Ran Add Employee");
        const newEmployee = { firstName, lastName, 
            email, phoneNumber, jobTitle, hourlyRate};
        const response = await fetch('/employees', {
            method: 'POST',
            body: JSON.stringify(newEmployee),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        /*
        Was geting an error here because we were sedning the wrong status
        code, but we don't need sthis.
        if (response.status === 201) {
            alert("Successfully added the employee");
        } else {
            alert(`Failed to add employee, status code = ${response.status}`);
        }
        */
        history.push("/employees");
    };

    return (
        <>
        <Navbar></Navbar>
        <h2>Add an Employee</h2>
                 <form onSubmit={handleSubmit}>
                     <label>
                         <input
                             type="text"
                             placeholder="First Name"                             
                             value={firstName}
                             onChange={e => setFirstName(e.target.value)} />
                     </label>
                     <label>
                         <input
                             type="text"
                             placeholder="Last Name"
                             value={lastName}
                             onChange={e => setLastName(e.target.value)} />
                     </label>
                     <label>
                         <input
                             type="text"
                             placeholder="Email"                             
                             value={email}
                             onChange={e => setEmail(e.target.value)} />
                     </label>
                     <label>
                         <input
                             type="text"
                             placeholder="PhoneNumber"
                             value={phoneNumber}
                             onChange={e => setPhoneNumber(e.target.value)} />
                     </label>
                     <label>
                         <input
                             type="text"
                             placeholder="Job Title"
                             value={jobTitle}
                             onChange={e => setJobTitle(e.target.value)} />
                     </label>
                     <label>
                         <input
                             type="number"
                             placeholder="Hourly Rate"
                             value={hourlyRate}
                             onChange={e => setHourlyRate(e.target.value)} />
                     </label>
                     <button
                        onClick ={addEmployee}
                    >Add</button>
                 </form>
                 <Link to='/employees'>Cancel and return</Link>
        </>
    );
}

export default AddEmployee;
