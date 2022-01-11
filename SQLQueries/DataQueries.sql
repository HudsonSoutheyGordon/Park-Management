-- PARKS

-- Multi Insert for intialization
INSERT INTO `Parks` (parkName, borough, squareMeterage) VALUES
	("Eden Valley Park", "Etobicoke", 1000),
	("Ledburry Park", "North York", 500);

-- Solo insert for actual implementation
INSERT INTO `Parks` (parkName, borough, squareMeterage) VALUES
	("Grey Parkette", "North York", 50);
	
-- ParkFacilities

-- Multi Insert for intialization
INSERT INTO `ParkFacilities` (facilityType, facilityLocation, maintenanceStatus, monthlyCost) VALUES
	("Skating Rink", 2, 0, 500),
	("Jungle Gym", 1, 0, 100);

-- Solo insert for actual implementation
INSERT INTO `ParkFacilities` (facilityType, facilityLocation, maintenanceStatus, monthlyCost) VALUES
	("Fence", 3, 1, 25);
	
-- MaintenanceEquipment

-- Multi Insert for intialization
INSERT INTO `MaintenanceEquipment` (equipmentType, datePurchased, storageLocation) VALUES
	("Lawn Mower", '2018-05-01', 1),
	("Power Washer", '2020-08-15', 2);

-- Solo insert for actual implementation
INSERT INTO `MaintenanceEquipment` (equipmentType, datePurchased, storageLocation) VALUES
	("Rake", '2015-11-10', 1);
	
-- Describe Employees

-- Multi Insert for intialization
INSERT INTO `Employees` (firstName, lastName, email, phoneNumber, jobTitle, hourlyRate) VALUES
	("Matt", "Rost", "coolMatt@hotmail.com", 4165551234, "Database Administrator", 1000),
	("Bubba", "Gordon", "bigGamer@aol.com", 6475551144, "Volunteer Lifeguard", NULL);

-- Solo insert for actual implementation
INSERT INTO `Employees` (firstName, lastName, email, phoneNumber, jobTitle, hourlyRate) VALUES
	("Joshua", "Minoa", "joshM1234@gmail.com", 6475554164, "Groundskeeper", 75);

-- Equipment_Employees

-- Solo insert for actual implementation
INSERT INTO `Equipment_Employees` (equipmentID, employeeID) VALUES
	(1, 3);

-- Parks_Employees

-- Multi Insert for intialization
INSERT INTO `Parks_Employees` (parkID, employeeID) VALUES
	(1, 3),
	(2, 3),
	(3, 3);
	
-- Solo insert for actual implementation
INSERT INTO `Parks_Employees` (parkID, employeeID) VALUES
	(2, 2);
