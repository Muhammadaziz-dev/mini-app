import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://baxtiyorovmuhammadaziz28:main1234@cluster0.bf5odhj.mongodb.net/test').then(()=>console.log("DataBase Connected"));
}
