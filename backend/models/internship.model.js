
import mongoose from "mongoose";

const InternshipSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String
    }],
    stipend:{
        type:Number,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    InternshipType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        }
    ]
},{timestamps:true});
export const Internship = mongoose.model("Internship" , InternshipSchema);