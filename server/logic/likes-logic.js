const likesDal = require('../dal/likes-dal');

const addLike = async (userId, stadiumId) => {
    await likesDal.addLike(userId, stadiumId);
}

const deleteLike = async (userId, stadiumId) => {
    await likesDal.deleteLike(userId, stadiumId);
}

const getLikesStats = async () => {
    let likesStats = await likesDal.getLikesStats();
    return likesStats;
}

module.exports = {
    addLike,
    deleteLike,
    getLikesStats
}