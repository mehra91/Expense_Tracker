import expenseModel from "../Models/expense.model.js";
import { getDateRange } from "../utils/dateRange.js";

// add expense
const addExpense = async (req, res) => {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "all fields are required ",
      });
    }
    const newExpense = new expenseModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json({
      success: true,
      message: "expense added successfully!",
    });
  } catch (error) {
    console.log("error from expenseController :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// get expense
const getExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await expenseModel.find({ userId }).sort({ date: -1 }); // -1 means newest first ,1 means oldest first
    return res.json(expense);
  } catch (error) {
    console.log("error from expenseController 1:", error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// update expense
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const { description, amount } = req.body;
  try {
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        description,
        amount,
      },
      {
        new: true,
      },
    );
    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "expense not found",
      });
    }
    return res.json({
      success: true,
      message: " expense updated successfully",
      date: updatedExpense,
    });
  } catch (error) {
    console.log("error from expenseController 2 :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// delete expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await expenseModel.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "expense not found",
      });
    }
    return res.json({
      success: true,
      message: "expense deleted successfully",
    });
  } catch (error) {
    console.log("error from expenseController 3 :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// overview of expense

const expenseOverview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { range = "monthly" } = req.query;
    const { start, end } = getDateRange(range);
    const expense = await expenseModel
      .find({
        userId,
        date: { $gte: start, $lte: end }, // $gte = greater then or equal and $lte = less than or equal
      })
      .sort({ date: -1 });

    const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
    const highestExpense =
      expense.length > 0
        ? Math.max(
            ...expense.map((i) => {
              return i.amount;
            }),
          )
        : 0;
    const lowestExpense =
      expense.length > 0 ? Math.min(...expense.map((i) => i.amount)) : 0;
    const averageExpense = expense.length > 0 ? totalExpense / expense.length : 0;
    const numberOfTransactions = expense.length;
    const recentTransactions = expense.slice(0, 3);

   return  res.status(200).json({
      success: true,
      data: {
        totalExpense,
        highestExpense,
        lowestExpense,
        averageExpense,
        numberOfTransactions,
        recentTransactions,
        range
      },
    });
  } catch (error) {
    console.log("error from expenseController 4 :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export { addExpense, getExpense, updateExpense, deleteExpense ,expenseOverview };
