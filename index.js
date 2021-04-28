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
            case "View Departments": viewDepartments();
            break;
            case "View Employees": viewEmployees();
            break;
            case "Add Role": addRole();
            break;
            case "Add Department": addDepartment();
            break;
            case "Add Employee": addEmpolyee();
            break;
            case "Delete Employee": deleteEmployee();
            break;
            case "Exit": finish();
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

// Closes the program & connection to the db
const finish = () => {
    console.log('Thank you for using the Employee Tracker System.');
    process.exit();
}

// begins the initial program.
employee();