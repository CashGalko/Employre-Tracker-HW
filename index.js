const logic = require('./logic');
const inquirer = require("inquirer");


// The starting inquirer prompt that calls all needed functions to run. 
const employee = () => {
    inquirer
    .prompt(
        {
            type: 'list',
            message: 'Welcome to the Employee Tracker System. Please select an option.',
            name: 'options',
            choices: ['View Roles', 'View Departments','View Employees', 'Add Role', 'Add Department', 'Add Employee', 'Delete Employee', 'Exit'],
        },
    )
    .then (response => {
        // Calls the correct function based on the user's input from the initial menu. 
        switch (response.options) {
            
            case "View Roles": viewRoles();
            break;
            case "View Departments": viewDepart();
            break;
            case "View Employees": viewEmploy();
            break;
            case "Add Department": addDepartment();
            break;
            case "Add Role": addRole();
            break;
            case "Add Employee": addEmpolyee();
            break;
            case "Delete Employee": deleteEmployee();
            break;
            case "Exit": exit();
            break;
        }
    });
};

const viewRoles = () => {
    logic.fetchRole (res => {
        if (!res.length) {
            console.log('No roles currently stored in the database.');
        } else {
            console.table(res);
        }
        employee();
    });
}

const viewDepart = () => {
    logic.fetchDepart (res => {
        if (!res.length) {
            console.log('No departments currently stored in the database.');
        } else {
            console.table(res);
        }
        employee();
    });
}

const viewEmploy = () => {
    logic.fetchEmploy (res => {
        if (!res.length) {
            console.log('No employees currently stored in the database.');
        } else {
            console.table(res);
        }
        employee();
    });
}

const addRole = () => {
    logic.fetchDepart(res => {
        if (!res.length) {
            console.log("A department is needed before a role can be created. Please try again.")
            return employee()
        }
        inquirer
        .prompt (
            [{
                message: "Please enter the title of the new role.",
                name: "title"
            },
            {
                message: "Please enter a salary for the new role.",
                name: "salary"
            }, {
                message: "Which department is this role to be stored under?",
                name: "department",
                type: "list",
                choices: res.map(depart => depart.id + ": " + depart.name)
            }
        ])
        .then (response => {
            
            response.department_id = response.department.slice(0, response.department.indexOf(":"));
            logic.addRole(response, () => {
                viewRoles ();
            });
        });
    });

// Closes the program & connection to the db
const exit = () => {
    console.log('Thank you for using the Employee Tracker System.');
    process.exit();
}

// begins the initial program.
employee();