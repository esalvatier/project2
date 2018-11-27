DROP DATABASE IF EXISTS eventOrganizersDB;
CREATE DATABASE eventOrganizersDB;

CREATE TABLE events (
  id INT AUTO_INCREMENT,
  event_time DATE NOT NULL,
  strt_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  loc VARCHAR(255) NOT NULL,
  event_type VARCHAR(255) NOT NULL,
  calenderObj JSON NOT NULL,
  canceled BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY event_owner REFERENCES users(uid),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  friends VARCHAR(255),
  uid VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
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