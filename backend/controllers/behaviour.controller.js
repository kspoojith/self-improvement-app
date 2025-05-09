import mongoose from 'mongoose';
import Behaviour from "../models/behaviour.model.js";

export const addBehaviour = async (req,res)=>{
    const behaviour = req.body;

    if(!behaviour.title||!behaviour.description||!behaviour.user){
        return res.status(400).json({success:false,message:"please mention all required fields"});
    }

    const newBehaviour = new Behaviour(behaviour);

    try{
        await newBehaviour.save();
        res.status(201).json({success:true,message:"Behaviour Added successfully"});
    }
    catch(error){
        console.log(`error in creating in behaviour: ${error.message}`);
        res.status(500).json({success:false,message:'Server Error'});
    }
}

export const getAllBehavioursById = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid ID"});
    }

    try{
        const behaviours = await Behaviour.find({user:id});
        res.status(200).json({success:true,data:behaviours});
    }
    catch(error){
        console.log(`error in fetching behaviours: ${error.message}`);
        res.status(500).json({success:false,message:"Server error"});
    }
}

export const updateBehaviour = async (req,res)=>{
    const {id} = req.params;
    const updatedBehaviour = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Behaviour not found"});
    }

    if(!updatedBehaviour.title||!updatedBehaviour.description){
        return res.status(400).json({success:false,message:"please mention all required fields"});
    }

    try{
        const updated = await Behaviour.findByIdAndUpdate(id, updatedBehaviour, {new:true});
        res.status(201).json({success:true,data:updated});
    }
    catch(error){
        console.log(`error while updating Behaviour : ${error.message}`);
        res.status(500).json({success:false,message:"Server error"});
    }
}

export const deleteBehaviour = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"behaviour is invalid"});
    }

    try{
        await Behaviour.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Behaviour Deleted Successfully"});
    }
    catch(error){
        console.log(`error in deleting behaviour: ${error.message}`);
        res.status(500).json({success:false,message:"server error"});
    }
}