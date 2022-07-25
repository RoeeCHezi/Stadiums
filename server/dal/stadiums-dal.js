let connection = require("./connection-wrapper");

const getAllStadiums = async () => {
    let sql = "SELECT s.id, s.stadium_name as stadiumName, s.destination, s.img, s.game_day as matchDate, s.match_description as matchDetails, s.price, s.stadium_description_capacity as stadiumDescriptionCapacity, s.stadium_description_year_built as stadiumDescriptionYearBuilt, s.stadium_description_const_cost as stadiumDescriptionConstCost, count(l.user_id) as likes FROM stadiums.stadiums s left join stadiums.likes l ON s.id = l.stadium_id group by s.id";
    let stadiums = await connection.execute(sql);
    return stadiums;
}

const addNewStadium = async (newStadium) => {
    console.log(newStadium)
    let sql = `insert into stadiums(game_day, stadium_name, destination, img, match_description, price, stadium_description_capacity, stadium_description_year_built, stadium_description_const_cost) ` +
        `values(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let parameters = [newStadium.matchDate, newStadium.stadiumName, newStadium.destination, newStadium.img, newStadium.matchDetails,
    newStadium.price, newStadium.descriptionCapacity, newStadium.descriptionYearBuilt, newStadium.descriptionConstructionCost];

    let stadiumData = await connection.executeWithParameters(sql, parameters);

    return stadiumData.insertId;
}

const editStadium = async (stadium) => {
    let sql = "UPDATE stadiums SET game_day=?, stadium_name=?, destination=?, img=?, match_description=?, price=?, stadium_description_capacity=?, stadium_description_year_built=?, stadium_description_const_cost=? WHERE id=?";
    let parameters = [stadium.matchDate, stadium.stadiumName, stadium.destination, stadium.img, stadium.matchDetails,
        stadium.price, stadium.descriptionCapacity, stadium.descriptionYearBuilt, stadium.descriptionConstructionCost, stadium.id];
    await connection.executeWithParameters(sql, parameters);
}

const updateLikes = async (like, id) => {
    let sql = "UPDATE stadiums SET likes=? WHERE id=?"
    let parameters = [like, id];
    await connection.executeWithParameters(sql, parameters);
}

const deleteStadium = async (id) => {
    let sql = "DELETE FROM stadiums WHERE id=?";
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}


module.exports = {
    getAllStadiums,
    addNewStadium,
    editStadium,
    updateLikes,
    deleteStadium
}