# ReactDemoApp
React Demo App with an Express API Backend. The frontend is made using create-react-app, and the backend is done with express.js.

This application allows you to compare pictures of apples, with a server keeping track of the number of 'wins' an apple has when compared to its contemporaries.
Clicking on a picture of an apple selects it, and pressing the submit button sends a 'PUT' to the server, updating the number of 'wins' that apple has.
To see which apples have the most wins, press the update leaderboard button.

The express.js server provides an example REST api, with two gets and a put. All modification of data is done on the server, with the frontend acting as a view/controller.

# Prerequisites
nodejs and npm.

# Deployment
1. Clone this repo
2. Run 'npm install' and 'npm start' from 'ReactDemoApp/' Directory to start the server.
3. Run 'npm install' and 'npm start' from 'frontend/' to start the react application. It should automatically open in a browser window, if not go to http://localhost:3000/

To run server/API tests, run 'npm test' from 'ReactDemoApp/'.
Tests are run from 'ReactDemoApp/test/apitest.js' using the mocha, chai, and supertest frameworks.

To run frontend tests, run 'npm test' from 'frontend/', only do so if the server has been started.
Tests are run from 'frontend/App.test.js'.

# Hosting
This site is hosted on Heroku at: https://react-demo-app-apples.herokuapp.com/
