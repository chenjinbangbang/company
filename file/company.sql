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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,1,'广州白云区，新市，公寓式办公，1000方',33.50,10,'月','/server/public/images/articleImg1.png,/server/public/images/articleImg2.png','<p>地址位置：广州市白云区</p>','2018-04-18 16:20:32','2018-04-18 16:20:28',3.35,10,'月'),(2,2,'广州番禺区，亚运城，毛坯，1200方',20.00,5,'月','/server/public/images/articleImg2.png,/server/public/images/articleImg1.png','<p>地址位置：广州市番禺区</p>','2018-04-18 16:20:39','2018-04-20 13:52:27',2.00,5,'月'),(6,1,'深圳市',100.00,5,'月','/server/public/images/articleImg2.png,/server/public/images/files_1524207589524_4.jpg','我的详情我的详情我的详情','2018-04-20 14:06:39','2018-04-20 14:59:49',100.00,5,'月'),(7,1,'深圳市',100.00,5,'月','/server/public/images/files_1524207661062_3.jpg,,/server/public/images/files_1524207661063_4.jpg','我的详情我的详情我的详情','2018-04-20 15:01:01','2018-04-20 15:01:01',100.00,5,'月');
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
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classifys`
--

LOCK TABLES `classifys` WRITE;
/*!40000 ALTER TABLE `classifys` DISABLE KEYS */;
INSERT INTO `classifys` VALUES (1,'办公地址租赁','/server/public/images/icon1.png','2018-04-17 22:37:51','2018-04-18 16:03:01'),(2,'办公地址挂靠','/server/public/images/icon2.png','2018-04-17 22:38:21','2018-04-18 23:31:22'),(27,'我的办公室','/server/public/images/file_1524125211160_4.jpg','2018-04-19 16:06:51','2018-04-19 16:06:51'),(28,'我的办公室','/server/public/images/file_1524126224291_1.jpg','2018-04-19 16:23:44','2018-04-19 16:23:44');
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

-- Dump completed on 2018-04-20 15:03:53
