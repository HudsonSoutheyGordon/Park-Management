'use strict'

import pool from './dbcon.mjs';
import express from 'express';
import mysql from 'mysql';
import { stringify } from 'querystring';

// ------------ SETUP --------------

const PORT = process.argv[2];

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// ------------ ROUTES --------------

// --- Parks ---

// READ
app.get('/parks', (req, res) => {
    let query1 = 'SELECT * FROM Parks;';
    
    pool.query(query1, function (err, results, fields){
        try {

            // Send the results to the browser
            //let base = "<h1>MySQL Results:</h1>"
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with selecting Parks");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// READ Specific Park
// This is for loading a specific park into the edit page
app.get('/parks/:parkID', (req, res) => {
    let query1 = 'SELECT * FROM Parks WHERE parkID = ?;';
    let values = [req.params.parkID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));
        } catch (err) {

            console.log("Error with finding Park by ID");
            console.log(err);
            res.status(404).send("Error");
        }
    });
});

// CREATE
app.post('/parks', (req, res) => {
    let query1 = 'INSERT INTO Parks (parkName, borough, squareMeterage) \
    VALUES (?, ?, ?);'; // ?'s are used to help keep things secure. Is a current standard
    
    let values = [
        req.body.parkName,
        req.body.borough,
        req.body.squareMeterage
    ]

    pool.query(query1, values, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with adding Parks");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// DELETE
app.delete('/parks/:parkID', (req, res) => {
    let query1 = 'DELETE FROM Parks WHERE parkID = ?;';
    let values = [req.params.parkID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(204).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with deleting Parks");
            console.log(err);
            res.status(500).send("Error");
        }

    })
});

/*
* Note on all update functions.
* This requires that no fields be blank, because we are overwriting anything.
* Thus, the front end should do a get request, and pre-populate everything as it exists
*/
// Update
app.put('/parks', (req, res) => {
    let query1 = 'UPDATE Parks SET \
    parkName = ?, borough = ?, squareMeterage = ? \
    WHERE parkID = ?;';
    
    // Make sure these are passed in order from front-end
    let values = [
        req.body.parkName,
        req.body.borough,
        req.body.squareMeterage,
        req.body.parkID
    ]

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with deleting Parks");
            console.log(err);
            res.status(500).send("Error");
        }

    });
});

// --- Employees ---

// READ
app.get('/employees', (req, res) => {
    let query1 = 'SELECT * FROM Employees;';
    
    pool.query(query1, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with selecting Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// READ Specific employee
// This is for loading a specific park into the edit page
app.get('/employees/:employeeID', (req, res) => {
    let query1 = 'SELECT * FROM Employees WHERE employeeID = ?;';
    let values = [req.params.employeeID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));
        } catch (err) {

            console.log("Error with finding Employee by ID");
            console.log(err);
            res.status(404).send("Error");
        }
    });
});

// CREATE
app.post('/employees', (req, res) => {
    let query1 = 'INSERT INTO Employees (firstName, lastName, email, phoneNumber, jobTitle, hourlyRate) \
    VALUES (?, ?, ?, ?, ?, ?);'; // ?'s are used to help keep things secure. Is a current standard
    
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phoneNumber,
        req.body.jobTitle,
        req.body.hourlyRate
    ]

    pool.query(query1, values, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with adding Employee");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// DELETE
app.delete('/employees/:employeeID', (req, res) => {
    let query1 = 'DELETE FROM Employees WHERE employeeID = ?;';
    let values = [req.params.employeeID];

    //DEBUG
    //console.log(req.body);
    console.log(req.params);
    console.log(values);

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(204).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with deleting Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })
});

// UPDATE
app.put('/employees', (req, res) => {
    let query1 = 'UPDATE Employees SET \
    firstName = ?, lastName = ?, email = ?, phoneNumber = ?, jobTitle = ?, hourlyRate = ? \
    WHERE employeeID = ?;';
    
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phoneNumber,
        req.body.jobTitle,
        req.body.hourlyRate,
        req.body.employeeID
    ]
    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with Updating Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    });
});

// --- MaintenanceEquipment ---

