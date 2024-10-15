import { Internship } from "../models/internship.model.js";

export const postInternship=async (req,res) =>{
    try {
        const{title,description,requirements,stipend,location,InternshipType,experienceLevel,position,companyId}=req.body;
        const userId=req.id;
        if(!title||!description||!requirements||!stipend||!location||!InternshipType||!experienceLevel||!position||!companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        };
        const job = await Internship.create({
            title,
            description,
            requirements:requirements.split(","),
            stipend:Number(stipend),
            location,
            InternshipType,
            experienceLevel,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"New job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getAllInternships=async(req,res)=>{
    try {
        const keyword=req.query.keyword ||"";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const internships=await Internship.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!internships){
            return res.status(404).json({
                message:"internship not found",
                success:false
            })
        };
        return res.status(200).json({
            internships,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getInternshipById = async(req,res)=>{
    try {
        const internshipId=req.params.id;
        const internship=await Internship.findById(internshipId);
        if(!internship){
            return res.status(404).json({
                message:"Internship not found",
                success:true
            })
        };
        return res.status(200).json({internship,success:true});
    } catch (error) {
        console.log(error);
    }
}
export const getAdminInternships =async(req,res) =>{
    try {
        const adminId=req.id;
        const internships=await Internship.find({created_by:adminId});
        if(!internships){
            return res.status(404).json({
                message:"Internships not found",
                success:false
            })
        };
        return res.status(200).json({
            internships,
            success:true
        })
    } catch (error) {
       console.log(error); 
    }
}