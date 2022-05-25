import Express from "express";
import db from "./config/database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";



// var cookieParser = require('cookie-parser')
dotenv.config();
const app = Express();
app.use(bodyParser.urlencoded({ extended: false }))
try{
    db.authenticate();
    // Users.sync(); // create tabel users
    console.log('Database Conected');
}catch(error){
    console.log('Database Error');
}

app.use(cookieParser());
app.use(cors());
app.use(Express.json());
app.use('/', router);

app.listen(5000, () => console.log('Server running at port 5000'));