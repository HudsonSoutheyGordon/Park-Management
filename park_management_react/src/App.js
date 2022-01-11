import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage.js';
import MaintenanceEquipment from './pages/MaintenanceEquipment.js';
import AddEquipment from './pages/AddEquipment.js';
import Employees from './pages/Employees.js';
import AddEmployee from './pages/AddEmployee.js';
import EditEmployee from './pages/EditEmployee.js';
import Parks from './pages/Parks.js';
import AddPark from './pages/AddPark.js';
import EditPark from './pages/EditPark.js';
import ParkFacilities from './pages/ParkFacilities.js';
import AddFacility from './pages/AddFacility.js';
import EditParkFacilities from './pages/EditParkFacilities.js'
import EquipmentEmployees from './pages/EquipmentEmployees';
import AddEquipmentEmployee from './pages/AddEquipmentEmployee.js';
import ParksEmployees from './pages/ParksEmployees';
import AddParkEmployee from './pages/AddParkEmployee.js';
import EditEquipment from './pages/EditEquipment.js';


function App() {
  const [employeeToEdit, setEmployeeToEdit] = useState()
  const [parkToEdit, setParkToEdit] = useState()
  const [parkFacilityToEdit, setParkFacilityToEdit] = useState()
  const [maintenanceEquipmentToEdit, setMaintenanceEquipmentToEdit] = useState()
  const [parkEmployeeToEdit, setParkEmployeeToEdit] = useState()
  const [equipmentEmployeeToEdit, setEquipmentEmployeeToEdit] = useState()

  // DEBUG COMMENT

  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <Route path='/' exact>
              <HomePage></HomePage>
        </Route>
        <Route path='/maintenance-equipment' exact>
              <MaintenanceEquipment setMaintenanceEquipmentToEdit={setMaintenanceEquipmentToEdit}></MaintenanceEquipment>
        </Route>
        <Route path='/edit-maintenance-equipment' exact>
              <EditEquipment equipmentToEdit={maintenanceEquipmentToEdit}></EditEquipment>
        </Route>
        <Route path='/add-equipment' exact>
              <AddEquipment></AddEquipment>
        </Route>
        <Route path='/employees' exact>
              <Employees setEmployeeToEdit={setEmployeeToEdit} ></Employees>
        </Route>
        <Route path='/add-employee' exact>
              <AddEmployee></AddEmployee>
        </Route>
        <Route path='/edit-employee' exact>
              <EditEmployee employeeToEdit={employeeToEdit}></EditEmployee>
        </Route>
        <Route path='/parks' exact>
              <Parks setParkToEdit={setParkToEdit} ></Parks>
        </Route>
        <Route path='/add-park' exact>
              <AddPark></AddPark>
        </Route>
        <Route path='/edit-park' exact>
              <EditPark parkToEdit={parkToEdit}></EditPark>
        </Route>
        <Route path='/park-facilities' exact>
              <ParkFacilities setParkFacilityToEdit={setParkFacilityToEdit}></ParkFacilities>
        </Route>
        <Route path='/add-park-facility' exact>
              <AddFacility></AddFacility>
        </Route>
        <Route path='/edit-park-facility' exact>
              <EditParkFacilities parkFacilityToEdit={parkFacilityToEdit}></EditParkFacilities>
        </Route>
        <Route path='/equipment-employees' exact>
              <EquipmentEmployees setEquipmentEmployeeToEdit={setEquipmentEmployeeToEdit}></EquipmentEmployees>
        </Route>
        <Route path='/add-equipment-employee' exact>
              <AddEquipmentEmployee></AddEquipmentEmployee>
        </Route>
        <Route path='/parks-employees' exact>
              <ParksEmployees setParkEmployeeToEdit={setParkEmployeeToEdit}></ParksEmployees>
        </Route>
        <Route path='/add-park-employee' exact>
              <AddParkEmployee></AddParkEmployee>
        </Route>
      </header>
      </Router>
    </div>
  );
}

export default App;
