import mongoose from "mongoose";

const Connection = async () => {
  const URL = `mongodb+srv://touqeeransari001:Ansari@cluster0.wq13vzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database ", error);
  }
};

export default Connection;
