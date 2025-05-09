import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user
        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Send response
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                },
                token
            }
        });
    } catch (error) {
        console.error('Error in Adding User:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

export const deleteUser = async (req,res)=>{
    const {id} = req.params;

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"User Removed Successfully"});
    }
    catch(error){
        res.status(404).json({success:false,message:"User not found"});
    }
}

export const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({success:true,data:users});
    }
    catch(error){
        console.log(`error:${error.message}`);
        res.status(500).json({success:false,message:'Server Error'});
    }
}