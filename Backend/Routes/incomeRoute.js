import express from 'express'
import {addIncome, getIncome, updateIncome, deleteIncome, incomeOverview}from  '../Controllers/incomeController.js'
import {authMiddleware} from '../Middleware/auth.js'

const incomeRouter = express.Router();

incomeRouter.post('/addInc',authMiddleware,addIncome);
incomeRouter.get('/getInc',authMiddleware,getIncome);
incomeRouter.put('/updateInc/:id',authMiddleware,updateIncome);
incomeRouter.delete('/deleteInc/:id',authMiddleware,deleteIncome);
incomeRouter.get('/overviewInc',authMiddleware,incomeOverview);



export default incomeRouter;