-- Team 2 Hotdog app database
-- Created: 2/6/2020
-- Basic layout of database w/ sample data

-- Cascading Update has also been added to FK constraints


-- Sample Query
/*
 SELECT Customers.FirstName, Customers.CustomerID
 FROM Customers
	JOIN Orders USING(CustomerID)
WHERE CustomerID > 2;
*/
-- SELECT * FROM Signin;
-- -----------------------------------------------------
-- Schema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS hotDog;
CREATE SCHEMA IF NOT EXISTS hotDog;
USE hotDog;

-- -----------------------------------------------------
-- Table Customers
-- -----------------------------------------------------
DROP TABLE IF EXISTS Customers;

CREATE TABLE IF NOT EXISTS Customers(
  `CustomerID` INT 		   NOT NULL auto_increment,
  `FirstName`  VARCHAR(45) NOT NULL,
  `LastName`   VARCHAR(45) NOT NULL,
  `Phone`      VARCHAR(45) NOT NULL,
  `Email`      VARCHAR(45) NOT NULL,
  `Password`     VARCHAR(20) NOT NULL DEFAULT '123',
  
  PRIMARY KEY (CustomerID));
-- -----------------------------------------------------
-- Data Customers
-- -----------------------------------------------------
INSERT INTO Customers VALUES
	(1, 'John', 'Boyd', '555-555-5555', 'john.boyd@seattlecolleges.edu','123'),
  (2, 'Joe', 'Shmo', '582-554-2989', 'joe.schmo@gmail.com','1234'),
  (3, 'Armando', 'Tyce', '825-189-4448', 'armando.tyce@aol.com','1232'),
	(4, 'Jephthah', 'Nazaret', '663-687-5318', 'jephthah.nazaret@hotmail.com','1213'),
	(5, 'Sophia', 'Pitceathly', '346-319-1983', 'sophia.pitceathly@yahoo.com','1234'),
  (6, 'John', 'Doe', '346-319-1983', 'john','123');



-- -----------------------------------------------------
-- Table Vendors
-- -----------------------------------------------------
DROP TABLE IF EXISTS Vendors;

CREATE TABLE IF NOT EXISTS Vendors(
  `VendorID`      INT 		  NOT NULL auto_increment,
  `StartTime`     TIME        NULL,
  `EndTime`       TIME        NULL,
  `DaysAWeek`     SET('Sn','M','T','W','Th','F','S') NULL,
  `FirstName`     VARCHAR(45) NOT NULL,
  `LastName`      VARCHAR(45) NOT NULL,
  `Business`      VARCHAR(45) NULL,
  `Phone`         VARCHAR(45) NULL,
  `Location`      VARCHAR(45) NOT NULL,
  `Email`         VARCHAR(45) NOT NULL,
  `coords`        JSON,
  `iconImage`     VARCHAR(300) NULL,
  `content`       VARCHAR(45) NULL, 
  `Password`     VARCHAR(20) NOT NULL DEFAULT '123',
  
  PRIMARY KEY (VendorID));
