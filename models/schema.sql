DROP DATABASE IF EXISTS eventOrganizerDB;
CREATE DATABASE eventOrganizerDB;
USE eventOrganizerDB;

CREATE TABLE users (
  tableID BIGINT AUTO_INCREMENT,
  first_Name VARCHAR(255) NOT NULL,
  last_Name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  uid VARCHAR(255) NOT NULL,
  UNIQUE KEY uuid (uid),
  PRIMARY KEY (tableID)
);

CREATE TABLE statusCodes (
  code TINYINT AUTO_INCREMENT,
  meaning VARCHAR(255) NOT NULL,
  UNIQUE KEY status_Code (code)
);

CREATE TABLE events (
  eventID BIGINT AUTO_INCREMENT,
  event_time DATE NOT NULL,
  strt_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  loc VARCHAR(255) NOT NULL,
  event_Obj JSON NOT NULL,
  event_owner VARCHAR(255) NOT NULL,
  PRIMARY KEY (eventID),
  FOREIGN KEY (event_owner) REFERENCES users(uid)
);

CREATE TABLE user_relationships (
  relID BIGINT AUTO_INCREMENT,
  from_User VARCHAR(255) NOT NULL,
  target_User VARCHAR(255) NOT NULL,
  status_Code TINYINT,
  sent_Time DATETIME DEFAULT CURRENT_TIMESTAMP,
  response_Time DATETIME,
  PRIMARY KEY (relID),
  FOREIGN KEY (status_Code) REFERENCES statusCodes(code)
);

/* id INT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  allDay BOOLEAN NOT NULL DEFAULT FALSE,
  strt_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  url VARCHAR(255),
  className VARCHAR(255),
  editable,
  startEditable,
  durationEditable,
  resourceEditable,
  render,
  overlap,
  constrain
  */