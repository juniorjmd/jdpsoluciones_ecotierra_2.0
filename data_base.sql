CREATE DATABASE `jdpsoluc_ecotierra` ;

use `jdpsoluc_ecotierra` ;

CREATE TABLE `mapa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL,
  `desc` varchar(45) NOT NULL DEFAULT '',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` varchar(45) NOT NULL DEFAULT 'now()',
  `sorte` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
 