DROP DATABASE IF EXISTS eventOrganizerDB;
CREATE DATABASE eventOrganizerDB;
USE eventOrganizerDB;

CREATE TABLE users (
  tableID BIGINT AUTO_INCREMENT,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  uid VARCHAR(255) NOT NULL,
  UNIQUE KEY uuid (uid),
  PRIMARY KEY (tableID)
);

CREATE TABLE statusCodes (
  code INT AUTO_INCREMENT,
  meaning VARCHAR(255) NOT NULL,
  PRIMARY KEY (code)
);

CREATE TABLE events (
  eventID BIGINT AUTO_INCREMENT,
  loc VARCHAR(255) NOT NULL,
  eventObj JSON NOT NULL,
  eventOwner VARCHAR(255) NOT NULL,
  PRIMARY KEY (eventID),
  FOREIGN KEY (eventOwner) REFERENCES users(uid)
);

CREATE TABLE userRel (
  relID BIGINT AUTO_INCREMENT,
  fromUser VARCHAR(255) NOT NULL,
  targetUser VARCHAR(255) NOT NULL,
  statusCode INT,
  sentTime DATETIME DEFAULT CURRENT_TIMESTAMP,
  responseTime DATETIME,
  PRIMARY KEY (relID),
  FOREIGN KEY (statusCode) REFERENCES statusCodes(code)
);