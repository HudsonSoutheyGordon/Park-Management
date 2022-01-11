import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js';

function EditPark({ parkToEdit }) {

    const [parkID, setParkID] = useState(parkToEdit.parkID);
    const [parkName, setParkName] = useState(parkToEdit.parkName);
    const [borough, setBorough] = useState(parkToEdit.borough);
    const [squareMeterage, setSquareMeterage] = useState(parkToEdit.squareMeterage);

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const editPark = async () => {
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

        console.log("Ran Edit Park");
        const editedPark = { parkName, borough, squareMeterage, parkID};
        const response = await fetch('/parks', {
            method: 'PUT',
            body: JSON.stringify(editedPark),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        history.push("/parks");
    };

    return (
        <>
            <Navbar></Navbar>
            <h2>Edit the Park</h2>
            <br></br>
            <h4>All fields mandatory</h4>
            <h2>Update a Park</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                    type="text"
                    placeholder="ParkName"
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
                    onClick ={editPark}
                >Edit</button>
            </form>
            <Link to='/parks'>Cancel and return</Link>
        </>
    );
}

export default EditPark;
