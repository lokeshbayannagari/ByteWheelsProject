
DROP DATABASE IF EXISTS bytewheels;
CREATE DATABASE bytewheels;
USE bytewheels;

DROP TABLE IF EXISTS vehiclemodels;
CREATE TABLE vehiclemodels
(
    vehiclemodelid INTEGER AUTO_INCREMENT,
    vehiclemodelname VARCHAR(1024) NOT NULL,
    vehiclemodelcount INTEGER NOT NULL,
    PRIMARY KEY(vehiclemodelid)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS vehiclecategories;
CREATE TABLE vehiclecategories
(
    vehiclecategoryid INTEGER AUTO_INCREMENT,
    categoryname VARCHAR(1024) NOT NULL,
    categorycost INTEGER NOT NULL,
    PRIMARY KEY(vehiclecategoryid)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS vehicles;
CREATE TABLE vehicles
(
    vehicleid INTEGER AUTO_INCREMENT,
    vehicleno VARCHAR(128) NOT NULL,
    vehiclemodelid INTEGER NOT NULL,
    vehiclecategoryid INTEGER NOT NULL,
    PRIMARY KEY (vehicleid),
    CONSTRAINT vehiclemodels_vehicles_fk1 FOREIGN KEY (vehiclemodelid) REFERENCES vehiclemodels (vehiclemodelid),
    CONSTRAINT vehiclecategories_vehicles_fk2 FOREIGN KEY (vehiclecategoryid) REFERENCES vehiclecategories (vehiclecategoryid)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings
(
	bookingid INTEGER AUTO_INCREMENT,
    vehicleid INTEGER NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    emailid VARCHAR(512) NOT NULL,
    PRIMARY KEY (bookingid),
    CONSTRAINT vehicles_bookings_fk1 FOREIGN KEY (vehicleid) REFERENCES vehicles (vehicleid)
) ENGINE = InnoDB;

INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('Ford Fiesta', 2);
INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('Ford Focus', 2);
INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('Chevrolet Malibu', 2);
INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('Volkswagen Jetta', 2);
INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('Ford Egde', 2);
INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('Ford Escape', 2);
INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('BMW 328i', 2);
INSERT INTO vehiclemodels (vehiclemodelname, vehiclemodelcount) VALUES ('BMW X5', 2);

INSERT INTO vehiclecategories (categoryname, categorycost) VALUES ('Compact', 20);
INSERT INTO vehiclecategories (categoryname, categorycost) VALUES ('Full', 30);
INSERT INTO vehiclecategories (categoryname, categorycost) VALUES ('Large', 40);
INSERT INTO vehiclecategories (categoryname, categorycost) VALUES ('Luxury', 50);

INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Fiesta 01', 1, 1);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Fiesta 02', 1, 1);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Focus 01', 2, 1);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Focus 02', 2, 1);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Chevrolet Malibu 01', 3, 2);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Chevrolet Malibu 02', 3, 2);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Volkswagen Jetta 01', 4, 2);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Volkswagen Jetta 02', 4, 2);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Egde 01', 5, 3);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Egde 02', 5, 3);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Escape 01', 6, 3);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('Ford Escape 02', 6, 3);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('BMW 328i 01', 7, 4);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('BMW 328i 02', 7, 4);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('BMW X5 01', 8, 4);
INSERT INTO vehicles (vehicleno, vehiclemodelid, vehiclecategoryid) VALUES ('BMW X5 02', 8, 4);
