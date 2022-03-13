// Import Dependencies
const express = require("express");
const cors = require("cors");
const controllers = require('./controllers')
// Import Models
const db = require('./models');
 // Create our app object
const app = express();
// Set up middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// User Controller 
app.use('/users',controllers.User)
// Home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
});
// declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

