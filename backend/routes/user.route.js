import express from 'express';


import {addUser,deleteUser,getAllUsers} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/',addUser)

userRouter.delete("/:id",deleteUser)

userRouter.get("/",getAllUsers)

export default userRouter;