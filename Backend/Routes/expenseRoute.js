import express from 'express'
import {addExpense, getExpense, updateExpense, deleteExpense, incomeOverview}from  '../Controllers/incomeController.js'
import {authMiddleware} from '../Middleware/auth.js'

const expenseRouter = express.Router();

expenseRouter.post('/addExp',authMiddleware,addIncome);
expenseRouter.get('/getExp',authMiddleware,getIncome);
expenseRouter.put('/updateExp/:id',authMiddleware,updateIncome);
expenseRouter.delete('/deleteExp/:id',authMiddleware,deleteIncome);
expenseRouter.get('/overviewExp',authMiddleware,incomeOverview);



export default expenseRouter;