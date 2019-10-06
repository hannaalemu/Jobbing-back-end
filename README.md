# Jobbing-back-end
Repository for the back-end aspect of the Jobbing Project


### Author: Hanna Alemu

### Common npm Scripts
 "lint": "eslint \"**/*.js\"",  
   "start": "node index.js",  
   "test": "jest --verbose --coverage",  
   "test-watch": "jest --watchAll --verbose --coverage",  
   "jsdoc": "jsdoc -c ./docs/config/jsdoc.config.json",  

### Documentation - JS DOCS

('http://localhost:8080/docs') or ()



### Links and Resources
* [submission PR](http://xyz.com)
* [travis](http://xyz.com)
* [back-end](http://xyz.com) (when applicable)
* [front-end](http://xyz.com) (when applicable)


### Modules

### Setup

#### `.env` requirements
* `PORT` - Port Number
* `MONGOOOSE_URI` - URL to the running mongo instance/db

#### Running the app
* `npm start`
* Endpoint: `/job`
  * Returns a JSON object with all the jobs that the user has in the database in it. job/id allows the user to Update or delete the job.
* Endpoint: `/signup`
  * Signup for the website.
* Endpoint: `/signin`
    * Signin using username and password, or use postman for Bearer Authentication usin g a token.

  
#### Tests
npm run test

#### UML
