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
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (12,30,'深圳市',100.00,'15915155078',1,5,'月','/server/public/images/files_1524212623913_3.jpg','我的详情我的详情我的详情','2018-04-20 16:23:43','2018-04-21 18:32:10',100.00,5,'月'),(13,30,'广州市',100.00,'15915155076',1,5,'月','/server/public/images/files_1524212645365_1.jpg,/server/public/images/files_1524305138613_1.jpg','<p>我的详情我的详情我的详情</p>','2018-04-20 16:24:05','2018-04-21 18:35:41',100.00,5,'月'),(14,30,'深圳市',100.00,'15915155079',1,5,'月','/server/public/images/files_1524212645365_1.jpg','我的详情我的详情我的详情','2018-04-20 16:24:05','2018-04-21 18:31:55',100.00,5,'月'),(15,32,'珠海市',100.00,'15915155079',1,5,'月','/server/public/images/files_1524217684170_2.jpg','我的详情我的详情我的详情','2018-04-20 17:48:04','2018-04-20 17:48:04',100.00,5,'月');
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classifys`
--

LOCK TABLES `classifys` WRITE;
/*!40000 ALTER TABLE `classifys` DISABLE KEYS */;
INSERT INTO `classifys` VALUES (30,'我的办公室','/server/public/images/file_1524212613527_2.jpg',0,'2018-04-20 16:23:33','2018-04-20 16:23:33'),(31,'我的办公室111','/server/public/images/file_1524212708809_2.jpg',1,'2018-04-20 16:25:08','2018-04-20 16:25:08'),(32,'tttttt','/server/public/images/file_1524212717816_icon2.png',1,'2018-04-20 16:25:17','2018-04-21 18:44:48');
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

-- Dump completed on 2018-04-21 18:45:52
