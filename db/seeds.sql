INSERT INTO department (department_name)
VALUES ("firm"), ("accounting"), ("hospital");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 150000, 1),
("Manager", 100000, 2),
("Engineer", 150000, 1),
("Doctor", 240000, 3);

-- //insert employee seed to choose another employee as manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Sterling", "efsf", 2, NULL);



       
