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
-- Table structure for table `diary`
--

DROP TABLE IF EXISTS `diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diary` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `content` longtext,
  `media_url` varchar(255) DEFAULT NULL,
  `record_dt` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `visible_status` varchar(255) DEFAULT NULL,
  `folder_id` bigint DEFAULT NULL,
  `user_pk` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9m28r98bp7ihmcxgffqfxk1hx` (`folder_id`),
  KEY `FKhc6p3g9dn8tie07393v13pjb3` (`user_pk`),
  CONSTRAINT `FK9m28r98bp7ihmcxgffqfxk1hx` FOREIGN KEY (`folder_id`) REFERENCES `folder` (`id`),
  CONSTRAINT `FKhc6p3g9dn8tie07393v13pjb3` FOREIGN KEY (`user_pk`) REFERENCES `user` (`pk`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary`
--

LOCK TABLES `diary` WRITE;
/*!40000 ALTER TABLE `diary` DISABLE KEYS */;
INSERT INTO `diary` VALUES (80,'VOICE','','2/diary/2/220519_4004d413-522e-4d0e-a386-fc8646dd7ae8.webm','2022-05-18 22:11:31.494000','히히','PUBLIC',37,2),(81,'VOICE','오늘 슬픈 일이 있었다','6/diary/6/220519_a9e262b2-72a1-4fc5-830a-a817e20e03c7.webm','2022-05-19 23:02:08.230000','슬픈날.... ','PRIVATE',6,6),(82,'PICTURE','날아보자 ! 아이언 맨!!!','6/diary/6/220519_1a8f4f06-b050-4a29-a795-d55313564100.gif','2022-05-19 23:03:11.543000','날아보자','PRIVATE',6,6),(83,'PICTURE','각 히어로들의 개성과 조화를 무리없이 조율. 특히 후반부 압도적 스케일과 물량의 액션 시퀀스는 입이 쩌억~ 참고로 쿠키영상에 나온 최강의 적 타노스는 2탄 아니고 3탄에 나오신답니다. 대승적 차원에서 소니만 협력해줬어도 스파이더맨도 나오는건데 ㅠㅠ','1/diary/1/220519_79eeddb3-ab8f-48c3-b087-a7401c5d8177.jpeg','2012-06-23 22:11:31.494000','어벤져스','PUBLIC',1,1),(84,'VOICE','오늘 도토리를 모아서 BGM을 샀는데 노래가 너무 좋다','6/diary/6/220519_9404846d-6ad4-4922-9e27-c79240cc9efc.webm','2022-05-19 23:06:05.707000','노래가 너무 좋아요','PRIVATE',39,6),(85,'PICTURE','오늘 차 타고 가면서 간식을 먹었는데 너무 마시써~~','5/diary/11/220519_618b093d-fd4c-4e49-b36d-38cdef777ea8.gif','2022-05-18 23:09:44.813000','냠냠','PUBLIC',11,5),(86,'PICTURE','오늘 슬픈 영화를 봐써,,\n너무 슬퍼써.. 힝,,ㅠ','5/diary/5/220519_5f902f9e-e90d-4e52-857a-50a1d92585a9.gif','2022-05-19 23:13:43.314000','힝..ㅠ','PUBLIC',5,5),(89,'PICTURE','오늘 드디어 마지막날!!!\n1등 가즈아~~','5/diary/11/220519_f8c9643e-d0b1-4853-be40-e38b61b75661.gif','2022-05-20 13:19:19.201000','오늘 드디어 끝~~','PUBLIC',11,5),(90,'PICTURE','오늘 도르마무랑 당근하고 왔다.\n협상이 잘 안되서 몇번을 했는지..\n\n매너온도좀 보고갈걸 그랬다.','14/diary/40/220519_4c988453-5e35-4d87-8c8a-a4a1a697fc8a.gif','2022-05-19 23:22:26.745000','도르마무랑 당근하고 왔다.','PRIVATE',40,14),(91,'PICTURE','I miss you...','13/diary/41/220519_e5870e8a-1e98-422e-ac17-626dafa90682.jpeg','2022-05-19 23:26:43.176000','stark','PUBLIC',41,13),(92,'PICTURE','1000 ~ing','13/diary/36/220519_c6a18eb7-2580-4817-90ae-e56ae0c7949f.webp','2022-05-19 23:28:28.817000','1000일 with MJ','PUBLIC',36,13),(93,'PICTURE','V ^^ V','13/diary/41/220519_82abd2f2-5297-482f-9690-6392842247c3.gif','2022-05-20 10:02:41.802000','with Friends','PUBLIC',41,13),(94,'PICTURE','so cute','13/diary/41/220519_729e4b5e-eec3-4b93-a20c-d29c764cbb87.jpeg','2022-05-20 10:03:18.538000','cute!!!','PUBLIC',41,13),(96,'PICTURE','Answer Me','1/diary/44/220519_18478b5a-e9fc-457a-9eac-e434d535fc09.jpeg','2022-05-20 10:07:41.331000','Who is better','PUBLIC',44,1),(97,'PICTURE','I\'m Strongest Avenger.','1/diary/44/220519_b1166210-8fe0-4e21-9441-742d3f7f7582.jpeg','2022-05-20 10:16:01.511000','hahaha','PUBLIC',44,1),(106,'PICTURE','스파이더맨 너무 멋져..!! 친구하고 싶ㄷr,..','2/diary/2/220519_bc53810d-a4b5-4b24-9b6e-1abce2e62766.gif','2022-05-20 11:37:31.597000','스파이더맨이랑 친구하고 시퍼','PUBLIC',2,2),(110,'PICTURE','토르 너무 멋져!!\n보고싶다 토르❤❤','2/diary/2/220519_ab0c3fe9-9062-4e42-83b6-04efcc927830.gif','2022-05-20 11:40:26.339000','토르 보고시퍼','PUBLIC',2,2),(115,'PICTURE','ㄴㅇㄹ','13/diary/36/220519_10f1b13e-47db-46bb-996b-355fa2f01286.png','2022-05-20 11:47:07.308000','ㅇㄹ','PRIVATE',36,13),(118,'PICTURE','Hello, everybody!','13/diary/45/220519_ff148259-1f64-4fa7-9c27-3b9aaa3650ec.jpeg','2022-05-20 12:14:48.798000','My Movie','PUBLIC',45,13),(119,'VOICE','별거 아니야 3번 갈비뼈 금 가고 5번과 6번은 뼈 부러지고 왼쪽폐 조금 아프고','13/diary/45/220519_49b25b7d-b836-4905-9d94-fbb0e68f0b87.webm','2022-05-20 12:23:14.549000','My Scene','PUBLIC',45,13),(120,'VIDEO','영상이 길에 정말 어렵습니다','13/diary/45/220519_27b3efa3-b204-4011-a0a0-0dc75e41ecce.mp4','2022-05-20 12:29:45.479000','Today','PUBLIC',45,13),(125,'PICTURE','우리의 추억','9/diary/14/220519_269535c5-eb07-4e2b-bee2-69df8ff8897b.png','2022-05-20 03:01:06.582000','1','PRIVATE',14,9);
/*!40000 ALTER TABLE `diary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  4:30:15
