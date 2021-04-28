DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;


USE employee_manager_db;

CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR (40),
   primary key (id)
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR (40),
   salary DECIMAL (8,2),
   department_id INT,
   foreign key (department_id) references department(id),
   primary key (id)
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR (40),
   last_name VARCHAR (40),
   role_id INT,
   foreign key (role_id) references role(id),
   manager_id INT default 0,
   primary key (id)
);