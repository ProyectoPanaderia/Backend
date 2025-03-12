const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: "mysql",  // 🔹 Cambia "postgres" por "mysql"
        logging: false,    // Opcional, desactiva logs de SQL en consola
    }
);

module.exports = sequelize;