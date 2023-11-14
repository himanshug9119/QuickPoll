import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.listen(3000, ()=>{
    console.log('Listening on port the 3000')
})

app.use("/api/user" , userRouter);
