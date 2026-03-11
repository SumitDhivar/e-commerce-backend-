import express from "express";
import { getCartItems, addToCart, removeFromCart } from "../controller/CartController.js";
import verifytoken from "../middleware/verifytoken.js";

const cartRouter = express.Router();

cartRouter.get('',verifytoken, getCartItems);
cartRouter.post('/addtocart',verifytoken, addToCart);
cartRouter.delete('/:id',verifytoken, removeFromCart);

export default cartRouter;