-- -----------------------------------------------------
-- Data Vendors
-- -----------------------------------------------------
INSERT INTO Vendors VALUES
	(1, '09:00', '17:00', ('M,T,W,Th'), 'Marta', 'Dennes', 'Twitterlist', '615-747-7967', '123 Fake Street', 'mdennes0@squarespace.com', '{"lat": "47.6010", "lng": "-122.3290"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 1", "123"),
 	(2, '09:00', '17:00', ('M,T,W'), 'Esdras', 'Caldecott', 'Jatri', '202-563-0622', '321 More Fake Street', 'ecaldecott1@salon.com', '{"lat": "47.6040", "lng": "-122.3260"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 2","123"),
 	(3, '09:00', '17:00', ('M,T,W,Th,F'), 'Eddie', 'Gulliford', 'Wikizz', '719-439-2366', '222 Some Street', 'egulliford2@yelp.com', '{"lat": "47.6050", "lng": "-122.3240"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 3","123"),
 	(4, '09:00', '17:00', ('F,S,Sn'), 'Janeen', 'Clougher', 'Eamia', '864-575-4106', 'Area 51, NM', 'jclougher3@cmu.edu', '{"lat": "47.6060", "lng": "-122.3250"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 4","123"),
 	(5, '09:00', '17:00', ('M,T,W'), 'Abeu', 'Garth', 'Linkbridge', '587-256-7827', '111 Underwater Drive, Atlantis', 'agarth4@xinhuanet.com', '{"lat": "47.6020", "lng": "-122.3270"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 5","123");



-- -----------------------------------------------------
-- Table Items
-- -----------------------------------------------------
DROP TABLE IF EXISTS Items;

CREATE TABLE IF NOT EXISTS Items(
  `ItemID`     INT 		    NOT NULL,
  `ItemName`   VARCHAR(45)  NOT NULL,
  `Price`      DECIMAL(9,2) NOT NULL,
  `Type`       VARCHAR(45)  NOT NULL,
  
  PRIMARY KEY (ItemID));
-- -----------------------------------------------------
-- Data Vendors
-- -----------------------------------------------------
INSERT INTO Items VALUES
	(1, 'BeefDog', 4.95, 'HotDog'),
	(2, 'TofuDog', 6.00, 'HotDog'),
	(3, 'SeattleDog', 6.55, 'HotDog'),
	(4, 'SmallDog', 4.95, 'HotDog'),
	(5, 'BigDog', 5.00, 'HotDog');

-- -----------------------------------------------------
-- Table Orders
-- -----------------------------------------------------
DROP TABLE IF EXISTS Orders;

CREATE TABLE IF NOT EXISTS Orders(
  `OrderID`    INT 			  NOT NULL,
  `Status`     ENUM('Y', 'N') NOT NULL,
  `CartID`     INT 			  NOT NULL,
  `CustomerID` INT 			  NOT NULL,
  `OrderDate`  DATE			  NOT NULL,
  `Items`      JSON,
  
  PRIMARY KEY (OrderID, CustomerID),
  INDEX fk_Orders_Customers_idx (CustomerID ASC),
  
  CONSTRAINT fk_Orders_Customers FOREIGN KEY (CustomerID)
    REFERENCES Customers (CustomerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
-- -----------------------------------------------------
-- Data Orders
-- -----------------------------------------------------
INSERT INTO Orders VALUES
	(1, 'Y', '4', '5', '2019/07/13', '{"BigDog": "1", "Coke": "2"}'),
	(1, 'N', '3', '3', '2019/07/13', '{"BigDog": "1", "Ketchup": "2"}'),
	(3, 'Y', '5', '2', '2019/12/30', '{"BigDog": "1", "Relish": "2"}'),
	(4, 'Y', '3', '1', '2019/04/19', '{"Onion": "1", "Coke": "2"}'),
	(5, 'N', '1', '4', '2020/01/23', '{"BigDog": "1", "Coke": "2"}');
    
-- -----------------------------------------------------
-- Table Menu
-- -----------------------------------------------------
DROP TABLE IF EXISTS Menu;

CREATE TABLE IF NOT EXISTS Menu(
  `MenuID`   INT NOT NULL,
  `VendorID` INT NOT NULL,
  
  PRIMARY KEY (MenuID, VendorID),
  INDEX fk_Menu_Vendors1_idx (VendorID ASC),
  
  CONSTRAINT fk_Menu_Vendors1
    FOREIGN KEY (VendorID)
    REFERENCES Vendors (VendorID)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
-- -----------------------------------------------------
-- Data Menu
-- -----------------------------------------------------
INSERT INTO Menu VALUES
	('4', '4'),
	('3', '1'),
	('2', '2'),
	('5', '5'),
	('1', '3');
	
-- -----------------------------------------------------
-- Table Menu_Item
-- -----------------------------------------------------
DROP TABLE IF EXISTS Menu_Item;

CREATE TABLE IF NOT EXISTS Menu_Item(
  `MenuID` INT NOT NULL,
  `ItemID` INT NOT NULL,
  
  PRIMARY KEY (MenuID, ItemID),
  INDEX fk_Menu_has_Items_Items1_idx (ItemID ASC),
  INDEX fk_Menu_has_Items_Menu1_idx  (MenuID ASC),
  
  CONSTRAINT fk_Menu_has_Items_Menu1
    FOREIGN KEY (MenuID)
    REFERENCES Menu (MenuID)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    
  CONSTRAINT fk_Menu_has_Items_Items1
    FOREIGN KEY (ItemID)
    REFERENCES Items (ItemID)
    ON DELETE CASCADE
	ON UPDATE CASCADE);
-- -----------------------------------------------------
-- Data Menu_Item
-- -----------------------------------------------------
INSERT INTO Menu_Item VALUES
	('1', '1'),
	('1', '2'),
	('1', '3'),
	('1', '4'),
	('1', '5'),
	('2', '1'),
	('2', '2'),
	('2', '3'),
	('2', '4'),
	('2', '5'),
	('3', '1'),
	('3', '2'),
	('3', '3'),
	('3', '4'),
	('3', '5'),
	('4', '1'),
	('4', '2'),
	('4', '3'),
	('4', '4'),
	('4', '5'),
	('5', '1'),
	('5', '2'),
	('5', '3'),
	('5', '4'),
	('5', '5');
    
-- -----------------------------------------------------
-- Table Admin
-- -----------------------------------------------------
DROP TABLE IF EXISTS Admins;

CREATE TABLE IF NOT EXISTS Admins(
  `AdminID`     INT         NOT NULL,
  `Permissions` VARCHAR(45) NOT NULL,
  `Email`       VARCHAR(45) NOT NULL,
  `Password`     VARCHAR(20) NOT NULL DEFAULT '123',

  PRIMARY KEY (AdminID));
-- -----------------------------------------------------
-- Data Admin
-- -----------------------------------------------------
INSERT INTO Admins VALUES
	(1,'None', 'farhad', '123'),
	(2,'None', 'adam', '111'),
  (3,'None', 'nick', '1111'),
  (4,'None', 'sarah', '1122'),
  (5,'None', 'farhad', '2222');


-- -----------------------------------------------------
-- Table Signin
-- -----------------------------------------------------
DROP TABLE IF EXISTS Signin;

CREATE TABLE IF NOT EXISTS Signin(
  `SigninId`     INT         NOT NULL,
  `Permission`   CHAR(10)    NULL DEFAULT 'None',  
  `Type`         VARCHAR(45) NOT NULL,
  `Email`        VARCHAR(45) NOT NULL,
  `Password`     VARCHAR(20) NOT NULL DEFAULT '123',
  `FirstName`    VARCHAR(45) NOT NULL,
  `LastName`     VARCHAR(45) NOT NULL,
  `loginStatus`  INT         NOT NULL DEFAULT 0,
  `CustomerID`   INT 		 NULL,

  PRIMARY KEY (SigninId),
    CONSTRAINT fk_customer
    FOREIGN KEY (CustomerID)
    REFERENCES Customers (CustomerID)
    ON DELETE CASCADE
  );
  

-- -----------------------------------------------------
-- Data Signin
-- -----------------------------------------------------
-- We can potentially create a view for this data instead of having a seperate table.
INSERT INTO Signin VALUES
(1,'None', 'customer', 'john.boyd@seattlecolleges.edu','123', 'John', 'Boyd', 0, 1),
(2,'None', 'customer', 'ad320test1@gmail.com','123456789', 'Jack', 'Boyd', 0, 2),
(3,'None', 'customer', 'armando.tyce@aol.com','1232', 'Armando', 'Tyce', 0, 3),
(4,'None', 'customer', 'jephthah.nazaret@hotmail.com','1213', 'Jephthah', 'Nazaret', 0, 4),
(5,'None', 'customer', 'sophia.pitceathly@yahoo.com','1234', 'Sophia', 'Pitceathly', 0, 5),
(16,'None', 'customer', 'john','123', 'john', 'doe', 0, 6),


(6,'None', 'admin', 'farhad', '123', 'farhad', 'bahrehmand', 0, null),
(7,'None', 'admin', 'adam', '111', 'adam', 'adam', 0, null),
(8,'None', 'admin', 'jones', '1111', 'jones', 'jones', 0, null),
(9,'None', 'admin', 'dan', '1122', 'dan','dan', 0, null),
(10,'None', 'admin', 'sarah', '2222', 'sarah', 'sarah', 0, null),

(11,'None', 'vendor', 'john.boyd', '123', 'john', 'boyd', 0, null),
(12,'None', 'vendor', 'someone', '123', 'someone', 'boyd', 0, null),
(13,'None', 'vendor', 'noone', '123', 'noone', 'boyd', 0, null),
(14,'None', 'vendor', 'susy', '123', 'susy', 'boyd', 0, null),
(15,'None', 'vendor', 'ted', '123', 'ted', 'macBB', 0, null);