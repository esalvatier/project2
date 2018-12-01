USE eventorganizerdb;

/*INSERT INTO statusCodes (meaning) VALUES ("Pending");
INSERT INTO statusCodes (meaning) VALUES ("Accepted");
INSERT INTO statusCodes (meaning) VALUES ("Rejected");

INSERT INTO users (first_Name, last_Name, email, uid) VALUES ("Mark", "Salvatier", "m.erik.salvatier@gmail.com", "XrIWklpLSLhP4Cbi4667xO5PkvW2");
INSERT INTO users (first_Name, last_Name, uid) VALUES ("Mark", "Salvatier", "XrIWklpLSLhP4Cbi4667xO5PkvW2");
INSERT INTO users (first_Name,  uid) VALUES ("Jared", "WdxOclmRZQM66ATKpmv5d3SbkK93");
INSERT INTO users (first_Name, last_Name, uid) VALUES ("Juan", "Ramez", "smYWJqFAeXUywbOKxkyNLzBujpT2");
INSERT INTO users (first_Name, last_Name, uid) VALUES ("Bob", "Saget", "ewjh3485y9thdh34ginosdih390sdneg");
INSERT INTO users (first_Name, last_Name, uid) VALUES ("Sam", "Lastname", "FH#VyG$t4eq4354ng64563ghjjd");
INSERT INTO users (first_Name, uid) VALUES ("Tom", "G452DSFDGghfdfae45bv");
INSERT INTO users (first_Name, last_Name, uid) VALUES ("Jamie", "Lepua", "45DSFBXfdgfzdwrWdd324");
INSERT INTO users (first_Name, last_Name, uid) VALUES ("Mulan", "Hua", "DFGfdg435SFDWERfsdf4");

INSERT INTO user_relationships (from_User, target_User) VALUES ("XrIWklpLSLhP4Cbi4667xO5PkvW2", "G452DSFDGghfdfae45bv");
INSERT INTO user_relationships (from_User, target_User) VALUES ("XrIWklpLSLhP4Cbi4667xO5PkvW2", "G452DSFDGghfdfae45bv");
INSERT INTO user_relationships (from_User, target_User) VALUES ("XrIWklpLSLhP4Cbi4667xO5PkvW2", "G452DSFDGghfdfae45bv");
INSERT INTO user_relationships (from_User, target_User) VALUES ("XrIWklpLSLhP4Cbi4667xO5PkvW2", "G452DSFDGghfdfae45bv");

INSERT INTO users (firstName, lastName, email, uid) VALUES ("Mark", "Salvatier", "m.erik.salvatier@gmail.com", "XrIWklpLSLhP4Cbi4667xO5PkvW2");*/

INSERT INTO users (firstName, lastName, email, uid) VALUES ("John", "bob", "fakeemail@fake.net", "smYWJqFAeXUywbOKxkyNLzBujpT2");
INSERT INTO statuses (meaning) VALUE ("pending");
INSERT INTO statuses (meaning) VALUE ("accepted");
INSERT INTO statuses (meaning) VALUE ("rejected");

INSERT INTO events (date, eventOwner) VALUES (0, "XrIWklpLSLhP4Cbi4667xO5PkvW2");
INSERT INTO events (date, eventOwner) VALUES (0,"XrIWklpLSLhP4Cbi4667xO5PkvW2");
INSERT INTO events (date, eventOwner) VALUES ('9999-12-31',"XrIWklpLSLhP4Cbi4667xO5PkvW2");

INSERT INTO userrelationships (fromUser, targetUser, meaning) VALUES ("XrIWklpLSLhP4Cbi4667xO5PkvW2", "smYWJqFAeXUywbOKxkyNLzBujpT2", "pending");