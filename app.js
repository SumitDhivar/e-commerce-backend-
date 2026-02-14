import express, { json } from "express";
import userRouter from "./route/UserRoute.js";
import productRouter from "./route/ProductRoute.js";
const app = express();
app.use(json());

app.use('/users', userRouter);
app.use('/products', productRouter);



app.listen(8080, () => console.log("server is running on port 8080."))