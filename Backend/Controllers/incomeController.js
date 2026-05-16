import incomeModel from "../Models/incomeModel.js";

// add income
const addIncome = async (req, res) => {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "all fields are required ",
      });
    }
    const newIncome = new incomeModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json({
      success: true,
      message: "income added successfully!",
    });
  } catch (error) {
    console.log("error from incomeController :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// get income
const getIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = (await incomeModel.find({ userId })).sort({ date: -1 }); // -1 means newest first ,1 means oldest first
    res.json(income);
  } catch (error) {
    console.log("error from incomeController 1:", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// update income
const updateIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const { description, amount } = req.body;
  try {
    const updatedIncome = await incomeModel.findByIdAndUpdate(
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
    if (!updatedIncome) {
      return res.status(404).json({
        success: false,
        message: "income not found",
      });
    }
    return res.json({
      success: true,
      message: " income updated successfully",
      date: updatedIncome,
    });
  } catch (error) {
    console.log("error from incomeController 2 :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// delete income
const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await incomeModel.findByIdAndDelete(id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "income not found",
      });
    }
    return res.json({
      success: true,
      message: "income deleted successfully",
    });
  } catch (error) {
    console.log("error from incomeController 3 :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// overview of income

const incomeOverview = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await incomeModel.find({ userId });
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const highestIncome = Math.max(
      ...income.map((i) => {
        return i.amount;
      }),
    );
    const lowestIncome = Math.min(...income.map((i) => i.amount));
    const averageIncome = income.length > 0 ? totalIncome / income.length : 0;
    const numberOfTransactions = income.length;
    const recentTransactions = income.slice(0, 3);

    res.json({
      success: true,
      data: {
        totalIncome,
        highestIncome,
        lowestIncome,
        averageIncome,
        numberOfTransactions,
        recentTransactions,
      },
    });
  } catch (error) {
    console.log("error from incomeController 4 :", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export { addIncome, getIncome, updateIncome, deleteIncome };
