const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Cd84uuuu$',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

const options = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
                name: 'selection',
            },
        ])
        .then((response) => {
            const { selection } = response
            console.log(selection);
            currentSelection(selection)
        })
}

function currentSelection(selection) {
    if (selection === 'View All Employees') {
        console.log("Success! All Employees");
        db.query('SELECT * FROM employees',function (err, results) {
            console.log("");
            console.table(results);
         })
        options()
    }
    if (selection === 'Add Employees') {
    db.query('SELECT * FROM roles',(err, results) =>{
        if (err){
            console.log();
        }
        console.log(results);
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What is the first name of the employee?",
                    name: 'first',
                },
                {
                    type: 'input',
                    message: "What is the last name of the employee?",
                    name: 'last',
                },
                {
                    type: 'list',
                    message: "What is the employees role?",
                    name: 'role',
                    choice: function () {
                        let roleChoiceArr = []
                        for (let i = 0; i < results.length; i++){
                            roleChoiceArr.push({
                                name: results[i].title,
                                value: results[i].id,
                            })
                        }
                    }
                }, 
                {
                    type: 'list',
                    message: "Who is the employee's manager?",
                    name: 'manager',
                    choices:[],
                },
            ]).then((newEmployee) => {
                const { first, last, role, manager } = newEmployee
                console.log(newEmployee);
                options()
            });
        })
    }
    if (selection === 'Update Employee Role') {
        inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee's role do you want to update?",
                choices:[],
                name: 'employee',
            },
            {
                type: 'list',
                message: "Which role do you want to assign the selected employee?",
                choices:[],
                name: 'role',
            },
        ]).then((updatedRole) => {
            const { employee, role } = updatedRole
            console.log(updatedRole);
            options()
        });
    }
    if (selection === 'View All Roles') {
        console.log("Success! All roles");
        db.query('SELECT * FROM roles',function (err, results) {
            console.table(results);
         })
        options()
    }
    if (selection === 'Add Role') {
        // db.query('SELECT * FROM roles',function (err, results) =>{
        inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the role?",
                name: 'role',
            },
            {
                type: 'input',
                message: "What is the salary of the role?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "Which department does the role belong to?",
                name: 'department',
                choice: function () {
                    let roleChoiceArr = []
                    for (let i = 0; i < results.length; i++){
                        roleChoiceArr.push({
                            name: results[i].title,
                            value: results[i].id,
                        })
                    }
                }
                
            }, 
        ]).then((newRole) => {
            const { role, salary, department } = newRole
            console.log(newRole);
            options()
        });
    }
    if (selection === 'View All Departments') {
        console.log("Success! All Departments");
        db.query('SELECT * FROM departments',function (err, results) {
            console.table(results);
         })
        options()
    }
    if (selection === 'Add Department') {
        inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the department?",
                name: 'name',
            },
        ]).then((newDepartment) => {
            const { name } = newDepartment
            console.log(newDepartment);
            options()
        });
    }
    if (selection === 'Quit') {
        console.log("Success! You're all finished!");
    } 
}



options()









    // switch (selection) {
    //     case 'View All Employees':
    //         console.log("Success! All Employees");
    //         options()
    //         break;
    //     case 'Add Employees':
    //         inquirer
    //         .prompt([
    //             {
    //                 type: 'input',
    //                 message: "What is the name of the employee?",
    //                 name: 'employee',
    //             },
    //         ]).then((newEmployee)=> {
    //             const { employee } = newEmployee
    //             console.log(employee);
    //         })
    //         break;
    //         case 'Update Employee Role':
    //             console.log("Success! Add Employees");
    //             break;
    //             case 'View All Roles':
    //                 console.log("Success! Add Employees");
    //                 break;
    //                 case 'Add Role':
    //                     console.log("Success! Add Employees");
    //                     break;
    //                     case 'View All Departments':
    //                     console.log("Success! Add Employees");
    //                     break;
    //                     case 'Add Department':
    //                     console.log("Success! Add Employees");
    //                     break;
    //                     case 'Quit':
    //                         console.log("Success! You're all finished!");
    //                         break;
    //     default:
    //         console.log("something aint right");
    // }