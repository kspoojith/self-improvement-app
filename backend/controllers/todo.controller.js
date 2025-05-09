import mongoose from 'mongoose';
import Todo from '../models/todo.model.js';

export const addTodo = async (req,res)=>{
    const todo = req.body;
    if(!todo.title||!todo.behaviour){
        return res.status(400).json({success:false,message:"please mention title"});
    }

    if(!mongoose.Types.ObjectId.isValid(todo.behaviour)){
        return res.status(400).json({success:false,message:"Invalid behaviour ID"});
    }

    try{
        const newTodo = new Todo(todo);
        const savedTodo = await newTodo.save();
        res.status(201).json({
            success: true,
            message: "Todo Added Successfully",
            data: savedTodo
        });
    }
    catch(error){
        console.log(`Error in adding Todo: ${error.message}`);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const getAllTodosById = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid ID"});
    }

    try{
        const todos = await Todo.find({behaviour: id});
        res.status(200).json({success:true,data:todos});
    }
    catch(error){
        console.log(`Error in fetching todos: ${error.message}`);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const updateTodo = async (req,res)=>{
    const {id} = req.params;
    const updatedTodo = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid ID"});
    }

    if(!updatedTodo.title){
        return res.status(400).json({success:false,message:"No valid fields to update"});
    }

    try{
        const updated = await Todo.findByIdAndUpdate(id, updatedTodo, {new:true});
        if(!updated){
            return res.status(404).json({success:false,message:"Todo not found"});
        }
        res.status(200).json({success:true,data:updated});
    }
    catch(error){
        console.log(`Error in updating todo: ${error.message}`);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const deleteTodo = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid ID"});
    }

    try{
        const deleted = await Todo.findByIdAndDelete(id);
        if(!deleted){
            return res.status(404).json({success:false,message:"Todo not found"});
        }
        res.status(200).json({success:true,message:"Todo deleted successfully"});
    }
    catch(error){
        console.log(`Error in deleting todo: ${error.message}`);
        res.status(500).json({success:false,message:"Server Error"});
    }
}