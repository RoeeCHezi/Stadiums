const { request, response } = require("express");
const express = require("express");
const router = express.Router();

const stadiumsLogic = require('../logic/stadiums-logic');

router.get("/", async (request, response) => {
    try {

        let stadiums = await stadiumsLogic.getAllStadiums();

        // YOU MUST RETURN A VALUE TO THE CLIENT, OR ELSE IT WILL GET STUCK
        response.json(stadiums);
    }
    catch (e) {
        console.error(e + "d");
        response.status(600).send(e.message);
    }
});

router.post("/", async (request, response, next) => {

    let newStadium = request.body;

    try {
        await stadiumsLogic.addNewStadium(newStadium);
        response.json(newStadium);
    }
    catch (e) {
        console.error(e + "f");
        response.status(600).send(e.message);
        return next(e);
    }
});

router.post("/updateLikes", async (request, response) => {
    let like = request.query.like;
    let id = request.query.id;

    try {
        await stadiumsLogic.updateLikes(like, id);
        response.json();
    }
    catch (e) {
        console.log(e + "g");
        response.status(600).send(e.message)
    }
})

router.delete("/delete", async (request, response) => {
    let id = request.query.id;
    try {
        await stadiumsLogic.deleteStadium(id);
        response.json(id);
    }
    catch (e) {
        console.error(e + "h");
        response.status(600).send(e.message)
    }
});

router.put("/EditStadium", async (request, response) => {

    // Extracting the JSON from the packet's BODY
    let stadium = request.body;

    try {
        await stadiumsLogic.editStadium(stadium);
        response.json(stadium);
    }
    catch (e) {
        console.log(e + "I");
        response.status(500).send(e.message)
    }
});

module.exports = router;

