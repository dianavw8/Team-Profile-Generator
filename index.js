const inquirer = require('inquirer');
const fs = require('fs');
const { choices } = require('yargs');
const Manager = require('./lib/Manager');
const team = []; // Array to store team members


inquirer.prompt([
    {
      type: 'input',
      name: 'teamManagersName',
      message: 'Enter the Team Manager\'s name:'
    },
    {
      type: 'input',
      name: 'teamManagersId',
      message: 'Enter the Team Manager\'s ID:'
    },
    {
      type: 'input',
      name: 'teamManagersEmail',
      message: 'Enter the Team Manager\'s email:'
    },
    {
      type: 'input',
      name: 'teamManagersOfficeNumber',
      message: 'Enter the Team Manager\'s office number:'
    }
    
  ]).then(answers => {
    // Use the answers object to create an manager object
    let manager = new Manager(answers.teamManagersName, answers.teamManagersId, answers.teamManagersEmail, answers.teamManagersOfficeNumber);
    console.log(manager);
   // Add the manager to the team array
  team.push(manager); 
  }

 // Function to prompt to add an engineer or intern to the team.
function addTeamMember() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Would you like to add an engineer, an intern or finish building my team?',
      choices: ['Engineer', 'Intern', 'Finish building my team']
    }   
  ]).then(answers => {
    if (answers.role === 'Engineer') {
      // Prompt for engineer information
      inquirer.prompt([
        {
          type: 'input',
          name: 'engName',
          message: 'Enter the engineer\'s name:'
        },
        {
          type: 'input',
          name: 'engId',
          message: 'Enter the engineer\'s employee ID:'
        },
        {
          type: 'input',
          name: 'engEmail',
          message: 'Enter the engineer\'s email address:'
        },
        {
          type: 'input',
          name: 'engGithub',
          message: 'Enter the engineer\'s GitHub username:'
        }
      ]).then(answers => {
        // Add the engineer to the team array
        team.push({
          name: answers.engName,
          id: answers.engId,
          email: answers.engEmail,
          github: answers.engGithub,
          role: 'Engineer'
        });
        // Prompt to add another team member
        addTeamMember();
      });
    } else if (answers.role === 'Intern') {
      // Prompt for intern information
      inquirer.prompt([
        {
          type: 'input',
          name: 'intName',
          message: 'Enter the intern\'s name:'
        },
        {
          type: 'input',
          name: 'intId',
          message: 'Enter the intern\'s employee ID:'
        },
        {
          type: 'input',
          name: 'intEmail',
          message: 'Enter the intern\'s email address:'
        },
        {
          type: 'input',
          name: 'intSchool',
          message: 'Enter the intern\'s school:'
        }
      ]).then(answers => {
        // Add the intern to the team array
        team.push({
          name: answers.intName,
          id: answers.intId,
          email: answers.intEmail,
          github: answers.intSchool,
          role: 'Intern'
        });
        // Prompt to add another team member
        addTeamMember();
      });
    } else if (answers.role === 'Finish building my team') {
        //Function to return to main menu and exit application
        process.exit();
    } 
    // Generate the HTML
const html = `<html>
<body>
    <header>
      <h1>My Team</h1>
    </header>
    <section> 
      <style>
        .answers {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
        width: 200px;
        padding: 20px;
        margin: 20px;
        }
      </style>
      ${role.map(answers => `
      <div class="employee">
        <h2>${answers.teamManagersName, answers.engName, answers.intName}</h2>
        <p><strong>Role:</strong> ${answers.role.Engineer, answers.Intern, answers.Manager}</p>
        <p><strong>ID:</strong> ${answers.teamManagersId, answers.engId, answers.intId}</p>
        <p><strong>Email:</strong> ${answers.teamManagersEmail, answers.engEmail, answers.intEmail}</p>
        <p><strong>Office Number:</strong> ${answers.teamManagersOfficeNumber}</p>
        <p><strong>Github:</strong> ${answers.engGithub}</p>
        <p><strong>School:</strong> ${answers.intSchool}</p>
      </div>
    `).join('')}  
    </section>
</body>
</html>`;

// Write the HTML to a file
fs.writeFileSync('team.html', html);

// Open file in web browser
const open = require('open');
open('team.html');  
  

    }  