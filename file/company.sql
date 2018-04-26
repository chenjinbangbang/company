-- MySQL dump 10.13  Distrib 5.5.47, for Win32 (x86)
--
-- Host: localhost    Database: company
-- ------------------------------------------------------
-- Server version	5.5.47

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','e10adc3949ba59abbe56e057f20f883e');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `uid` int(20) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  `unit_square` int(10) DEFAULT NULL,
  `unit_time` varchar(255) DEFAULT NULL,
  `images` varchar(500) DEFAULT NULL,
  `content` mediumtext,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `price_original` double(10,2) DEFAULT NULL,
  `unit_square_original` int(10) DEFAULT NULL,
  `unit_time_original` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (18,37,'深圳市',1.00,'15915155078',1,1,'月','/static/images/files_1524725478207_2.jpg','<p><br data-mce-bogus=\"1\"></p>','2018-04-26 14:51:18','2018-04-26 14:52:19',1.00,1,'月'),(19,39,'ss',1.00,'15915155079',1,1,'月','/static/images/files_1524729359059_3.jpg','','2018-04-26 15:55:59','2018-04-26 15:55:59',1.00,1,'月');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classifys`
--

DROP TABLE IF EXISTS `classifys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classifys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `bg_color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classifys`
--

LOCK TABLES `classifys` WRITE;
/*!40000 ALTER TABLE `classifys` DISABLE KEYS */;
INSERT INTO `classifys` VALUES (37,'办公地址','/static/images/file_1524733919751_2.jpg',1,'2018-04-26 14:50:38','2018-04-26 17:11:59','#F6D5F7'),(39,'搜索','/static/images/file_1524733914989_1.jpg',1,'2018-04-26 15:50:54','2018-04-26 17:11:54','#FFE2E2'),(40,'xxxx','/static/images/file_1524733203651_4.jpg',1,'2018-04-26 16:45:27','2018-04-26 17:00:03','#E4DDFF');
/*!40000 ALTER TABLE `classifys` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-26 18:07:49
