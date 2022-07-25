const stadiumsDal = require('../dal/stadiums-dal');

const getAllStadiums = async () => {
    let stadiums = await stadiumsDal.getAllStadiums();
    return stadiums;
}

const addNewStadium = async (newStadium) => {

    normalizeStadiumData(newStadium)
    newStadium = await stadiumsDal.addNewStadium(newStadium);
    return newStadium;
}

const deleteStadium = async (id) => {
    await stadiumsDal.deleteStadium(id);
    return id;
}

const editStadium = async (stadium) => {
    await stadiumsDal.editStadium(stadium);
    return stadium;
}

const updateLikes = async (like, id) => {
    await stadiumsDal.updateLikes(like, id);
}

const normalizeStadiumData = (newStadium) => {
    if (!newStadium.destination) {
        newStadium.destination = "";
    }
}


module.exports = {
    getAllStadiums,
    addNewStadium,
    deleteStadium,
    editStadium,
    updateLikes
}