import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/navbar.js'
import ParksList from '../components/ParksList';


function Parks( { setParkToEdit }){

    const [parks, setParks] = useState([]);
    const [parkID, setParkID] = useState('');
    const [borough, setBorough] = useState('');
    const [squareMeterage, setSquareMeterage] = useState('');

    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const onEdit = park => {
        setParkToEdit(park);
        history.push("/edit-park");
    }

    const onDelete = async parkID => {
        console.log("Called on delete");
        const response = await fetch(`/parks/${parkID}`, {
            method: "DELETE"
        });
        
        if (response.status === 204){
            window.location.reload(false); // Force refresh the page to remove the deleted one
        } else {
            console.error(`Failed to delete park with id = ${parkID}, status code = ${response.status}`);
        }
        
    };

    const loadParks = async () => {
        const url = '/parks'
        const response = await fetch(url);
        const data = await response.json();
        setParks(data);
    }

    useEffect(() => {
        loadParks();
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <h2>Parks</h2>
            <ParksList parks={parks} onDelete={onDelete} onEdit={onEdit}></ParksList>
            <Link to='/add-park'>Add a new Park</Link>

        </>
    )
}

//     return (
//         <>
//             <Navbar></Navbar>
//             <p>
//                 <h2>
//                     Parks
//                 </h2>
//                 <br></br>
//                 <table id="parks">
//                     <thead>
//                         <tr>
//                             <th>parkID</th>
//                             <th>Borough</th>
//                             <th>Square Meterage</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>52134</td>
//                             <td>North Toronto</td>
//                             <td>450</td>
//                             <td><button>Edit</button></td>
//                             <td><button>Delete</button></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </p>
//             <br></br>
//
//         {/* Citation: The below form is modified from content submitted
//             from one of our group members CS290 Project.*/ }
//             <h2>Add a park</h2>
//         <form onSubmit={handleSubmit}>
//             <fieldset>
//                 <label>
//                     <input
//                         type="text"
//                         placeholder="Borough"
//                         value={borough}
//                         onChange={e => setBorough(e.target.value)} />
//                 </label>
//                 <label>
//                     <input
//                         type="number"
//                         placeholder="Square Meterage"
//                         value={squareMeterage}
//                         onChange={e => setSquareMeterage(e.target.value)} />
//                 </label>
//                 <button>Add</button>
//             </fieldset>
//         </form>
//         </>
//     )
// }

export default Parks;
