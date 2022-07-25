const connection = require('./connection-wrapper');

const addUser = async (userRegistrationData) => {
    let sql = `insert into users(user_name, password, user_type, first_name, last_name) ` +
        `values(?, ?, ?, ?, ?)`;
    let parameters = [userRegistrationData.userName, userRegistrationData.password,
    userRegistrationData.userType, userRegistrationData.firstName, userRegistrationData.lastName];
    await connection.executeWithParameters(sql, parameters);
}

const isUserNameExist = async (userName) => {
    let sql = "SELECT id from users where user_name = ?";
    let parameters = [userName];
    let users = await connection.executeWithParameters(sql, parameters);

    if (users && users.length > 0) {
        return true;
    }
    return false;
}

const login = async (user) => {
    console.log(user);
    let sql = 'SELECT id as userId, user_type as userType, first_name as firstName, last_name as lastName from users where user_name = ?  AND password = ? '
    let parameters = [user.username, user.password];
    let [usersLoginResult] = await connection.executeWithParameters(sql, parameters);
    
    if (!usersLoginResult) {
        return null;
    }

    return usersLoginResult;
}
 
module.exports = {
    addUser,
    isUserNameExist,
    login
};