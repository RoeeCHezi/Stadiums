const express = require('express');
const cors = require('cors');
const server = express();

const stadiumsController = require('./controllers/stadiums-controller');
const usersController = require('./controllers/users-controller');
const likesController = require('./controllers/likes-controller');


// The following lines register middleware functions (server.user())

server.use(cors({origin: "http://localhost:3000"}));

// Extract the JSON from the body and create request.body object containing it:
server.use(express.json());

const loginFilters = require("./middleware/loginFilters");

server.use(loginFilters());

// Every http request which starts with /stadiums will be dealt inside "stadiumsController"
server.use("/stadiums", stadiumsController);
server.use("/users", usersController);
server.use("/likes", likesController);


// The following line launches the node server, on port 3001
server.listen(3001, () => console.log("Listening on http://localhost:3001"));
