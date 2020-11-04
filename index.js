const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the project title?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please provide a short description >',
    },
    {
      type: 'input',
      name: 'install',
      message: 'Please provide installation instructions for app >',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please provide usage instructions >',
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'input',
      name: 'contributions',
      message: 'Contributions to your project >',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Include any required tests >',
      },
      {
        type: 'input',
        name: 'questions',
        message: 'Any questions to include?',
      },
  ]);

const generateReadme = (answers) => 
    `# ${answers.title}

    ${answers.description}
    
    - [Installation](#installation)
    - [Usage](#usage)
    - [License](#license)
    - [Contributions](#contributions)
    - [Tests](#test)
    - [Questions](#questions)
    
    ## Installation
    
    ${answers.install}
    
    ## Usage
    
    ${answers.usage}
    
    ## License
    
    MIT License
    
    Copyright (c) [2020] ${answers.name}
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    
    ## Contributions
    
    ${answers.contributions}
    
    ## Tests
    
    ${answers.tests}
    
    ## Questions
    
    ${answers.questions}`;

promptUser()
  .then((answers) => writeFileAsync('README1.md', generateReadme(answers)))
  .then(() => console.log('Successfully wrote to README1.md'))
  .catch((err) => console.error(err));