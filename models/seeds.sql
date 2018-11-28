USE eventorganizerdb;

INSERT INTO statusCodes (meaning) VALUES ("Pending");
INSERT INTO statusCodes (meaning) VALUES ("Accepted");
INSERT INTO statusCodes (meaning) VALUES ("Rejected");

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