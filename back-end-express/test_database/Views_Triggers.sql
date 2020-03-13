-- Team 2 Hotdog app database views and triggers file

-- 3/12/2020 Added Views for select tables that we can choose to pull from 
-- and Triggers to ensure proper data will be entered into the database.

-- We can merge this file and the database file once we choose to implement
    
-- -----------------------------------------------------
-- Views
-- -----------------------------------------------------

CREATE VIEW CustomersView AS

SELECT CustomerID, FirstName, LastName, Phone, Email, `Password`
FROM Customers;
-- -----------------------------------------------------

CREATE VIEW VendorView AS

SELECT VendorID, StartTime, EndTime, DaysAWeek, FirstName, LastName, Business, Phone, Location, Email, coords, iconImage, content
FROM Vendors;
-- -----------------------------------------------------

CREATE VIEW MenuView AS

SELECT MenuID, `Type`, Vendors_VendorID
FROM Menu;
-- -----------------------------------------------------

CREATE VIEW ItemsView AS

SELECT ItemID, ItemName, Price, `Type`
FROM Items;


-- -----------------------------------------------------
-- Triggers
-- -----------------------------------------------------

-- Trigger to ensure a proper email address is added
DELIMITER $$
CREATE TRIGGER EmailCheck
BEFORE INSERT ON Signin
FOR EACH ROW
BEGIN
		IF  NEW.Email NOT LIKE '%@%' THEN
					SIGNAL SQLSTATE '45000';
		END IF;
END
$$
DELIMITER ;

-- Test email trigger with insert
-- SELECT * FROM Signin;
-- INSERT INTO Signin VALUES
-- (15,'None','Customer','john.boyd.seattlecolleges.edu','123','John','Boyd');



-- Trigger to ensure users created password strength is up to snuff
-- ie longer than 8 chars and does not contains a special character
DELIMITER $$
CREATE TRIGGER PasswordCheck
BEFORE INSERT ON Signin
FOR EACH ROW
BEGIN
		IF  LENGTH(NEW.`Password`) < 8 OR NEW.`Password` REGEXP '[^a-zA-Z0-9]' THEN
					SIGNAL SQLSTATE '45000';
		END IF;
END
$$
DELIMITER ;

-- Test passwordcheck Trigger

-- INSERT INTO Signin VALUES
-- (17, 'None','Customer','john.boyd.seattlecolleges.edu','asd1dgfds','John','Boyd');


    
    