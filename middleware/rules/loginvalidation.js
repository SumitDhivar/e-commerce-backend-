import { body } from "express-validator";

const loginvalidationrule = [
    body('username').notEmpty().withMessage('Username is MUST'),
    body('password').isLength({ min: 2 }).withMessage('Password must be at least 8 characters long'),
]

export default loginvalidationrule