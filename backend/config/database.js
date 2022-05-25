import { Sequelize } from "sequelize";

const db = new Sequelize('jecstore', 'postgres', '12345',{
    host: "localhost",
    dialect: "postgresql",
});

export default db;