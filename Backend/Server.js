import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './Routes/userRoute.js';
import incomeRouter from './Routes/incomeRoute.js';
import expenseRouter from './Routes/expenseRoute.js';

const app = express();
const port = 4000;
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//DB
connectDB();

//Routes
app.use('/api/user',userRouter);
app.use('/api/income',incomeRouter);
app.use('/api/expense',expenseRouter);

app.get('/',(req,res)=>{
   res.send('server working')
})

app.listen(port,()=>{
  console.log(`server running on http://localhost:${port}`);
})
