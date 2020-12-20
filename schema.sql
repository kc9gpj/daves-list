-- Drops the blogger if it exists currently --

DROP DATABASE IF EXISTS Reg_Nest_db;
CREATE DATABASE Reg_Nest_db;


 CREATE TABLE categories (
 	id INTEGER NOT NULL AUTO_INCREMENT,
    category_list VARCHAR (100),
	title_list varchar(75) NOT NULL,
	price_list INTEGER (6),
	description_list VARCHAR (255),
    email_list VARCHAR (100),
	photo_list VARCHAR (150),
    PRIMARY KEY (id)
);