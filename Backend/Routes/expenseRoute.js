import express from 'express'
import { addExpense, getExpense, updateExpense, deleteExpense, expenseOverview}from  '../Controllers/expenseController.js'
import {authMiddleware} from '../Middleware/auth.js'

const expenseRouter = express.Router();

expenseRouter.post('/addExp',authMiddleware,addExpense);
expenseRouter.get('/getExp',authMiddleware,getExpense);
expenseRouter.put('/updateExp/:id',authMiddleware,updateExpense);
expenseRouter.delete('/deleteExp/:id',authMiddleware,deleteExpense);
expenseRouter.get('/overviewExp',authMiddleware,expenseOverview);



export default expenseRouter;