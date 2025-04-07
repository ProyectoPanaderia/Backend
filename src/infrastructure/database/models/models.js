const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("panaderia_db", "root", "", {
    host: "localhost",
    dialect: "mysql",  
    port: 3306, 
});

const User = require("./user")(sequelize, DataTypes);

//Acá van las relaciones entre los modelos

module.exports = {
    sequelize,
    User
};

