import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://mongo_user:mongo_password@fast-food.ehtuq.mongodb.net/fast-food').then(()=>console.log("DataBase Connected"));
} 
// mongodb+srv://mongo_user:mongo_password@fast-food.ehtuq.mongodb.net/fast-food