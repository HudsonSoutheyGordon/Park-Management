import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function AddPark() {

    const [parkName, setParkName] = useState('');
    const [borough, setBorough] = useState('');
    const [squareMeterage, setSquareMeterage] = useState('');

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const addPark = async () => {
        if (parkName == "") {
            alert("Please enter a park name.")
            return
        }
        if (borough == "") {
            alert("Please enter a borough.")
            return
        }
        if (squareMeterage == "") {
            alert("Please enter park size.")
            return
        }

        console.log("Ran Add Park");
        const newPark = { parkName, borough, 
            squareMeterage };
        const response = await fetch('/parks', {
            method: 'POST',
            body: JSON.stringify(newPark),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        history.push("/parks");
    };

    return (
        <>
        <Navbar></Navbar>
        <h2>Add a Park</h2>
                 <form onSubmit={handleSubmit}>
                     <label>
                         <input
                             type="text"
                             placeholder="Park Name"                             
                             value={parkName}
                             onChange={e => setParkName(e.target.value)} />
                     </label>
                     <label>
                         <input
                             type="text"
                             placeholder="Borough"
                             value={borough}
                             onChange={e => setBorough(e.target.value)} />
                     </label>
                     <label>
                         <input
                             type="number"
                             placeholder="Square Meterage"                             
                             value={squareMeterage}
                             onChange={e => setSquareMeterage(e.target.value)} />
                     </label>
                     <button
                        onClick ={addPark}
                    >Add</button>
                 </form>
                 <Link to='/parks'>Cancel and return</Link>
        </>
    );
}

export default AddPark;
