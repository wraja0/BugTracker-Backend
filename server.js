// Import Dependencies
const express = require("express");
const cors = require("cors");
const db = require('./models')
const controllers = require('./controllers')
 // Create our app object
const app = express();
// Set up middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// User Controller 
app.use('/users',controllers.User);
// Bug Controller 
app.use('/bugs',controllers.Bug);
// BugVH Controller 
app.use('/bugVH',controllers.BugVH);
// Test Controller 
app.use('/tests',controllers.Test);
// Comment Controller 
app.use('/comments', controllers.Comment);
// Home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
});
// declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

