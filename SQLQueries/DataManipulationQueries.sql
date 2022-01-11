-- Data Manipulation Queries

-- INSERT Queries
-- Employees
INSERT INTO Employees (firstName, lastName, email, phoneNumber, jobTitle, hourlyRate) VALUES (:firstNameInput, :lastNameInput, :emailInput, :phoneNumberInput, :jobTitleInput, :hourlyRateInput);

-- MaintenanceEquipment
INSERT INTO MaintenanceEquipment (equipmentType, datePurchased, storageLocation) VALUES (:equipmentTypeInput, :datePurchasedInput, :storageLocationInput);

-- ParkFacilities
INSERT INTO ParkFacilities (facilityType, facilityLocation, maintenanceStatus, monthlyCost) VALUES (:facilityTypeInput, :facilityLocationInput, :maintenanceStatusInput, :monthlyCostInput);

-- Parks
INSERT INTO Parks (parkName, borough, squareMeterage) VALUES (:parkNameInput, :boroughInput, :squareMeterageInput);

-- Equipment_Employees
INSERT INTO Equipment_Employees (equipmentID, employeeID) VALUES (:equipmentIDInput, :employeeIDInput);

-- Parks_Employees
INSERT INTO Parks_Employees (parkID, employeeID) VALUES (:parkIDInput, :employeeIDInput);


-- SELECT Queries
-- Employees
SELECT * FROM Employees;

-- MaintenanceEquipment

SELECT me.equipmentID, me.equipmentType, me.datePurchased, parkName AS `storageLocation` FROM MaintenanceEquipment me 
INNER JOIN Parks p ON me.storageLocation = p.parkID
GROUP BY
	me.equipmentID
ORDER BY
	me.equipmentID ASC;

-- ParkFacilities
SELECT pf.facilityID, pf.facilityType, p.parkName AS `facilityLocation`, pf.maintenanceStatus, pf.monthlyCost FROM ParkFacilities pf 
INNER JOIN Parks p ON pf.facilityLocation = p.parkID
GROUP BY
	pf.facilityID
ORDER BY
	pf.facilityID ASC;

-- Parks
SELECT * FROM Parks;

-- Equipment_Employees
SELECT me.equipmentType, me.equipmentID, em.firstName, em.lastName, em.employeeID FROM Equipment_Employees e_e
INNER JOIN MaintenanceEquipment me ON e_e.equipmentID = me.equipmentID
INNER JOIN Employees em ON e_e.employeeID = em.employeeID
GROUP BY
	e_e.equipmentID
ORDER BY
	e_e.equipmentID ASC;

-- Parks_Employees
SELECT p.parkName, em.firstName, em.lastName FROM Parks_Employees e_e
INNER JOIN Parks p ON e_e.parkID = p.parkID
INNER JOIN Employees em ON e_e.employeeID = em.employeeID
GROUP BY
	e_e.parkID
ORDER BY
	e_e.parkID ASC;

-- DELETE Queries
-- Employees
DELETE FROM Employees WHERE employeeID = :employeeIDSelected:;

-- MaintenanceEquipment
DELETE FROM MaintenanceEquipment WHERE equipmentID = :equipmentIDSelected:;

-- ParkFacilities
DELETE FROM ParkFacilities WHERE facilityID = :facilityIDSelected:;

-- Parks
DELETE FROM Parks WHERE parkID = :parkIDSelected:;

-- Equipment_Employees
DELETE FROM equipmentType WHERE equipmentID = :equipmentIDSelected: AND employeeID = :employeeIDSelected:;

-- Parks_Employees
DELETE FROM Parks_Employees WHERE parkID = :parkIDSelected: AND employeeID = :employeeIDSelected:;


-- UPDATE Queries
-- Employees
UPDATE Employee SET firstName = :firstNameInput:, lastName = :lastNameInput:, email = :emailInput:, phoneNumber = :phoneNumberInput:, jobTitle = :jobTitleInput:, hourlyRate = :hourlyRateInput: WHERE employeeID = :employeeIDSelected:;

-- MaintenanceEquipment
UPDATE MaintenanceEquipment SET equipmentType = equipmentTypeInput:, datePurchased = :datePurchasedInput:, storageLocation = :storageLocationInput: WHERE equipmentID = :equipmentIDSelected:;

-- ParkFacilities
UPDATE ParkFacilities SET facilityType = :facilityTypeInput:, facilityLocation = :facilityLocationInput:, maintenanceStatus = :maintenanceStatusInput:, monthlyCost = :monthlyCostInput: WHERE facilityID = :facilityIDSelected:;

-- Parks
UPDATE Parks SET parkName = :parkNameInput:, borough = :boroughInput:, squareMeterage = :squareMeterageInput: WHERE parkID = :parkIDSelected:;

-- Equipment_Employees
UPDATE Equipment_Employees SET equipmentID = :equipmentIDInput:, employeeID = :employeeIDInput: WHERE equipmentID = :equipmentIDSelected: AND employeeID = :employeeIDSelected:;

-- Parks_Employees
UPDATE Parks_Employees SET parkID = :parkIDInput:, employeeID = :employeeIDInput: WHERE parkID = :parkIDSelected: AND employeeID = :employeeIDSelected:;
