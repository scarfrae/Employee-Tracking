
// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password',
    database: 'department_db'
  },
  console.log(`Connected to the department_db database.`)
);

const OptionMenu = () => {
  inquirer    
  .prompt([
      {
          // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
          type: "list",
          // message: "Which team member do you want to add?",
          name: "Option",
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
          // validate: (Function) Receive the user input and answers hash. Should return true if the value is valid, and an error message (String) otherwise. If false is returned, a default error message is provided.
          validate: OptionInput => {
              if(OptionInput){
                  return true;
              }
              else{
                  console.log("Please choose an option!")
                  return false;
              }
          }
      }

  ])
  .then((response) => {
      if(response.Option == 'View all departments'){
          ViewDepartments();
      }
      else if(response.Option == 'View all roles'){
          ViewRole();
      }
      else if(response.Option == 'View all employees'){
          ViewEmployees();
      }
      else if(response.Option == 'Add a department'){
          AddDepartment();
      }
      else if(response.Option == 'Add a role'){
          AddRole();
      }
      else if(response.Option == 'Add a employee'){
          AddEmployee();
      }
      else {
          UpdateEmployee();
      }
  })

}

OptionMenu();

const ViewDepartments = () => {
  // Query database
db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});
}

const ViewRole = () => {
  // Query database
db.query('SELECT * FROM role', function (err, results) {
  console.log(results);
});
}

const ViewEmployees = () => {
db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
});
}

const AddDepartment = () => {
  inquirer    
  .prompt([
      {
          // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
          type: "input",
          // message: "Which team member do you want to add?",
          name: "AddDepartment",
          message: "Enter the department you want to add",
      }

  ])
  .then((response) => {
    db.query(`INSERT INTO department (department_name) VALUES (?)`, response.AddDepartment, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  })

}

const AddRole = () => { //is this correct?
  inquirer    
  .prompt([
      {
          // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
          type: "input",
          // message: "Which team member do you want to add?",
          name: "AddRole",
          message: "Enter the role you want to add",
      }

  ])
  .then((response) => {
    db.query(`INSERT INTO role (title) VALUES (?)`, response.AddRole, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
    db.query(`INSERT INTO role (salary) VALUES (?)`, response.AddRole, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
    db.query(`INSERT INTO role (department_id) VALUES (?)`, response.AddRole, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });

  })

}

const AddEmployee = () => { //is this correct?
  inquirer    
  .prompt([
      {
          // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
          type: "input",
          // message: "Which team member do you want to add?",
          name: "AddEmployee",
          message: "Enter the employee you want to add",
      }

  ])
  .then((response) => {
    db.query(`INSERT INTO employee (first_name) VALUES (?)`, response.AddEmployee, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
    db.query(`INSERT INTO employee (last_name) VALUES (?)`, response.AddEmployee, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
    db.query(`INSERT INTO employee (role_id) VALUES (?)`, response.AddEmployee, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
    db.query(`INSERT INTO employee (manager_id) VALUES (?)`, response.AddEmployee, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });

  })

}










