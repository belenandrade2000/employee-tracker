INSERT INTO departments (name)
    VALUES  ("Sales"),
            ("Engineering"),
            ("Finance"),
            ("Legal");
            

INSERT INTO roles (title, salary, department_id)
    VALUES  ("Sales Lead", 65000, 1),
            ("Salesperson", 70000, 1),
            ("Lead Engineer", 100000, 2),
            ("Software Engineer", 120000,2),
            ("Account Manager", 72000, 3),
            ("Accountant", 75000, 3),
            ("Legal Team Lead", 90000, 4).
            ("Lawyer", 180000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES  ("John", "Smith", 3, NULL)
            ("Mary", "Johnson",7, NULL)
            ("David", "Brown", 5,1)
            ("Sarah", "Davis", 1, NULL)
            ("Michael", "Wilson", 2,2)
            ("Laura", "Anderson", 4, NULL)
            ("James", "Taylor", 8,1)
            ("Elizabeth", "Jackson", 6, NULL)
            ("Peter", "Martin", 2, 3)