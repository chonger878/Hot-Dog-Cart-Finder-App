-- Team 2 Hotdog app database
-- Created: 2/6/2020
-- Basic layout of database w/ sample data

-- Sample Query
/*
 SELECT Customers.FirstName, Customers.CustomerID
 FROM Customers
	JOIN Orders USING(CustomerID)
WHERE CustomerID > 2;
*/
SELECT * FROM Signin;
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
  `CustomerID` INT 		   NOT NULL,
  `FirstName`  VARCHAR(45) NOT NULL,
  `LastName`   VARCHAR(45) NOT NULL,
  `Phone`      VARCHAR(45) NOT NULL,
  `Email`      VARCHAR(45) NOT NULL,
  `Password`   VARCHAR(45) NOT NULL,
  
  PRIMARY KEY (CustomerID));
-- -----------------------------------------------------
-- Data Customers
-- -----------------------------------------------------
INSERT INTO Customers VALUES
	(1, 'John', 'Boyd', '555-555-5555', 'john.boyd@seattlecolleges.edu','123'),
    (2, 'Joe', 'Shmo', '582-554-2989', 'joe.schmo@gmail.com','1234'),
    (3, 'Armando', 'Tyce', '825-189-4448', 'armando.tyce@aol.com','1232'),
	(4, 'Jephthah', 'Nazaret', '663-687-5318', 'jephthah.nazaret@hotmail.com','1213'),
	(5, 'Sophia', 'Pitceathly', '346-319-1983', 'sophia.pitceathly@yahoo.com','1234');


-- -----------------------------------------------------
-- Table Vendors
-- -----------------------------------------------------
DROP TABLE IF EXISTS Vendors;

CREATE TABLE IF NOT EXISTS Vendors(
  `VendorID`      INT 		  NOT NULL,
  `StartTime`     TIME        NOT NULL,
  `EndTime`       TIME        NOT NULL,
  `DaysAWeek`     SET('Sn','M','T','W','Th','F','S')  NOT NULL,
  `FirstName`     VARCHAR(45) NOT NULL,
  `LastName`      VARCHAR(45) NOT NULL,
  `Business`      VARCHAR(45) NOT NULL,
  `Phone`         VARCHAR(45) NULL,
  `Location`      VARCHAR(45) NOT NULL,
  `Email`         VARCHAR(45) NULL,
  `coords`        JSON,
  `iconImage`     VARCHAR(300),
  `content`       VARCHAR(45), 
  
  PRIMARY KEY (VendorID));
