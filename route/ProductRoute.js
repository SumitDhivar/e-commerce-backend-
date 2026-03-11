import express from "express";
import { getAllProducts, addProduct, getProductById, deleteProductById } from "../controller/ProductController.js";
import insertproductvalidationrule from "../middleware/rules/insertproductvalidation.js";
import validation from "../middleware/validation.js";
import verifytoken from "../middleware/verifytoken.js";
import verifyadminrole from "../middleware/verifyadminrole.js";

const productRouter = express.Router();

productRouter.get('',getAllProducts);
productRouter.post('', insertproductvalidationrule ,validation, verifytoken, verifyadminrole, addProduct);
productRouter.get('/:productId',getProductById);
productRouter.delete('/:productId',verifytoken, verifyadminrole,deleteProductById);

export default productRouter;