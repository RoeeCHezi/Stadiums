const usersLogic = require("../logic/users-logic");
const express = require("express");

const router = express.Router();

// const { request, response } = require("express");

router.post("/", async (request, response, next) => {

    let userRegistrationData = request.body;

    try {
        await usersLogic.addUser(userRegistrationData);
        response.json();
    }
    catch (e) {
        console.error(e + "J");
        response.status(600).send(e.message);
        return next(e);
    }
});

router.post("/login", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
    let userLoginData = request.body;

    try {
        let successfulLoginResponse = await usersLogic.login(userLoginData);
        response.json(successfulLoginResponse);
    }
    catch (e) {
        console.error(e + "K");
        response.status(600).send(e.message);
        return next(e);
    }
});

module.exports = router;
