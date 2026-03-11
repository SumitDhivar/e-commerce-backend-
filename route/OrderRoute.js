import express from "express";
import { placeOrder, getUserOrders, getAllOrders } from "../controller/OrderController.js";
import verifytoken from "../middleware/verifytoken.js";
import verifyadminrole from "../middleware/verifyadminrole.js";

const orderRouter = express.Router();

orderRouter.post('place-order/', verifytoken, placeOrder);
orderRouter.get('/', verifytoken, verifyadminrole, getAllOrders);
orderRouter.get('/:username', verifytoken, getUserOrders);

export default orderRouter;
