import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.j6hqihe.mongodb.net/whatsapp-clone?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
        })
        console.log("Database connected successfully")
    } catch(err) {
        console.log("Error while connecting with the databse ", err.message);
    }   
}

export default Connection