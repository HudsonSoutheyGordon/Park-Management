import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';
import EmployeesList from '../components/EmployeesList';


function Employees({ setEmployeeToEdit }){

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

    const onEdit = employee => {
        setEmployeeToEdit(employee);
        history.push("/edit-employee");
    }

    const onDelete = async employeeID => {
        console.log("Called on delete");
        const response = await fetch(`/employees/${employeeID}`, {
            method: "DELETE"
        });
        
        if (response.status === 204){
            window.location.reload(false); // Force refresh the page to remove the deleted one
        } else {
            console.error(`Failed to delete employee with id = ${employeeID}, status code = ${response.status}`);
        }
        
    };

    {/* SHOULD THIS BE lowercase employees? */}
    const loadEmployees = async () => {
        const url = '/employees'
        const response = await fetch(url);
        const data = await response.json();
        setEmployees(data);
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <h2>Employees</h2>
            <EmployeesList employees={employees} onDelete={onDelete} onEdit={onEdit}></EmployeesList>
            <Link to='/add-employee'>Add a new Employee</Link>
        </>
    )
}

//     return (
//         <>
//             <Navbar></Navbar>
//             <p>
//                 <h2>
//                     Employees
//                 </h2>
//                 <br></br>
//                 <table id="Employees">
//                     <thead>
//                         <tr>
//                             <th>employeeID</th>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Designated Borough</th>
//                             <th>Email</th>
//                             <th>Phone Number</th>
//                             <th>Job Title</th>
//                             <th>Hourly Rate</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>14123</td>
//                             <td>Johnny</td>
//                             <td>Smith</td>
//                             <td>North Toronto</td>
//                             <td>smithj@torontoparks.ca</td>
//                             <td>555-555-5555</td>
//                             <td>Lead Gardener</td>
//                             <td>50.25</td>
//                             <td><button>Edit</button></td>
//                             <td><button>Delete</button></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </p>
//             <br></br>
//         <div class = "flex-container">
//             <div class = "flex-child A">
//                 {/* Citation: The below form is modified from content submitted
//                     from one of our group members CS290 Project.*/ }
//                     <h2>Add an Employee</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         <input
//                             type="text"
//                             placeholder="First Name"
//                             value={firstName}
//                             onChange={e => setFirstName(e.target.value)} />
//                     </label>
//                     <label>
//                         <input
//                             type="text"
//                             placeholder="Last Name"
//                             value={lastName}
//                             onChange={e => setLastName(e.target.value)} />
//                     </label>
//                     <label>
//                         <input
//                             type="text"
//                             placeholder="Designated Borough (Optional)"
//                             value={designatedBorough}
//                             onChange={e => setDesignatedBorough(e.target.value)} />
//                     </label>
//                     <label>
//                         <input
//                             type="text"
//                             placeholder="Email"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)} />
//                     </label>
//                     <label>
//                         <input
//                             type="text"
//                             placeholder="PhoneNumber"
//                             value={phoneNumber}
//                             onChange={e => setPhoneNumber(e.target.value)} />
//                     </label>
//                     <label>
//                         <input
//                             type="text"
//                             placeholder="Job Title"
//                             value={jobTitle}
//                             onChange={e => setJobTitle(e.target.value)} />
//                     </label>
//                     <label>
//                         <input
//                             type="number"
//                             placeholder="Hourly Rate"
//                             value={hourlyRate}
//                             onChange={e => setHourlyRate(e.target.value)} />
//                     </label>
//                     <button>Add</button>
//                 </form>
//             </div>
//             <div className = "flex-child B">
//                     <h2> Delete an Employee </h2>
//                     <form onSubmit={handleSubmit}>
//                         <label>
//                             <input
//                                 type="number"
//                                 placeholder="employee_ID"
//                                 value={employeeID}
//                                 onChange={e => setEmployeeID(e.target.value)} />
//                         </label>
//                         <button>Delete</button>
//                     </form>
//             </div>
//         </div>
//         </>
//     )
// }

export default Employees;
