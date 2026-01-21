import connectDB from "./src/config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./src/routes/user.Routes.js";
import productRoutes from "./src/routes/product.Routes.js";
import categoryRouter from "./src/routes/categories.Routes.js";
import authRoutes from "./src/routes/auth.Routes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();

const app = express();

//MIDDLEWARE 
app.use(cookieParser());
app.use(helmet())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
// API routes
app.use("/api", userRoutes);
app.use("/api", productRoutes); //test done
app.use("/api", categoryRouter); //test done
app.use("/api", authRoutes)

//error handlng middleware

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
