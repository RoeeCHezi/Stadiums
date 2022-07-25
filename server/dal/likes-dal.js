let connection = require("./connection-wrapper");

const addLike = async (userId, stadiumId) => {
    let sql = "INSERT INTO likes (user_id, stadium_id)  values(?, ?)";
    let parameters = [userId, stadiumId];
    await connection.executeWithParameters(sql, parameters);
}

const deleteLike = async (userId, stadiumId) => {
    let sql = "DELETE FROM likes WHERE user_id=? and stadium_id=?";
    let parameters = [userId, stadiumId];
    await connection.executeWithParameters(sql, parameters);
}

const getUserLikedStadiums = async (userId) => {
    let sql = "SELECT stadium_id as stadiumId FROM likes where user_id=?";
    let parameters = [userId];
    let userLikedStadiums = await connection.executeWithParameters(sql, parameters);
    return userLikedStadiums;
}

const getLikesStats = async () => {
    let sql = `SELECT l.id, s.stadium_name as stadiumName, count(u.user_name) as likes
    FROM likes l join stadiums v
    on l.stadium_id = s.id
    join users u
    on l.user_id = u.user_id
    group by l.stadium_id`;
    let list = await connection.execute(sql);
    return list;
}


module.exports = {
    addLike,
    deleteLike,
    getUserLikedStadiums,
    getLikesStats
}