// READ
app.get('/maintenanceequipment', (req, res) => {

    let query1 = null;

    // If we passed filter parameters for the search
    if(Object.keys(req.body).length != 0){
        // For when we want to filter the search results

        // We need to build the string for what follows the 'WHERE' clause
        let conditions = "";

        if(req.body.equipmentID != null){
            conditions += 'equipmentID = "';
            conditions += req.body.equipmentID.toString();
            conditions += '" AND ';
        }
        if(req.body.equipmentType != null){
            conditions += 'equipmentType = "';
            conditions += req.body.equipmentType.toString();
            conditions += '" AND ';
        }
        if(req.body.storageLocation != null){
            conditions += 'storageLocation = ';
            conditions += req.body.storageLocation.toString();
            conditions += '';
        }

        // If we left a trailing ' AND ' we need to remove it
        if(conditions.substring(conditions.length - 4, conditions.length) === 'AND '){
            conditions = conditions.substring(0, str.length - 5);
        }

        query1 = 'SELECT * FROM MaintenanceEquipment WHERE ' + conditions + ';';
        //console.log(query1);
    } else {
        // For simple page loading
        query1 = 'SELECT * FROM MaintenanceEquipment;';
    }

    pool.query(query1, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with selecting MaintenanceEquipment");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// READ Specific Maintenance Equipment
// This is for loading a specific equipment into the edit page
app.get('/maintenanceequipment/:equipmentID', (req, res) => {
    let query1 = 'SELECT * FROM MaintenanceEquipment WHERE equipmentID = ?;';
    let values = [req.params.equipmentID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));
        } catch (err) {

            console.log("Error with finding Equipment by ID");
            console.log(err);
            res.status(404).send("Error");
        }
    });
});

// CREATE
app.post('/maintenanceequipment', (req, res) => {
    let query1 = 'INSERT INTO MaintenanceEquipment (equipmentType, datePurchased, storageLocation) \
    VALUES (?, ?, ?);'; // ?'s are used to help keep things secure. Is a current standard
    
    //let date = new Date(req.body.datePurchased).toISOString().split('T')[0];
    let date = new Date(req.body.datePurchased).toISOString().replace('T', " ").substr(0, 10);

    let values = [
        req.body.equipmentType,
        date,
        req.body.storageLocation
    ]

    pool.query(query1, values, function (err, results, fields){
        try {

            // Send the results to the browser
            try {
                res.status(200).send(JSON.stringify(results));
            } catch (err){
                console.log(err);
            }


        } catch (err) {

            console.log("Error with adding MaintenanceEquipment");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// DELETE
app.delete('/maintenanceequipment/:equipmentID', (req, res) => {
    let query1 = 'DELETE FROM MaintenanceEquipment WHERE equipmentID = ?;';
    let values = [req.params.equipmentID];

    console.log(req.params);
    console.log(values);

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(204).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with deleting MaintenanceEquipment");
            console.log(err);
            res.status(500).send("Error");
        }

    })
});

app.put('/maintenanceequipment', (req, res) => {
    let query1 = 'UPDATE MaintenanceEquipment SET \
    equipmentType = ?, datePurchased = ?, storageLocation = ? \
    WHERE equipmentID = ?;';
    
    let date = new Date(req.body.datePurchased).toISOString().replace('T', " ").substr(0, 10);

    let values = [
        req.body.equipmentType,
        date,
        req.body.storageLocation,
        req.body.equipmentID
    ]

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with Updating Maintenance Equipment");
            console.log(err);
            res.status(500).send("Error");
        }

    });
});


// --- ParkFacilities ---

// READ
app.get('/park-facilities', (req, res) => {
    let query1 = 'SELECT pf.facilityID, pf.facilityType, p.parkName AS `facilityLocation`, pf.maintenanceStatus, pf.monthlyCost FROM ParkFacilities pf \
    INNER JOIN Parks p ON pf.facilityLocation = p.parkID \
    GROUP BY \
        pf.facilityID \
    ORDER BY \
        pf.facilityID ASC;';
    
    pool.query(query1, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with selecting ParkFacilities");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// READ Specific Park Facility
// This is for loading a specific park facility into the edit page
app.get('/park-facilities/:facilityID', (req, res) => {
    let query1 = 'SELECT * FROM ParkFacilities WHERE facilityID = ?;';
    let values = [req.params.facilityID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));
        } catch (err) {

            console.log("Error with finding Facility by ID");
            console.log(err);
            res.status(404).send("Error");
        }
    });
});

