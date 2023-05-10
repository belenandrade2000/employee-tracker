require('dotenv').config();
const { connect } = require('http2');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    //switch back to hidden password
    password: process.env.MYSQL_PASSWORD,
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

// prompt question 
inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        {value: "View All Employees" },
        {value: "Add Employee"},
        {value: "Update Employee Role"},
        {value: "View All Roles"},
        {value: "Add Role"},
        {value: "View All Departments"},
        {value: "Add Department"},
      ]
    }
])
.then(choices=>{
// call functions if certain choice is picked
if (choices.options === "View All Employees") {
    viewAllEmployees();
}

if (choices.options === "Add Employee") {
  addEmployee();
}

if (choices.options === "Update Employee Role") {
    updateEmployeeRole();
}

if (choices.options === "View All Roles") {
    viewAllRoles();
}

if (choices.options === "Add Role") {
    addRole();
}

if (choices.options === "View All Departments") {
    viewAllDepartments();
}

if (choices.options === 'Add Department') {
    addDepartment();
}

})

function viewAllEmployees() {

    //fix join

    //including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    const sql = `
    SELECT employees.id, employees.first_name, employees.last_name,
      roles.title, departments.name AS department, roles.salary,
      CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
  `;
    db.query(sql, (err,rows)=> {
        if (err) {
            console.log(err)
            return;
        }
        console.table(rows)
        })}

function viewAllDepartments () {
  const sql = `SELECT name FROM departments`;
  db.query(sql, (err,rows)=> {
    if (err) {
        console.log(err)
        return;
    }
    console.table(rows)
    })}

function viewAllRoles () {
  const sql = `SELECT department_id,title, salary  FROM roles`;
  db.query(sql, (err,rows)=> {
    if (err) {
        console.log(err)
        return;
    }
    console.table(rows)
    })}

function addDepartment () {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the new department?',
    }
  ])
  .then((answer) => {
      let sql =`INSERT INTO departments (name) VALUES (?)`;
      db.query(sql, answer.newDepartment, (error, response) => {
        if (error) throw error;
        viewAllDepartments ();
                });
      });
};

function addRole() {
  let departmentsName;
  db.query( `SELECT id, name FROM departments`, (err, rows)=> {
    departmentsName=rows
  const choices = departmentsName.map(({id,name})=> ({
    name:name, value:id
  }))
  console.log (departmentsName)
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'newTitle',
      message: 'What is the name of the new role?',
    },
    {
    type: 'input',
    name: 'newSalary',
    message: 'What is the salary of the new role?',
   },
   {
    type: 'list',
    name: 'newRoleDepartment',
    message: 'What department is the new role in?',
    choices: choices,
  
   },])
   .then((answer) => {
    let sql =`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    db.query(sql, [answer.newTitle,answer.newSalary, answer.newRoleDepartment], (error, response) => {
      if (error) throw error;
      viewAllRoles ();
              });
    });
  });
}


//add employee

function addEmployee() {
  let roleNames;
  db.query( `SELECT id, title FROM roles`, (err, rows)=> {
    roleNames=rows
  const roleChoices = roleNames.map(({id,title})=> ({
    name:title, value:id
  }))

  let managerNames;
  db.query( `SELECT manager_id FROM employees`, (err, rows)=> {
    managerNames=rows
  const managerChoices = managerNames.map(({manager_id})=> ({
    value:manager_id
  }))
  
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'newFirstName',
      message: 'What is the first name of the new employee',
    },
    {
    type: 'input',
    name: 'newLastName',
    message: 'What is the last name of the new employee?',
   },
   {
    type: 'list',
    name: 'newEmployeeRole',
    message: 'What role will the new employee have?',
    choices: roleChoices,
  
   },
   {
    type: 'list',
    name: 'newEmployeeManager',
    message: 'Who will be the new manager of the new employee',
    choices: managerChoices,
  
   },])
   .then((answer) => {
    let sql =`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    db.query(sql, [answer.newFirstName,answer.newLastName, answer.newEmployeeRole, answer.newEmployeeManager], (error, response) => {
      if (error) throw error;
      viewAllEmployees ();
              });
    });
  });
})}

//update employee role
function updateEmployeeRole () {

let employeeNames;
db.query( 'SELECT CONCAT(first_name, " ", last_name) AS name FROM employees', (err, rows)=> {
  employeeNames=rows
const employeeChoices = employeeNames.map(({name})=> ({
  name:name
}))

let roleNames;
db.query( `SELECT id, title FROM roles`, (err, rows)=> {
  roleNames=rows
const roleChoices = roleNames.map(({id,title})=> ({
  name:title, value:id
}))

inquirer
  .prompt([
    {
      type: 'list',
      name: 'updateName',
      message: 'What employee did you want to update?',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'updateRole',
      message: 'What is the employee\'s new role?',
      choices: roleChoices,
},])
.then((answer) => {
  let sql =`UPDATE employees SET employees.role_id = ? WHERE employees.id = ?`;
  db.query(sql, [answer.updateName,answer.updateRole], (error, response) => {
    if (error) throw error;
    viewAllEmployees ();
            });
  });
});

})}