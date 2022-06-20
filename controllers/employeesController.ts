import { Request,Response,NextFunction } from "express";
import employeesServices from "../services/employeesServices";
const getEmployees = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let getEmployees =await employeesServices.getEmployees(req,res)
        res.status(200).json(getEmployees)
    } catch (error) {
        res.send(error)
    }
}

const addEmployees = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let addEmployees = await employeesServices.addEmployees(req,res)
        res.status(200).json(addEmployees)
    } catch (error) {
        res.send(error)
    }
}

const updateEmployees = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let updateEmployees = await employeesServices.updateEmployees(req,res)
        res.status(200).json(updateEmployees)
    } catch (error) {
        res.send(error)
    }
}

const deleteEmployees = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let deleteEmployees = await employeesServices.deleteEmployees(req,res)
        res.status(200).json(deleteEmployees)
    } catch (error) {
        res.send(error)
    }
}
export default {getEmployees,addEmployees,deleteEmployees,updateEmployees}