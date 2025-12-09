import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"API is running"});
})

app.use("/api/products", router)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
      console.log(`Server running on port ${PORT}`);

})