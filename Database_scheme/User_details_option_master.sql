-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: User_details
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS `option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `option_key` varchar(100) DEFAULT NULL,
  `option_value` varchar(100) DEFAULT NULL,
  `selectedvalue` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`),
  CONSTRAINT `option_master_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `select_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_master`
--

LOCK TABLES `option_master` WRITE;
/*!40000 ALTER TABLE `option_master` DISABLE KEYS */;
INSERT INTO `option_master` VALUES (1,1,'male','Male',NULL),(2,1,'female','Female',NULL),(3,2,'unmarried','Unmarried',NULL),(4,2,'married','Married',NULL),(5,3,'ssc','SSC',NULL),(6,3,'hsc','HSC',NULL),(8,3,'btech','BTECH',NULL),(9,3,'mtech','MTECH',NULL),(10,4,'gseb','GSEB',NULL),(11,4,'ncrt','NCRT',NULL),(12,9,'CE','CE',NULL),(13,9,'IT','IT',NULL),(14,9,'EC','EC',NULL),(15,5,'hindi','Hindi',NULL),(16,5,'gujrati','Gujrati',NULL),(17,5,'english','English',NULL),(18,6,'ahmedabad','Ahmedabad',NULL),(19,6,'rajkot','Rajkot',NULL),(20,6,'surat','Surat',NULL),(21,6,'gandhinagar','Gandhinagar',NULL),(22,6,'delhi','Delhi',NULL),(23,6,'benglure','Benglure',NULL),(24,7,'PHP','PHP',NULL),(25,7,'MySQL','MySQL',NULL),(26,7,'Laravel','Laravel',NULL),(27,7,'Nodejs','NodeJS',NULL),(28,7,'dotnet','.net',NULL),(29,7,'Reactjs','Reactjs',NULL),(30,8,'beginer','Beginer',NULL),(31,8,'Mediator','Mediator',NULL),(32,8,'Expert','Expert',NULL),(33,9,'BCA','BCA',NULL),(34,9,'MCA','MCA',NULL),(35,4,'ghseb','GHSEB',NULL);
/*!40000 ALTER TABLE `option_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 11:27:08
