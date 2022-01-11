CREATE TABLE `Parks` (

	`parkID` int(11) NOT NULL AUTO_INCREMENT,
	`parkName` varchar(255),
	`borough` varchar(255),
	`squareMeterage` float,

	PRIMARY KEY(`parkID`)
);

CREATE TABLE `Employees` (

	`employeeID` int(11) NOT NULL AUTO_INCREMENT,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phoneNumber` bigint NOT NULL, -- FORMAT 1234567890
	`jobTitle` varchar(255) NOT NULL,
	`hourlyRate` float(10),

	PRIMARY KEY(employeeID)
);

CREATE TABLE `ParkFacilities` (

	`facilityID` int(11) NOT NULL AUTO_INCREMENT,
	`facilityType` varchar(255) NOT NULL,
	`facilityLocation` int(11), -- FK parkID
	`maintenanceStatus` smallint(1) NOT NULL,
	`monthlyCost` float(10),

	PRIMARY KEY(`facilityID`),
	FOREIGN KEY (`facilityLocation`)
	REFERENCES Parks(`parkID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `MaintenanceEquipment` (

	`equipmentID` int(11) NOT NULL AUTO_INCREMENT,
	`equipmentType` varchar(255) NOT NULL,
	`datePurchased` date,
	`storageLocation` int(11), -- FK parkID

	PRIMARY KEY(`equipmentID`),
	FOREIGN KEY (`storageLocation`)
	REFERENCES Parks(`parkID`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Intersection tables below

CREATE TABLE `Parks_Employees` (

	`parkID` int NOT NULL, -- FK parkID
	`employeeID` int NOT NULL, -- FK boroughID

	PRIMARY KEY(`parkID`, `employeeID`),
	FOREIGN KEY (`parkID`)
	REFERENCES Parks(`parkID`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`employeeID`)
	REFERENCES Employees(`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE
	
);

CREATE TABLE `Equipment_Employees` (

	`equipmentID` int NOT NULL, -- FK parkID
	`employeeID` int NOT NULL, -- FK boroughID

	PRIMARY KEY(`equipmentID`, `employeeID`),
	FOREIGN KEY (`equipmentID`)
	REFERENCES MaintenanceEquipment(`equipmentID`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`employeeID`)
	REFERENCES Employees(`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE
	
);