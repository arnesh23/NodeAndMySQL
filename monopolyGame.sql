DROP DATABASE IF EXISTS monopolyDB;

CREATE DATABASE monopolyDB;

USE monopolyDB;


CREATE TABLE property(
ID INT NULL,
position INT default 0,
propertyName VARCHAR(50),
propertyCost DECIMAL(10,2),
Rent DECIMAL(10,2)
);

CREATE TABLE players(
ID INT AUTO_INCREMENT,
playerName VARCHAR(50),
bankBalance DECIMAL(10,2),
position INT default 0,
PRIMARY KEY (ID)
);

INSERT INTO Property(position,propertyName, propertyCost, Rent)
VALUES(1,'NorthBeach', 100, 50), 
			  (2,'Russian Hill', 200, 100),
              (3,'Marina', 250, 100),
              (4,'SOMA', 500, 350),
              (5,'Mission', 500, 350),
			  (6,'Portero Hill', 400, 300),
              (7,'Castro', 450,300),
              (8,'Haigh Ashbury',400,300)