-- -----------------------------------------------------
-- Data Vendors
-- -----------------------------------------------------
INSERT INTO Vendors VALUES
	(1, '09:00', '17:00', ('M,T,W,Th'), 'Marta', 'Dennes', 'Twitterlist', '615-747-7967', '123 Fake Street', 'mdennes0@squarespace.com', '{"lat": "47.6010", "lng": "-122.3290"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 1"),
 	(2, '09:00', '17:00', ('M,T,W'), 'Esdras', 'Caldecott', 'Jatri', '202-563-0622', '321 More Fake Street', 'ecaldecott1@salon.com', '{"lat": "47.6040", "lng": "-122.3260"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 2"),
 	(3, '09:00', '17:00', ('M,T,W,Th,F'), 'Eddie', 'Gulliford', 'Wikizz', '719-439-2366', '222 Some Street', 'egulliford2@yelp.com', '{"lat": "47.6050", "lng": "-122.3240"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 3"),
 	(4, '09:00', '17:00', ('F,S,Sn'), 'Janeen', 'Clougher', 'Eamia', '864-575-4106', 'Area 51, NM', 'jclougher3@cmu.edu', '{"lat": "47.6060", "lng": "-122.3250"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 4"),
 	(5, '09:00', '17:00', ('M,T,W'), 'Abeu', 'Garth', 'Linkbridge', '587-256-7827', '111 Underwater Drive, Atlantis', 'agarth4@xinhuanet.com', '{"lat": "47.6020", "lng": "-122.3270"}', 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', "Cart 5");



-- -----------------------------------------------------
-- Table Items
-- -----------------------------------------------------
DROP TABLE IF EXISTS Items;

CREATE TABLE IF NOT EXISTS Items(
  `ItemID`     INT 		   NOT NULL,
  `ItemName`   VARCHAR(45) NOT NULL,
  `Price`      DECIMAL     NOT NULL,
  `Type`       VARCHAR(45) NOT NULL,
  
  PRIMARY KEY (ItemID));
-- -----------------------------------------------------
-- Data Vendors
-- -----------------------------------------------------
INSERT INTO Items VALUES
	(1, 'Onion', 0.41, 'Topping'),
	(2, 'Ketchup', 0.74, 'Topping'),
	(3, 'Coke', 1.55, 'Drink'),
	(4, 'Relish', 1.55, 'Topping'),
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
  `Items`      INT 			  NOT NULL,
  
  PRIMARY KEY (OrderID, CustomerID),
  INDEX fk_Orders_Customers_idx (CustomerID ASC),
  
  CONSTRAINT fk_Orders_Customers FOREIGN KEY (CustomerID)
    REFERENCES Customers (CustomerID)
    ON DELETE CASCADE);
-- -----------------------------------------------------
-- Data Orders
-- -----------------------------------------------------
INSERT INTO Orders VALUES
	(1, 'Y', '4', '5', '2019/07/13', '2'),
	(1, 'N', '3', '3', '2019/07/13', '1'),
	(3, 'Y', '5', '2', '2019/12/30', '4'),
	(4, 'Y', '3', '5', '2019/04/19', '5'),
	(5, 'N', '1', '4', '2020/01/23', '3');



-- -----------------------------------------------------
-- Table Order_Items
-- -----------------------------------------------------
DROP TABLE IF EXISTS Order_Items;

CREATE TABLE IF NOT EXISTS Order_Items(
  `OrderID` INT NOT NULL,
  `ItemID`  INT NOT NULL,
  
  PRIMARY KEY (OrderID, ItemID),
  INDEX fk_Orders_has_Items_Items1_idx (ItemID ASC),
  INDEX fk_Orders_has_Items_Orders1_idx (OrderID ASC),
  
  CONSTRAINT fk_Orders_has_Items_Orders1
    FOREIGN KEY (OrderID)
    REFERENCES Orders (OrderID)
    ON DELETE CASCADE,

  CONSTRAINT fk_Orders_has_Items_Items1
    FOREIGN KEY (ItemID)
    REFERENCES Items (ItemID)
    ON DELETE CASCADE);
-- -----------------------------------------------------
-- Data Order_Items
-- -----------------------------------------------------
INSERT INTO Order_Items VALUES
	('3', '5'),
	('4', '1'),
	('1', '4'),
	('5', '3'),
	('3', '2');
    
    
-- -----------------------------------------------------
-- Table Menu
-- -----------------------------------------------------
DROP TABLE IF EXISTS Menu;

CREATE TABLE IF NOT EXISTS Menu(
  `MenuID`           INT NOT     NULL,
  `Type`             VARCHAR(45) NOT NULL,
  `Vendors_VendorID` INT         NOT NULL,
  
  PRIMARY KEY (MenuID, Vendors_VendorID),
  INDEX fk_Menu_Vendors1_idx (Vendors_VendorID ASC),
  
  CONSTRAINT fk_Menu_Vendors1
    FOREIGN KEY (Vendors_VendorID)
    REFERENCES Vendors (VendorID)
    ON DELETE CASCADE);
-- -----------------------------------------------------
-- Data Menu
-- -----------------------------------------------------
INSERT INTO Menu VALUES
	('4', 'Menu Type', '4'),
	('3', 'Menu Type', '1'),
	('2', 'Menu Type', '2'),
	('2', 'Menu Type', '5'),
	('1', 'Menu Type', '3');
	
    
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
    ON DELETE CASCADE,
    
  CONSTRAINT fk_Menu_has_Items_Items1
    FOREIGN KEY (ItemID)
    REFERENCES Items (ItemID)
    ON DELETE CASCADE);
-- -----------------------------------------------------
-- Data Menu_Item
-- -----------------------------------------------------
INSERT INTO Menu_Item VALUES
	('1', '5'),
	('3', '1'),
	('2', '4'),
	('2', '3'),
	('4', '2');


-- -----------------------------------------------------
-- Table Admin
-- -----------------------------------------------------
DROP TABLE IF EXISTS Admins;

CREATE TABLE IF NOT EXISTS Admins(
  `AdminID`     INT         NOT NULL,
  `Permissions` VARCHAR(45) NOT NULL,
  `Email`       VARCHAR(45) NOT NULL,
  `Password`    VARCHAR(4) NOT NULL,

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
  `Permission`   CHAR(10)    NOT NULL,  
  `Type`         VARCHAR(45) NOT NULL,
  `Email`        VARCHAR(45) NOT NULL,
  `Password`     VARCHAR(4)  NOT NULL,
  `FirstName`    VARCHAR(45) NOT NULL,
  `LastName`     VARCHAR(45) NOT NULL,

  PRIMARY KEY (SigninId));
-- -----------------------------------------------------
-- Data Admin
-- -----------------------------------------------------
INSERT INTO Signin VALUES
	(1,'None', 'customer', 'john.boyd@seattlecolleges.edu','123', 'John', 'Boyd'),
	(2,'None', 'customer', 'joe.schmo@gmail.com','1234', 'Joe', 'Shmo'),
    (3,'None', 'customer', 'armando.tyce@aol.com','1232', 'Armando', 'Tyce'),
    (4,'None', 'customer', 'jephthah.nazaret@hotmail.com','1213', 'Jephthah', 'Nazaret'),
    (5,'None', 'customer', 'sophia.pitceathly@yahoo.com','1234', 'Sophia', 'Pitceathly'),
    (6,'None', 'admin', 'farhad', '123', 'farhad', 'bahrehmand'),
	(7,'None', 'admin', 'adam', '111', 'adam', 'adam'),
    (8,'None', 'admin', 'jones', '1111', 'jones', 'jones'),
    (9,'None', 'admin', 'dan', '1122', 'dan','dan'),
    (10,'None', 'admin', 'sarah', '2222', 'sarah', 'sarah');
