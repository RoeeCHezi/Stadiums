const express = require("express");
const router = express.Router();

const likesLogic = require("../logic/likes-logic");

router.post("/", async (request, response) => {

    // Extracting the JSON from the packet's BODY
    let userId = request.query.userId;
    let stadiumId = request.query.stadiumId;

    try {
        await likesLogic.addLike(userId, stadiumId);
        response.json();
    }
    catch (e) {
        console.log(e + "c");
        response.status(600).send(e.message)
    }
});

router.delete("/delete", async (request, response) => {

    // Extracting the JSON from the packet's BODY
    let userId = request.query.userId;
    let stadiumId = request.query.stadiumId;

    try {
        await likesLogic.deleteLike(userId, stadiumId);
        response.json();
    }
    catch (e) {
        console.log(e + "a");
        response.status(600).send(e.message)
    }
});

router.get("/", async (request, response, next) => {
    try {
        let LikesStats = await likesLogic.getLikesStats();
        response.json(LikesStats);
    } catch (e) {
        console.error(e + "b");
        response.status(600).send(e.message);
    }
});

module.exports = router;