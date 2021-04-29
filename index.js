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
            case "Add Department": addDepart();
            break;
            case "Add Role": addRole();
            break;
            case "Add Employee": addEmpoly();
            break;
            case "Delete Employee": deleteEmploy();
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
                type: 'input',
                message: "Please enter the title of the new role.",
                name: "title"
            },
            {
                type: 'input',
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
}

const addDepart = () => {
    inquirer
        .prompt({
            type: 'input',
            message: "Name of the New Department?",
            name: "newDepart"
    })
    .then (response => {
        logic.addDepart(response, () => {
            viewDepart();
        });
    });
};

const addEmpoly = () => {
    logic.fetchRole(role => {
        if (!role.length) {
            console.log("Please create a role first");
            return employee();
        }
        logic.fetchEmploy(employee => {
            inquirer
            .prompt([{
                type: 'input',
                message: "Please enter the employee's first name.",
                name: "firstName"
            },
            {
                type: 'input',
                message: "Please enter the employee's last name",
                name: "lastName"
            },
            {
                message: "Choose the manager who is supervising this employee.",
                name: "manager",
                type: "list",
                choices: employee.map(e => e.id + ": " + e.first_name + " " + e.last_name).concat(["null"])
            },
            {
                message: "Which role is this employee entering in?",
                name: "role",
                type: "list",
                choices: role.map(r => r.id + ": " + r.title)
            }
            ])
            .then (response => {
                response.role_id = response.role.slice(0, response.role.indexOf(":"));
                if (response.manager === "null") {
                    response.manager_id = 0
                }
                else {
                    response.manager_id = response.manager.slice(0, response.manager.indexOf(":"))
                }
                logic.addEmpoly (response, () => {
                    viewEmploy();
                });
            });
        });
    });
};

const deleteEmploy = () => {
    logic.fetchEmploy(employee => {
        inquirer
        .prompt({
            message: "Which employe has left the company?",
            name: "employeeName",
            type: "list",
            choices: employee.map(e => e.id + ": " + e.first_name + " " + e.last_name)
        })
        .then (response => {
            id = response.employeeName.slice(0, response.employeeName.indexOf(":"));
            logic.deleteEmploy(id, () => {
                viewEmploy();

            });
        });
    });   
};

// Closes the program & connection to the db
const exit = () => {
    console.log('Thank you for using the Employee Tracker System.');
    process.exit();
}

// begins the initial program.
employee();