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
const allowedOrigins = [
    "https://mern-course-2026-1-frontend.onrender.com",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
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
