import { body } from "express-validator";

const registraionrule = [
    body('username').notEmpty().withMessage('Username is MUST'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
]

export default registraionrule