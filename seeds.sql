INSERT INTO departments (departments_name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, departments_id)
VALUES ("Salesperson", "20000", "1"),
("Sales Lead", "40000", "1"),
("Software Engineer", "60000", "2"),
("Lead Engineer", "80000", "2"),
("Accountant", "80000", "3"),
("Lawyer", "100000", "4"),
("Legal Team Lead", "120000", "4");


INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Layne", "Nigro", "7", "null"),
("Kaladin", "Stormblessed", "4", "null"),
("Shallan", "Davar", "6", "1"),
("Dalinar", "Kholin", "6", "1"),
("Jasnah", "Kholin", "5", "3"),
("Adolin", "Kholin", "5", "3"),
("Renarin", "Kholin", "3", "2"),
("Meridas", "Amaram", "1", "4"),
("Chiri", "Chiri", "1", "4"),
("Szeth", "son-son-Vallano", "2", "null"),
("Torol", "Sadeas", "3", "2");