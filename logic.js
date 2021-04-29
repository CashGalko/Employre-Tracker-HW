const connection = require('./config/connection');

const fetchRole = (res) => {
    connection.query(`SELECT * FROM role`, (err, result) => {
        if (err) throw err;
        res(result);
    });
};

const fetchDepart = (res) => {
    connection.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;
        res(result);
    });
};

const fetchEmploy = (res) => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`, (err, result) => {
        if (err) throw err;
        res(result);
    });
};

const addRole = (data, res) => {
    connection.query(`Insert Into role (title, salary, department_id) values ("${data.title}", "${data.salary}", "${data.department_id}")`, (err, result) => {
        if (err) throw err;
        res(result);
    });
};

module.exports = {
    fetchRole, fetchDepart, fetchEmploy, addRole
};