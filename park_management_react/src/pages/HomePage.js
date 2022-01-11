import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar.js'

function HomePage(){

    return (
        <>
            <Navbar></Navbar>
            <h2>
                Park Management Database
            </h2>
            <br></br>
            <h4>
                IAmTheTable: Matt Rost and Hudson Southey-Gordon
            </h4>

            <p>This is a proof of concept web tool to help manage the Toronto parks services its employees.
                <br></br>
                Please use the navigation bar above to check out the different pages.
            </p>
        </>
    )
}

export default HomePage;