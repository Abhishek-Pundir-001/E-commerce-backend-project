import express from 'express';
import mongoose from 'mongoose';
import { PORT } from './config/serverConfig.js';
import { MONGODB_URL } from './config/databaseConfig.js';
import userModel from './models/user.model.js';
import bcrypt from "bcryptjs"
import userRoutes from './routes/userRoutes.js'

const app = express();


// connecting to database

mongoose.connect(MONGODB_URL)
const db = mongoose.connection;
db.on("error", () => {
    console.log("error while connecting to database");
});
db.once("open", () => {
    console.log("connected to mongodb")
    // init()
})

// start the server
app.listen(PORT, () => {
    console.log("server is up at port:", PORT)
})

app.use(express.json())

// create admin account

async function init() {
    try {
        let user = await userModel.findOne({ userId:"ADMIN" });

    if (user) {
        console.log('Admin already exist');
        return
    }
    } catch (error) {
        console.log(error.message)
    }
    
    try {
        user = await userModel.create({
            name: "deepesh",
            email: "deepesh123@gmaail.com",
            password: bcrypt.hashSync('deepesh123@', 8),
            userId: 'ADMIN',
            userType: 'ADMIN'
        })
        console.log("Admin Craeted",user)
    } catch (error) {
        console.log(error.message)
    }



}

app.use('/ping', (req, res) => {
    res.status(200).send("pong")
})
app.use('/api/v1/user',userRoutes)

