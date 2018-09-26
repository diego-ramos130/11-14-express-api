![CF](http://i.imgur.com/7v5ASc8.png) 13: Single Resource Mongo and Express API
===

## Submission Instructions
* Continue working from your lab 12 code
* Work in a different branch on your fork
* Create a PR to your master from your working branch.
* Ensure that your repository/branch is connected to travis-ci.com
* Submit on canvas:
  * a question and observation
  * how long you spent
  * link to your pull request
  * link to your build at travis-ci URL

## Learning Objectives  
* students will be able to work with the MongoDB database management system
* students will understand the primary concepts of working with a NoSQL database management system
* students will be able to create custom data models *(schemas)* through the use of mongoose.js
* students will be able to use mongoose.js helper methods for interacting with their database persistence layer

## Requirements

#### Feature Tasks
* refactor your resource using  `mongoose.Schema` and `mongoose.model`
* use a mock object instead of multiple HTTP requests in test files
* refactor your tests and routes accordingly
* include a common file `test.env.js` to set up the testing environment

### Tests
* create a test that will ensure that your API returns a status code of 404 for routes that have not been registered
* ensure that you have the following tests for your API:
* create a series of tests to ensure that your `/api/resource-name` endpoint responds as described for each condition below:
 * `GET` - test 200, returns a resource with a valid body
 * `GET` - test 404, respond with 'not found' for valid requests made with an id that was not found
 * `PUT` - test 200, returns a resource with an updated body
 * `PUT` - test 400, responds with 'bad request' if no request body was provided
 * `PUT` - test 404, responds with 'not found' for valid requests made with an id that was not found
 * `POST` - test 400, responds with 'bad request' if no request body was provided
 * `POST` - test 200, returns a resource for requests made with a valid body
 * `DELETE` - test 204, returns 201 for a sucessful removal
 * `DELETE` - test 404, returns 'not found' for any valid requests where the resource wasn't found
