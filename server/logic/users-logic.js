const usersDal = require("../dal/users-dal");
const likesDal = require("../dal/likes-dal");
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const addUser = async (userRegistrationData) => {
    validateUserData(userRegistrationData);
    if (await usersDal.isUserNameExist(userRegistrationData.userName)) {
        throw new Error("User Name Already Exist");
    }

    normalizeOptionalData(userRegistrationData);
    userRegistrationData.password = encryptPassword(userRegistrationData.password);
    await usersDal.addUser(userRegistrationData);
}

const login = async (userLoginData) => {
    userLoginData.password = encryptPassword(userLoginData.password);
    let userData = await usersDal.login(userLoginData);
    // if (!userData.length) {
    //     throw new Error("Login Failed");
    // }
    console.log(userData);
    let userLikedStadiums = await likesDal.getUserLikedStadiums(userData.userId);
    for (let i = 0; i < userLikedStadiums.length; i++) {
        userLikedStadiums[i] = userLikedStadiums[i].stadiumId;
    }
    
    const user = userData[0]; 

    const token = jwt.sign({ userId: userData.userId, userType: userData.userType }, config.secret);
    let successfulLoginResponse = { token, firstName: userData.firstName, lastName: userData.lastName, userLikedStadiums};
    return successfulLoginResponse;
}

function validateUserData(userRegistrationData) {
    if (!userRegistrationData.userName) {
        throw new Error("Invalid user name or password");
    }

    if (!userRegistrationData.password) {
        throw new Error("Invalid user name or password");
    }

    if (userRegistrationData.password.length < 6) {
        throw new Error("Password is too short");
    }
}

function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}

function normalizeOptionalData(userRegistrationData) {
    if (!userRegistrationData.firstName) {
        userRegistrationData.firstName = "";
    }

    if (!userRegistrationData.lastName) {
        userRegistrationData.lastName = "";
    }
}

module.exports = {
    addUser,
    login
};