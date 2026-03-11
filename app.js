import express, { json } from "express";
import userRouter from "./route/UserRoute.js";
import productRouter from "./route/ProductRoute.js";
import cartRouter from "./route/CartRoute.js";
import cors from "cors";
import logging from "./middleware/logging.js";
import cookieParser from "cookie-parser";
import dotenv  from "dotenv";
dotenv.config();

import orderRouter from "./route/OrderRoute.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(json());
app.use(logging);
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);

app.listen(process.env.PORT, () => console.log("server is running on port 8000."))