// CREATE
app.post('/park-facilities', (req, res) => {
    let query1 = 'INSERT INTO ParkFacilities (facilityType, facilityLocation, maintenanceStatus, monthlyCost) \
    VALUES (?, ?, ?, ?);'; // ?'s are used to help keep things secure. Is a current standard
    
    let values = [
        req.body.facilityType,
        req.body.facilityLocation,
        req.body.maintenanceStatus,
        req.body.monthlyCost
    ]

    pool.query(query1, values, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with adding ParkFacilities");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// DELETE
app.delete('/park-facilities/:facilityID', (req, res) => {
    let query1 = 'DELETE FROM ParkFacilities WHERE facilityID = ?;';
    let values = [req.params.facilityID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(204).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with deleting FacilityID");
            console.log(err);
            res.status(500).send("Error");
        }

    })
});

// UPDATE
app.put('/park-facilities', (req, res) => {
    let query1 = 'UPDATE ParkFacilities SET \
    facilityType = ?, facilityLocation = ?, maintenanceStatus = ?, monthlyCost = ? \
    WHERE facilityID = ?;';
    
    let values = [
        req.body.facilityType,
        req.body.facilityLocation,
        req.body.maintenanceStatus,
        req.body.monthlyCost,
        req.body.facilityID
    ]
    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with Updating ParkFacility");
            console.log(err);
            res.status(500).send("Error");
        }

    });
});

// --- ParksEmployees ---

// READ
app.get('/parks_employees', (req, res) => {
    let query1 = 'SELECT p.parkName, p.parkID, em.firstName, em.lastName, em.employeeID FROM Parks_Employees e_e \
    INNER JOIN Parks p ON e_e.parkID = p.parkID \
    INNER JOIN Employees em ON e_e.employeeID = em.employeeID \
    GROUP BY \
        e_e.parkID \
    ORDER BY \
        e_e.parkID ASC;';
    
    pool.query(query1, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with selecting Parks_Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// CREATE
app.post('/parks_employees', (req, res) => {
    let query1 = 'INSERT INTO Parks_Employees (parkID, employeeID) \
    VALUES (?, ?);'; // ?'s are used to help keep things secure. Is a current standard
    
    let values = [
        req.body.parkID,
        req.body.employeeID
    ]

    pool.query(query1, values, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with adding Parks_Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});


// DELETE
app.delete('/parks_employees/:parkID/:employeeID', (req, res) => {
    let query1 = 'DELETE FROM Parks_Employees WHERE parkID = ? AND employeeID = ?;';
    let values = [req.params.parkID, req.params.employeeID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(204).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with deleting Parks_Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })
});

// --- Equipment_Employees ---

// READ
app.get('/equipment_employees', (req, res) => {
    let query1 = 'SELECT me.equipmentType, me.equipmentID, em.firstName, em.lastName, em.employeeID FROM Equipment_Employees e_e \
    INNER JOIN MaintenanceEquipment me ON e_e.equipmentID = me.equipmentID \
    INNER JOIN Employees em ON e_e.employeeID = em.employeeID \
    GROUP BY \
        e_e.equipmentID \
    ORDER BY \
        e_e.equipmentID ASC;';
    
    pool.query(query1, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with selecting Equipment_Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// CREATE
app.post('/equipment_employees', (req, res) => {
    let query1 = 'INSERT INTO Equipment_Employees (equipmentID, employeeID) \
    VALUES (?, ?);'; // ?'s are used to help keep things secure. Is a current standard
    
    let values = [
        req.body.equipmentID,
        req.body.employeeID
    ]

    pool.query(query1, values, function (err, results, fields){
        try {

            // Send the results to the browser
            res.status(200).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with adding Equipment_Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })

});

// DELETE
app.delete('/equipment_employees/:equipmentID/:employeeID', (req, res) => {
    let query1 = 'DELETE FROM Equipment_Employees WHERE equipmentID = ? AND employeeID = ?;';
    let values = [req.params.equipmentID, req.params.employeeID];

    pool.query(query1, values, function (err, results, fields){
        try {
            // Send the results to the browser
            res.status(204).send(JSON.stringify(results));

        } catch (err) {

            console.log("Error with deleting Equipment_Employees");
            console.log(err);
            res.status(500).send("Error");
        }

    })
});

// ----------- DEBUG -------

// Function to reset the database to it's default values. 
// No UI for this. Is purely for testing.


// ------------ LISTENER --------------

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

   