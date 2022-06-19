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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `pk` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `introduce` varchar(2000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `room_is_open` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pk`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'lee@naver.com','I am a God,\nYou dull creature.\nAnd I ...\n\"Puny God.\"','헐크','{bcrypt}$2a$10$7QhgTEkA/GZF15uu1EEmjO5hkCrB/K8do7XBiEi7JJwCbmq9skMbe','1/profile/220519_a5b627d4-b822-416c-ae74-417d0e05e5e4.gif','FALSE','lee','ROLE_USER'),(2,'ssafy@ssafy.com','싸피 수료 한달 전\n마지막 프로젝트\n가보자고!','김싸피','{bcrypt}$2a$10$Kn1WHPRtJfSM9VGn6OLmretocYx927n9xqQlU7u1z9.IbaE3RKHQK','2/profile/220517_5ecb056e-1086-4858-a610-2f35db53fcd1.jpeg','FALSE','ssafy','ROLE_USER'),(3,'lee@naver.com','자기소개가 아직 없습니다.','장싸피','{bcrypt}$2a$10$YwWjYvpeBxyVvBnxv/WxNOXqBy243Oi9T0j4Qn1Dc4tArYAZK9bDW','default.png','FALSE','leee','ROLE_USER'),(4,'lee@naver.com','자기소개가 아직 없습니다.','이싸피','{bcrypt}$2a$10$oCL5z.7WYNEhVhYLZdqx7.tbb182YzuiyMaIV8fzPv/qRAMMLfFjO','default.png','FALSE','leee','ROLE_USER'),(5,'eunjin@ssafy.com','I am... G..roo..t','아이 엠 그루트','{bcrypt}$2a$10$yUVx/hPqRDSBV8YoaeAoPuyzs8egBJ8nHDn8Ux6GATSvltNrv7SQO','5/profile/220519_daa57a5c-c77f-45eb-96b7-d1da9500295e.gif','FALSE','eunjin','ROLE_USER'),(6,'ossafy@ssafy.com','I Love you 3000❤\n','아이언맨','{bcrypt}$2a$10$TeUimTkBooh8GIJloY2G1e6FEgv9EIi7PEG4fsBOHl/bl9EpAw2KG','6/profile/220519_5feb9779-d49e-42be-8cb2-3ae2b35c8e2b.gif','FALSE','ossafy','ROLE_USER'),(7,'ssafy0601@gmail.com','자기소개가 아직 없습니다.','ssafyTestEmail','{bcrypt}$2a$10$cxiOIoP7U2fyvBlkdK8I5uOZEVlnnVIIFdeJ.tTCbTxiiJeWmfyaW','default.png','FALSE','ssafyTestEmail','ROLE_USER'),(8,'aaaa@ssafy.com','자기소개가 아직 없습니다.','aaa','{bcrypt}$2a$10$wBTHlcHADN6ezjiDXqAcqOjuEyz4kvl4lb74Y0xQNrP1tWMxibikO','default.png','FALSE','aaaa','ROLE_USER'),(9,'aaa@aaa.aaa','귀여운 고양이\n고\n양\n이\nㅇㅇ\nㅇㅎ\nㅇ\nㅇ\nㅇ\nㅇ\nㅇ\nㅎㅇㅎㅇ','aaa','{bcrypt}$2a$10$fEKuePlZffooQ7lXyLdQM.sz27inFdNsTFCEPBjEiGErnzcVrjx6K','9/profile/220519_86c10146-9d52-4a89-a1bb-7016ba187e2f.jpeg','FALSE','aaa123','ROLE_USER'),(10,'bbb@bbb.bbb','자기소개가 아직 없습니다.','bbb','{bcrypt}$2a$10$mGI3K/sRZjE4kKYH2OIpruYZv7Gt7iY4N5kduwhBe6gazKflS405y','default.png','FALSE','bbb123','ROLE_USER'),(11,'test@ssafy.com','자기소개가 아직 없습니다.','test','{bcrypt}$2a$10$cZcHhbos5BUou9kO1W4LC.NK6y6IJvOD2mPfJoaLNcJ9SLGpKfGua','default.png','FALSE','test','ROLE_USER'),(12,'ohsg97@gmail.com','자기소개가 아직 없습니다.','ddd','{bcrypt}$2a$10$5bFSihx.DpyxxlZlj4ibleEZ1/.kib4YwKe5mEK.FuEZ/bBlNU3Ey','default.png','FALSE','ddd123','ROLE_USER'),(13,'kyj71819@naver.com','With great power\ncomes \ngreat responsibility\n----------------------------\n❤~ing with MJ','스파이더맨','{bcrypt}$2a$10$yFw16AvC9735b2hv0.bXoePuX.iO0c45EikVt6.uis2u7ZqTc/7hu','13/profile/220519_786340a6-985a-4ac8-adb2-3e1f25c535d6.png','FALSE','sss','ROLE_USER'),(14,'jossafy@ssafy.com','If I tell you what happens, it won\'t happen.','닥터 스트레인지','{bcrypt}$2a$10$rgI.DRT2lbjAL8q5lwsIT.vhax3mnWsXX5Av33l1iheBr.izXDmmK','14/profile/220519_66d0b517-33d8-4f2e-9b90-cd6d9ecfe3e2.jpeg','FALSE','young','ROLE_USER'),(16,'ssrcus27@naver.com','자기소개가 아직 없습니다.','lee','{bcrypt}$2a$10$tRPmPyR9YoRBcRapuvvBxeaegB.PYPPEgOzN/CCFK/FBdYxzeNtiW','default.png','FALSE','leessafy','ROLE_USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  4:30:16
