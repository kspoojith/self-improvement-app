import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    behaviour:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Behaviour',
        required:true
    }
},{timestamps:true});

const Todo = mongoose.model('Todo',todoSchema);

export default Todo;