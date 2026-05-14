import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://pm7300779625_db_user:GcHeNS7QNyVvbtAF@cluster0.cbfimtw.mongodb.net/Expense",
    )
    .then(() => console.log("mongodb connected"));
};
