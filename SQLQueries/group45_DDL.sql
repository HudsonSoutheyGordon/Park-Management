-- MariaDB dump 10.19  Distrib 10.4.20-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_southeyh
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` bigint(20) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `hourlyRate` float DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (1,'Matt','Rost','coolMatt@hotmail.com',4165551234,'Database Administrator',1000),(2,'Bubba','Gordon','bigGamer@aol.com',6475551144,'Volunteer Lifeguard',NULL),(3,'Joshua','Minoa','joshM1234@gmail.com',6475554164,'Groundskeeper',75);
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaintenanceEquipment`
--

DROP TABLE IF EXISTS `MaintenanceEquipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MaintenanceEquipment` (
  `equipmentID` int(11) NOT NULL AUTO_INCREMENT,
  `equipmentType` varchar(255) NOT NULL,
  `datePurchased` date DEFAULT NULL,
  `storageLocation` int(11) DEFAULT NULL,
  PRIMARY KEY (`equipmentID`),
  KEY `storageLocation` (`storageLocation`),
  CONSTRAINT `MaintenanceEquipment_ibfk_1` FOREIGN KEY (`storageLocation`) REFERENCES `Parks` (`parkID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaintenanceEquipment`
--

LOCK TABLES `MaintenanceEquipment` WRITE;
/*!40000 ALTER TABLE `MaintenanceEquipment` DISABLE KEYS */;
INSERT INTO `MaintenanceEquipment` VALUES (1,'Lawn Mower','2018-05-01',1),(2,'Power Washer','2020-08-15',2),(3,'Rake','2015-11-10',1);
/*!40000 ALTER TABLE `MaintenanceEquipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parks`
--

DROP TABLE IF EXISTS `Parks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Parks` (
  `parkID` int(11) NOT NULL AUTO_INCREMENT,
  `parkName` varchar(255) DEFAULT NULL,
  `borough` varchar(255) DEFAULT NULL,
  `squareMeterage` float DEFAULT NULL,
  PRIMARY KEY (`parkID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parks`
--

LOCK TABLES `Parks` WRITE;
/*!40000 ALTER TABLE `Parks` DISABLE KEYS */;
INSERT INTO `Parks` VALUES (1,'Eden Valley Park','Etobicoke',1000),(2,'Ledburry Park','North York',500),(3,'Grey Parkette','North York',50);
/*!40000 ALTER TABLE `Parks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ParkFacilities`
--

DROP TABLE IF EXISTS `ParkFacilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ParkFacilities` (
  `facilityID` int(11) NOT NULL AUTO_INCREMENT,
  `facilityType` varchar(255) NOT NULL,
  `facilityLocation` int(11) DEFAULT NULL,
  `maintenanceStatus` smallint(1) NOT NULL,
  `monthlyCost` float DEFAULT NULL,
  PRIMARY KEY (`facilityID`),
  KEY `facilityLocation` (`facilityLocation`),
  CONSTRAINT `ParkFacilities_ibfk_1` FOREIGN KEY (`facilityLocation`) REFERENCES `Parks` (`parkID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ParkFacilities`
--

LOCK TABLES `ParkFacilities` WRITE;
/*!40000 ALTER TABLE `ParkFacilities` DISABLE KEYS */;
INSERT INTO `ParkFacilities` VALUES (1,'Skating Rink',2,0,500),(2,'Jungle Gym',1,0,100),(3,'Fence',3,1,25);
/*!40000 ALTER TABLE `ParkFacilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parks_Employees`
--

DROP TABLE IF EXISTS `Parks_Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Parks_Employees` (
  `parkID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  PRIMARY KEY (`parkID`,`employeeID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `Parks_Employees_ibfk_1` FOREIGN KEY (`parkID`) REFERENCES `Parks` (`parkID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Parks_Employees_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parks_Employees`
--

LOCK TABLES `Parks_Employees` WRITE;
/*!40000 ALTER TABLE `Parks_Employees` DISABLE KEYS */;
INSERT INTO `Parks_Employees` VALUES (1,3),(2,2),(2,3),(3,3);
/*!40000 ALTER TABLE `Parks_Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipment_Employees`
--

DROP TABLE IF EXISTS `Equipment_Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Equipment_Employees` (
  `equipmentID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  PRIMARY KEY (`equipmentID`,`employeeID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `Equipment_Employees_ibfk_1` FOREIGN KEY (`equipmentID`) REFERENCES `MaintenanceEquipment` (`equipmentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Equipment_Employees_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment_Employees`
--

LOCK TABLES `Equipment_Employees` WRITE;
/*!40000 ALTER TABLE `Equipment_Employees` DISABLE KEYS */;
INSERT INTO `Equipment_Employees` VALUES (1,2),(1,3);
/*!40000 ALTER TABLE `Equipment_Employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-11 16:38:37
