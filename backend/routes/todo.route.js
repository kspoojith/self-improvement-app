import express from 'express';

import {addTodo, getAllTodosById, updateTodo, deleteTodo} from '../controllers/todo.controller.js';

const todoRoute = express.Router();

todoRoute.post("/", addTodo);
todoRoute.get("/:id", getAllTodosById);
todoRoute.patch("/:id", updateTodo);
todoRoute.delete("/:id", deleteTodo);

export default todoRoute;