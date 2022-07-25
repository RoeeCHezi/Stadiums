const expressJwt = require("express-jwt");
const config = require("../config/config.json");

// Extracting the text from the secret's JSON
const { secret } = config;

const loginFilters = () => {
    // Load secret into 

    return expressJwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            // public routes that don't require authentication
            { url: "/stadiums", method: "GET" },
            { url: "/users", method: "POST" },
            { url: "/users/login", method: "POST" }
        ]
    });
}

module.exports = loginFilters