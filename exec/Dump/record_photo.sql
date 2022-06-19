-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: k6b204.p.ssafy.io    Database: record
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `media_url` varchar(255) DEFAULT NULL,
  `record_dt` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `visible_status` varchar(255) DEFAULT NULL,
  `user_pk` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqdtu27ajfdgv2qdj2awlwjqnk` (`user_pk`),
  CONSTRAINT `FKqdtu27ajfdgv2qdj2awlwjqnk` FOREIGN KEY (`user_pk`) REFERENCES `user` (`pk`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (36,'13/photo/220519_82b99783-73fa-45d4-8d0e-ac7a986afd38.png','2022-05-20 00:00:44.867000','ironman and groot','PUBLIC',13),(37,'13/photo/220519_5be6c962-074c-4e56-96ae-c4d79dc8434b.png','2022-05-20 00:15:17.380000','sisg','PRIVATE',13),(38,'13/photo/220519_59dd8da8-efb8-4807-949d-2688be816e66.png','2022-05-20 00:26:32.730000','cute guys','PRIVATE',13),(39,'13/photo/220519_f3a7da0e-ac43-4d81-8f67-f517cda2838d.png','2022-05-20 00:35:35.208000','avengers v^^V','PUBLIC',13),(40,'2/photo/220519_81e27ce1-3c69-403a-b3a7-2628e4c8c9b6.png','2022-05-20 00:44:11.280000','우리 여기있어!!','PRIVATE',2),(41,'2/photo/220519_3534266c-7e35-4e3c-a625-686b6a2e43ed.png','2022-05-20 01:02:07.696000','새벽감성','PUBLIC',2),(42,'9/photo/220519_72c22039-6095-409a-accd-5cdf64cf73e8.png','2022-05-20 02:28:42.028000','dlak;jfeioakldiaj;oegaklj;doifjaejfalkjdiofjakejf;aijd','PUBLIC',9),(44,'13/photo/220519_0af48ffd-4926-493d-b140-e70be52e07d5.png','2022-05-20 03:38:09.953000','불금이다 ~~','PUBLIC',13),(45,'2/photo/220519_eab9251f-0f19-47a4-8291-0ae61a5efcf0.png','2022-05-20 03:53:57.147000','ㄴㅇㄹ','PRIVATE',2);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  4:30:14
