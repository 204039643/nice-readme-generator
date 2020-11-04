//NPM modules required
const inquirer = require('inquirer')
const fs = require('fs')
const util = require('util')

//Const for writing file asynchronously using promisify (common error-first callback style)
const writeFileAsync = util.promisify(fs.writeFile)

//using inquirer module, gather inputs from user
const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the project title?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please provide a short description >'
    },
    {
      type: 'input',
      name: 'install',
      message: 'Please provide installation instructions for app >'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please provide usage instructions >'
    },
    {
      type: 'list',
      choices: ['MIT', 'Mozilla Public License', 'GPL', 'Apache License'],
      name: 'license',
      message: 'Please select a license type.'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'contributions',
      message: 'Contributions to your project >'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Include any required tests >'
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your GitHub username?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?'
    }
  ])

//define output format (template) for readme generator
const generateReadme = answers =>
  `# ${answers.title}

    https://img.shields.io/badge/license-${answers.license}-brightgreen

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
    
    ${answers.license}
    
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
    
    ## Questions?
    Please reach out to me at either of the following:
    GitHub username: ${answers.github}
    Email: mailto:${answers.email}
    
    
    ---This README was generated using nice-readme-generator :-) ---`

//function call using both inquirer and fs modules to create a new file, using parameterized generateReadme template

promptUser()
  .then(answers => writeFileAsync('README-sample.md', generateReadme(answers)))
  .then(() => console.log('Successfully wrote to README-sample.md'))
  .catch(err => console.error(err))
