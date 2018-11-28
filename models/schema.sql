DROP DATABASE IF EXISTS eventOrganizerDB;
CREATE DATABASE eventOrganizerDB;

CREATE TABLE events (
  eventID BIGINT AUTO_INCREMENT,
  event_time DATE NOT NULL,
  strt_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  loc VARCHAR(255) NOT NULL,
  event_Obj JSON NOT NULL,
  FOREIGN KEY event_owner REFERENCES users(uuid),
  PRIMARY KEY (eventID)
);

CREATE TABLE users (
  tableID BIGINT AUTO_INCREMENT,
  first_Name VARCHAR(255) NOT NULL,
  last_Name VARCHAR(255),
  uuid VARCHAR(255) NOT NULL,
  PRIMARY KEY (tableID)
);

CREATE TABLE user_relationships (
  relID BIGINT AUTO_INCREMENT,
  from_User BIGINT NOT NULL,
  target_User BIGINT NOT NULL,
  status_Code TINYINT NOT NULL,
  sent_Time DATETIME NOT NULL,
  response_Time DATETIME,
  PRIMARY KEY (relID)
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