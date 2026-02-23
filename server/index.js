import connectDB from "./src/config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./src/routes/user.Routes.js";
import productRoutes from "./src/routes/product.Routes.js";
import categoryRouter from "./src/routes/categories.Routes.js";
import authRoutes from "./src/routes/auth.Routes.js";
import helmet from "helmet";
import messagesRoutes from "./src/routes/messages.Routes.js"
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();

const app = express();

//MIDDLEWARE 
app.use(cookieParser());
app.use(helmet())
app.use(cors({
    origin: "https://mern-course-2026-1-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
// API routes
app.use("/api", userRoutes);
app.use("/api", productRoutes); //test done
app.use("/api", categoryRouter); //test done
app.use("/api", authRoutes)
app.use("/api", messagesRoutes)

//error handlng middleware

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
