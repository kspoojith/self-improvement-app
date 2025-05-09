import mongoose from 'mongoose';

const behaviourSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},
{timestamps:true});

const Behaviour = mongoose.model('Behaviour',behaviourSchema);

export default Behaviour;