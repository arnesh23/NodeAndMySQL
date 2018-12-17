DROP DATABASE IF EXISTS monopolyDB;

CREATE DATABASE monopolyDB;

USE monopolyDB;


CREATE TABLE property(
ID INT NULL,
propertyName VARCHAR(50),
propertyCost DECIMAL(10,2),
Rent DECIMAL(10,2)
);

CREATE TABLE players(
ID INT AUTO_INCREMENT,
playerName VARCHAR(50),
bankBalance DECIMAL(10,2),
PRIMARY KEY (ID)
);

INSERT INTO Property(propertyName, propertyCost, Rent)
VALUES('NorthBeach', 100, 50), 
			  ('Russian Hill', 200, 100),
              ('Marina', 250, 100),
              ('SOMA', 500, 350),
              ('Mission', 500, 350),
			  ('Portero Hill', 400, 300),
              ('Castro', 450,300),
              ('Haigh Ashbury',400,300)

