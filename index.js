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
        db.query('SELECT * FROM employees RIGHT JOIN roles ON employees.roles_id = roles.id RIGHT JOIN departments ON roles.departments_id = departments.id;',function (err, results) {
            console.log("");
            console.table(results);
        })
        options()
    }
    if (selection === 'Add Employees') {
        db.query('SELECT * FROM roles', (err, results) => {
            if (err) {
                console.log(err);
            }
            // console.log(results);
            db.query('SELECT * FROM employees WHERE manager_id=000', (err, results2) => {
                if (err) {
                    console.log(err);
                }
                // console.log(results2);
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
                            choices: function () {
                                let roleChoiceArr = []
                                for (let i = 0; i < results.length; i++) {
                                    roleChoiceArr.push({
                                        name: results[i].title,
                                        value: results[i].id,
                                    })
                                }
                                return roleChoiceArr;
                            }
                        },
                        {
                            type: 'list',
                            message: "Who is the employee's manager?",
                            name: 'manager',
                            choices: function () {
                                let managerChoiceArr = []
                                for (let i = 0; i < results2.length; i++) {
                                    managerChoiceArr.push({
                                        name: results2[i].first_name,
                                        value: results2[i].manager_id,
                                    })
                                }
                                return managerChoiceArr;
                            }
                        },
                    ]).then((newEmployee) => {
                        const { first, last, role, manager } = newEmployee
                        console.log(newEmployee);
                        //     db.query('INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)'), [newEmployee.first, newEmployee.last, newEmployee.role, newEmployee.manager], function (err, results){
                        //     err ? console.log(err) : console.log(results);
                        // }
                        options()
                    })

            })

        })
    }

    if (selection === 'Update Employee Role') {
        db.query('SELECT * FROM employees', (err, results) => {
            if (err) {
                console.log(err);
            }
            // console.log(results);

            db.query('SELECT * FROM roles', (err, results2) => {
                if (err) {
                    console.log(err);
                }
                // console.log(results2);

                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: "Which employee's role do you want to update?",
                            name: 'employee',
                            choices: function () {
                                let employeeChoiceArr = []
                                for (let i = 0; i < results.length; i++) {
                                    employeeChoiceArr.push({
                                        name: results[i].first_name,
                                        value: results[i].roles_id,
                                    })
                                }
                                return employeeChoiceArr;
                            }
                        },
                        {
                            type: 'list',
                            message: "Which role do you want to assign the selected employee?",
                            name: 'role',
                            choices: function () {
                                let roleChoiceArr = []
                                for (let i = 0; i < results2.length; i++) {
                                    roleChoiceArr.push({
                                        name: results2[i].title,
                                        value: results2[i].id,
                                    })
                                }
                                return roleChoiceArr;
                            }
                        },
                    ]).then((updatedRole) => {
                        const { employee, role } = updatedRole
                        console.log(updatedRole);
                        //                 db.query('SET employees (roles_id) VALUES (?) WHERE id=updatedRole.id'), [ updatedRole.role], function (err, results){
                        //     err ? console.log(err) : console.log(results);
                        // }
                        options()
                    })

            })
        })
    }
    if (selection === 'View All Roles') {
        console.log("Success! All roles");
        db.query('SELECT * FROM roles RIGHT JOIN departments ON roles.departments_id = departments.id', function (err, results) {
            console.log("");
            console.table(results);
        })
        options()
    }
    if (selection === 'Add Role') {
        db.query('SELECT * FROM departments', (err, results5) => {
            if (err) {
                console.log(err);
            }
            console.log(results5);
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
                        choices: function () {
                            let departmentChoiceArr = []
                            for (let i = 0; i < results5.length; i++) {
                                departmentChoiceArr.push({
                                    name: results5[i].departments_name,
                                    value: results5[i].id,
                                })
                            } return departmentChoiceArr;
                        }

                    },
                ]).then((newRole) => {
                    const { role, salary, department } = newRole
                    console.log(newRole);
                    options()
                })
        });
    }
    if (selection === 'View All Departments') {
        console.log("Success! All Departments");
        db.query('SELECT * FROM departments', function (err, results) {
            console.log("");
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