import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <ul id="nav">
            <li><Link class="links" to="/">Home</Link></li>
            <li><Link class="links" to="/employees">Employees</Link></li>
            <li><Link class="links" to="/parks">Parks</Link></li>
            <li><Link class="links" to="/park-facilities">Park Facilities</Link></li>
            <li><Link class="links" to="/maintenance-equipment">Maintenance Equipment</Link></li>
            <li><Link class="links" to="/equipment-employees">Equipment-Employees Relationship</Link></li>
            <li><Link class="links" to="/parks-employees">Parks-Employees Relationship</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;