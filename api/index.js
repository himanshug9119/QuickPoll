import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import pollRouter from './routes/poll.routes.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config();

const URL = process.env.REACT_APP_MONGO_CONNECT_URL;

mongoose.connect(URL).then(()=>{
    console.log('Connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.listen(3000, ()=>{
    console.log('Listening on port the 3000')
})
app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);
app.use("/api/poll" , pollRouter);

app.use(express.static(path.join(__dirname , '/client/dist')));

app.get('*' , (req, res)=>{
    res.sendFile(path.join(__dirname , 'client' , 'dist' , 'index.html'));
});

// adding middelware for error handling
app.use((err , req , res , next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode ,
        message
    })
})
