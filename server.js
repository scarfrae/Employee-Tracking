
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { title } = require('process');


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
      else if(response.Option == 'Add an employee'){
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
  console.table(results);
  OptionMenu();
});
}

const ViewRole = () => {
  // Query database
db.query('SELECT * FROM role', function (err, results) {
  console.table(results);
  OptionMenu();
});
}

const ViewEmployees = () => {
db.query('SELECT * FROM employee', function (err, results) {
  console.table(results);
  OptionMenu();
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
      OptionMenu();
    });
  })

}

const AddRole = () => { //is this correct?
  db.query('SELECT * FROM department', function (err, results) {
    console.log("\n")
    console.table(results);
  });
  inquirer    
  .prompt([
      {
        // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        type: "input",
        // message: "Which team member do you want to add?",
        name: "AddTitle",
        message: "Please enter the title you want to add",
          
          
      },
      {
          // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
          type: "input",
          // message: "Which team member do you want to add?",
          name: "AddSalary",
          message: "Please enter the salary you want to add",
            
      },
      {
        // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        type: "input",
        // message: "Which team member do you want to add?",
        name: "AddDepartmentId",
        message: "Please enter the Department Id you want to add",

    }

  ])
  
  .then((response) => {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.AddTitle, response.AddSalary, response.AddDepartmentId], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      OptionMenu();
    });

  })
}



const AddEmployee = () => { //is this correct?
  // const roles = await db.query('SELECT * FROM role', function(err, results){
  //   if(err) {
  //     console.log(err);
  //   }
  //   else{
  //     const formattedRes = results.map((el) => {
  //       return {
  //         name: el.title,
  //         value: el.id
  //       }
  //     });
  //     return formattedRes;
  //   }
  // });
  // console.log(roles);
  db.query('SELECT * FROM role' , function(err, results){
    if(err) {
      console.log(err);
    }
    else{
      console.table(results)
    }
  })

  inquirer    
  .prompt([
      {
          // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
          type: "input",
          // message: "Which employee do you want to add?",
          name: "AddFirst_name",
          message: "Enter the first name you want to add:",
      },
      {
         // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
         type: "input",
         // message: "Which employee member do you want to add?",
         name: "AddLast_name",
         message: "Enter the last name you want to add:",
      },
      {
        //provide list of avaliable role ids
        // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        type: "input",
        // message: "Which employee member do you want to add?",
        name: "AddRoleId",
        message: "Enter the role Id you want to add(Refer to the table above):",
     },
     {
      //provide list of avaliable role ids
      // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
      type: "input",
      // message: "Which employee member do you want to add?",
      name: "AddManager",
      message: "Enter the manager id you want to add:",
   }

     //Need to figure out how to add a Role Id...

  ])
  .then((response) => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.AddFirst_name, response.AddLast_name, response.AddRoleId, response.AddManager], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      OptionMenu();
    });
  })
}

const UpdateEmployee = () => {
  db.query('SELECT * FROM employee', function (err, results) {
    console.log("\n")
    console.table(results);
  });
  db.query('SELECT * FROM role', function (err, results) {
    console.log("\n")
    console.table(results);
  });
  inquirer    
  .prompt([
      {
        //provide list of avaliable role ids
        // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        type: "input",
        // message: "Which employee member do you want to add?",
        name: "SelectEmployee",
        message: "Enter the employee id you want to update(Refer to the table above):" + "\n",
      },
      {
        //provide list of avaliable role ids
        // WHEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        type: "input",
        // message: "Which employee member do you want to add?",
        name: "UpdateRoleId",
        message: "Enter the role you want to update to(Refer to the table above):",
     }
     
     //Need to figure out how to add a Role Id...

  ])
  .then((response) => {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.UpdateRoleId, response.SelectEmployee], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      OptionMenu();
    });
  })
}










