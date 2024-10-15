import { Application } from "../models/application.model.js";
import { Internship } from "../models/internship.model.js";

export const applyInternship =async(req,res) =>{
    try {
        const userId=req.id;
        const internshipId =req.params.id;
        if(!internshipId){
            return res.status(400).json({
                message:"Internship id is required",
                success:false
            })
        };
        const existingApplication=await Application.findOne({internship:internshipId,applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this internship",
                success:false
            });
        }
        const internship=await Internship.findById(internshipId)
        if(!internship){
            return res.status(404).json({
                message:"Internship not found",
                success:false
            })
        }
        const newApplication=await Application.create({
            internship:internshipId,
            applicant:userId,
        });
        internship.applications.push(newApplication._id);
        await internship.save();
        return res.status(201).json({
            message:"Internship applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedInternships=async(req,res) =>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId }).sort({createdAt:-1}).populate({
            path:'internship',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getApplicants=async(req,res) =>{
    try {
        const internshipId=req.params.id;
        const internship=await Internship.findById(internshipId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!internship){
            return res.status(404).json({
                message:'Internship not found',
                success:false
            })
        };
        return res.status(200).json({
            internship,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus=async(req,res) =>{
    try {
        const{status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };
        const application=await  Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        };
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}