// boilerplate code for server
const { response } = require('express');
const express = require('express');
const mysql = require('mysql2');
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// dont need routes!!!


// get routes
  // view all departments 
  function viewAllDepartments {
app.get('/api/departments', (req,res)=> {
    const sql =`SELECT id, name FROM departments`;
    
    db.query(sql, (err,rows)=> {
        if (err) {
            res.status(500).json ({error:err.message});
            return;
        }
        res.json({
            message:"success!",
            data:rows
        })
    })
})
}

//view all roles
function viewAllRoles {}
app.get('/api/roles', (req,res)=> {
    const sql =`SELECT department_id,title, salary, department FROM roles`;
    
    db.query(sql, (err,rows)=> {
        if (err) {
            res.status(500).json ({error:err.message});
            return;
        }
        res.json({
            message:"success!",
            data:rows
        })
    })
})

//view all employees
function viewAllEmployees{}
app.get('/api/employees', (req,res)=> {
    //needs join here 
    const sql =`SELECT department_id,title, salary, department FROM roles`;
    
    db.query(sql, (err,rows)=> {
        if (err) {
            res.status(500).json ({error:err.message});
            return;
        }
        res.json({
            message:"success!",
            data:rows
        })
    })
})

// post routes
    // add department
    function addDepartment{}
    app.post('/api/new-department', ({body}, res)=> {
        const sql = `INSERT INTO departments(name) VALUES (?)`
        const params=[body.name];
    
        db.query(sql,params, (err,result) => {
            if (err) {
                res.status(400).json ({error:err.message});
                return;
            }
            res.json({
                message:"success!",
                data:body
            })
        })
    })

    // add role
        // add role
        function addRole{}

        inquirer.prompt([
            {
              type: 'input',
              name: 'roleName',
              message: "What is the new role?",
              validate: addRoleName => {
                if (addRoleName) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
              }
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: "What is the salary for the new role? No commas or decimals.",
                validate: addRoleSalary => {
                  if (addRoleSalary) {
                      return true;
                  } else {
                      console.log('Please enter a valid number');
                      return false;
                  }
                }
              },
        ])
    app.post('/api/new-role', ({body}, res)=> {
        const sql=`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const params=[body.movie_name];
    
        db.query(sql,params, (err,result) => {
            if (err) {
                res.status(400).json ({error:err.message});
                return;
            }
            res.json({
                message:"success!",
                data:body
            })
        })
    })

    // add employee
        // add employee
        function addEmployee{}

        inquirer.prompt([
            {
              type: 'input',
              name: 'fistName',
              message: "What is the employee's first name?",
              validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                    return false;
                }
              }
            },
            {
              type: 'input',
              name: 'lastName',
              message: "What is the employee's last name?",
              validate: addLastName => {
                if (addLastName) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                    return false;
                }
              }
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: [
                    {value: "Sales"},
                    {value: "Engineering"},
                    {value: "Finance"},
                    {value: "Legal"},
                ]
                validate: addRole => {
                  if (addRole) {
                      return true;
                  } else {
                      console.log('Please enter a last name');
                      return false;
                  }
                }
              },
              {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: [
                    {value: "null"},
                    {value: ""},
                    {value: "Finance"},
                    {value: "Legal"},
                ]
                validate: addManager => {
                  if (addManager) {
                      return true;
                  } else {
                      console.log('Please enter a last name');
                      return false;
                  }
                }
              }
          ])

    app.post('/api/new-employee', ({body}, res)=> {
        const sql=`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params=[body.first_name, body.last_name, body.role_id, body.manager_id];
    
        db.query(sql,params, (err,result) => {
            if (err) {
                res.status(400).json ({error:err.message});
                return;
            }
            res.json({
                message:"success!",
                data:body
            })
        })
    })

    // put route
    // update employee role
    function updateEmployeeRole{}
    app.put('/api/employees/role/:id', (req, res)=> {
        // is this right?
        const sql = `UPDATE employees SET role_id = ?`;
        const params = [req.body.role_id];

        db.query (sql, params, (err, result)=> {
            if (err) {
                res.status(400).json ({error:err.message});
            }else if (!result.affectedRows) {
                res.json ({
                    message: "employee not found"
                })
            } else {
            res.json({
                message:"success!",
                data:req.body,
                changes: result.affectedRows
            })
        }
    })
})



//
app.use((req, res) => {
    res.status(404).end();
  });

  //spinning up server on port 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }); 