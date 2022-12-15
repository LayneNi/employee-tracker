const inquirer = require('inquirer');

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
            // const currentSelection = new currentSelection(selection);
            // myTeamArray.push(currentSelection);
            // createEmployee(response.employee)
        })
}

function currentSelection(selection) {
    if (selection === 'View All Employees') {
        console.log("Success! All Employees");
        options()
    }
    if (selection === 'Add Employees') {
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
                    type: 'input',
                    message: "What is the employees role?",
                    name: 'role',
                }, 
                {
                    type: 'input',
                    message: "Who is the employee's manager?",
                    name: 'manager',
                },
            ]).then((newEmployee) => {
                const { first, last, role, manager } = newEmployee
                console.log(newEmployee);
                options()
            });
    }
    if (selection === 'Update Employee Role') {
        inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee's role do you want to update?",
                list:[],
                name: 'employee',
            },
            {
                type: 'list',
                message: "Which role do you want to assign the selected employee?",
                list:[],
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
        options()
    }
    if (selection === 'Add Role') {
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
                type: 'input',
                message: "Which department does the role belong to?",
                name: 'department',
            }, 
        ]).then((newRole) => {
            const { role, salary, department } = newRole
            console.log(newRole);
            options()
        });
    }
    if (selection === 'View All Departments') {
        console.log("Success! All Departments");
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