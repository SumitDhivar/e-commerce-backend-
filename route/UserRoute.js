import express from "express";
import { deleteByUsername, getAllUsers, registerUser, getUserById, userlogin } from "../controller/UserController.js";
import registraionrule from "../middleware/rules/registrationValidation.js";
import validation from "../middleware/validation.js";
import loginvalidationrule from "../middleware/rules/loginvalidation.js";
import verifytoken from "../middleware/verifytoken.js";
import verifyadminrole from "../middleware/verifyadminrole.js";

const userRouter = express.Router();

userRouter.get('', verifytoken, verifyadminrole, getAllUsers);
userRouter.post('/register', registraionrule ,validation, registerUser);
userRouter.delete('/:username',verifytoken, deleteByUsername);
userRouter.get('/:userId',verifytoken, getUserById);
userRouter.post('/login', loginvalidationrule, validation, userlogin);

export default userRouter;