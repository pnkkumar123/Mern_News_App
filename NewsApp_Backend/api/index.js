import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user.route.js';
import { authRouter } from './routes/auth.route.js';
import cors from 'cors';
import articleRouter from './routes/article.route.js';
import appRouting from './routes/ForexArticle.js';


dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('connected to mongoDB');
})
.catch((error)=>{
    console.log(error);
})

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());

app.listen(3000,()=>{
    console.log('server listening on port');
})
app.use("/api/user",router);
app.use("/api/auth",authRouter);
app.use("/api/articles",articleRouter);
app.use("/api/forex",appRouting);

app.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        sucess:false,
        message,
        statusCode,
    })
})