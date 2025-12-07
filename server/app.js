const express = require('express');
const dotenv = require('dotenv');
const Admin = require('./model/Admin.js');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');


dotenv.config({ path: path.join(__dirname, '..', '.env') });
app.use(express.json());

app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://localhost:5000'], 
        credentials: true
    }
));

const connectMongo = async() => {
    try{
await mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected");
})
    } catch(err){
        console.error("Error connecting to MongoDB:", err.message);
        
    }

};

function isLoggedIn(req,res, next){
    if(LoggedIn){
        next();
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
}


let LoggedIn = false;

app.post('/admin_register', async (req, res) => {
    const { email, password } = req.body;
    try{
        let isAdminExist = await Admin.findOne({email});
        if(isAdminExist){
            return res.status(400).json({ message: "Account already exists" });
        }else{
        
        const newAdmin = await Admin.create({
            email,
            password
        });
        LoggedIn = true;
        res.status(201).json({ message: "Admin Registered Successfully" });
    }
    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
});

app.post('/admin_login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const admin = await Admin.findOne({
            email,
            password
        });
        

        if(admin){
            LoggedIn = true;
            res.status(200).json({ message: "Login Successful" });
        }
        else{
            res.status(401).json({ message: "Invalid Credentials" });
        }
        
    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectMongo();
    console.log(`Server is running on  http://localhost:${PORT}`);
});
