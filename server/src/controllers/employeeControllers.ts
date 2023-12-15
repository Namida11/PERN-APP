import { Request,Response } from "express";
import { IEmployeeResponse } from "../types/share/employee/IEmployeeResponce";
import { Employee } from "../models/Employee";
import { UniqueConstraintError } from "sequelize";
import { request } from "http";

export async function getAllEmployees(request:Request,response:Response ){
      try{
        const empResponse:IEmployeeResponse[]= await Employee.findAll()
        if(!empResponse.length){
            return response.status(404).json({success:false, message:"employee not found!"})
        }
        return response.status(200).json({success:true, message: "Employee successfully", data: empResponse})
      }
      catch(error:any){
        return response.status(501).json({ success: false, message: "Internal Server Error" })
      }
}

export async function saveEmployee(request:Request, response:Response) {
    try{
        const savedEmp:IEmployeeResponse=await Employee.create(request.body)
        return response.status(201).json({success:true, message:"saved succesful employee", data:savedEmp})
    }
    catch(error:any){
        if(error instanceof UniqueConstraintError){
            return response.status(404).json({success:false, message:"The email  is incorrect"})
        }
          return response.status(501).json({ succes: false, message: "Internal Server error" })
       
    }
}

export async function updatedEmployee(request:Request,response:Response) {
    try{
        const id:string= request.params.id
        const findEmployee= await Employee.findByPk(id)
        if(!findEmployee){
            return response.status(404).json({success:false, message:"employe is not find"})
        }
        await findEmployee.update({...request.body})
        const updateEmp = await Employee.findByPk(id)
        return response.status(200).json({success:true,message:"successfully updated!", data:updateEmp})
    }
    catch(error:any){
        if(error instanceof UniqueConstraintError){
            return response.status(404).json({ success: false, message: "The email  is incorrect" })
        }
        return response.status(501).json({ success: false, message: "Internal Server Error" })
    }
}

export async function deleteEmployee(request:Request, response:Response) {
    try{
        const id:string= request.params.id;
        const findEmployee = await Employee.findByPk(id)
        if(!findEmployee){
             return response.status(404).json({success:false, message:"employe is not find"})
        }
         await findEmployee.destroy();
        return response.status(200).json({ success: true, message: "Employee deleted successfully" })
    }
     catch (error: any) {
        return response.status(501).json({ success: false, message: "Internal Server Error" })

    }
}