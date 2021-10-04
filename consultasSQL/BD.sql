CREATE DATABASE IF NOT EXISTS PIN;

USE PIN;


CREATE TABLE rol (
    id_role TINYINT AUTO_INCREMENT,
    
    name VARCHAR(10) NOT NULL,
    
    PRIMARY KEY(id_role)
);


CREATE TABLE tags (
	id_tags TINYINT AUTO_INCREMENT,
	
	name VARCHAR(20),
	
	PRIMARY KEY (id_tags)
);


CREATE TABLE entity (
    id_entity INT AUTO_INCREMENT,
    id_role TINYINT NOT NULL,
    
    nick VARCHAR(10) NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(120),
    description VARCHAR(500) NOT NULL,
    mail VARCHAR(120) NOT NULL,
    phone INT NOT NULL, 
    location VARCHAR(100) NOT NULL,
    pass VARCHAR(30) NOT NULL,
    avatar LONGTEXT NOT NULL,
    
    PRIMARY KEY (id_entity),
    FOREIGN KEY (id_role) REFERENCES rol (id_role)
);


CREATE TABLE taste (
	id_tags TINYINT,
	id_entity INT,
	
	PRIMARY KEY (id_tags, id_entity),
	FOREIGN KEY (id_tags) REFERENCES tags (id_tags),
	FOREIGN KEY (id_entity) REFERENCES entity (id_entity)
);


CREATE TABLE activity (
    id_activity INT AUTO_INCREMENT,
    id_entity INT NOT NULL,
    id_tags TINYINT NOT NULL,
    
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    seats INT NOT NULL,
    price DOUBLE NOT NULL,
    location VARCHAR(100) NOT NULL,
    dateAct DATE NOT NULL,
    min_duration INT NOT NULL,
    
    PRIMARY KEY(id_activity),
    FOREIGN KEY (id_entity) REFERENCES entity (id_entity),
    FOREIGN KEY (id_tags) REFERENCES tags (id_tags)
);


CREATE TABLE review (
    id_review INT AUTO_INCREMENT,
    id_activity INT NOT NULL,
    
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    points TINYINT NOT NULL,
    
    PRIMARY KEY(id_review),
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);