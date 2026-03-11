import { body } from "express-validator";

const insertproductvalidationrule = [
    body('name').notEmpty().withMessage('Product name is MUST'),
    body('price').isNumeric().withMessage('Price must be a number'),
]

export default insertproductvalidationrule