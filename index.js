const { connect } = require('http2');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    //switch back to hidden password
    password: 'BeAr030317',
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
    const sql =`SELECT department_id,title, salary, department FROM roles`;
    
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
    choices: departments.name
  
   },])
   .then((answer) => {
    let sql =`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    db.query(sql, answer.newTitle,answer.newSalary, answer.newRoleDepartment, (error, response) => {
      if (error) throw error;
      viewAllRoles ();
              });
    });
}