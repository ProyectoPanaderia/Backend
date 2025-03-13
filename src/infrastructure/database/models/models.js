const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("database_name", "username", "password", {
    host: "localhost",
    dialect: "mysql"  
});

const User = require("./user")(sequelize, DataTypes);

module.exports = {
    sequelize,
    User
};