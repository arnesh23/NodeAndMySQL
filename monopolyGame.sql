DROP DATABASE monopolyDB;

CREATE DATABASE monopolyDB;

USE monopolyDB;


CREATE TABLE Property(
ID INT NULL,
propertyName VARCHAR(50),
propertyCost DECIMAL(10,2),
Rent DECIMAL(10,2)
);

CREATE TABLE PLAYERS(
ID INT,
playerName VARCHAR(50),
bankBalance DECIMAL(10,2)
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

