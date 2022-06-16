import { Request,Response,NextFunction } from "express";
import companyModel from "../models/companyModel";
import employeesModel from "../models/employeesModel";
const getCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let textSearch = req.query.textSearch
        let activePage:any= req.query.activePage
        let limit:any =req.query.limit
        let skip = (activePage - 1)*limit
        let lengthData = await companyModel.countDocuments({name:{$regex: textSearch,$options:'i'}})
        let totalPage = Math.ceil(lengthData/limit)
        let getCompany = await companyModel.find({name:{$regex: textSearch,$options:'i'}}).skip(skip).limit(limit)
        // .populate({
        //     path:'id_Employee',
        //     model: 'employees'
        // })
        res.send({getCompany,totalPage})
    } catch (error) {
        res.send(error)
    }
}

const addCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let {name,address,numberOfEmployees,creationDate, id_Employee} = req.body
        let addCompany = await companyModel.create({name,address,numberOfEmployees,creationDate})
        let arrayIdEmployees =[]
        let arrayIdCompanyOld =[]
        for(let i =0;i<id_Employee.length;i++){
            arrayIdEmployees.push(id_Employee[i])
            let updateEmployee = await employeesModel.findByIdAndUpdate(id_Employee[i])
            arrayIdCompanyOld = updateEmployee.id_CompanyOld
            if(arrayIdCompanyOld){
                arrayIdCompanyOld.push(updateEmployee.id_Company)
                console.log(arrayIdCompanyOld,"da vao day");
                updateEmployee = await employeesModel.findByIdAndUpdate(id_Employee[i],{id_Company: addCompany._id,id_CompanyOld: arrayIdCompanyOld},{new:true})
            }
        }
        let updateCompany = await companyModel.findByIdAndUpdate(addCompany._id,{id_Employee: arrayIdEmployees},{new:true})
        res.send("add thanh cong")
    } catch (error) {
        res.send(error)
    }
}

const deleteCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let id = req.body.id
        let deleteCompany = await companyModel.findByIdAndDelete(id)
        res.send({deleteCompany})
    } catch (error) {
        res.send(error)
    }
}

const updateCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let {id,name,address,numberOfEmployees,creationDate}=req.body
        let updateCompany = await companyModel.findByIdAndUpdate(id,{name,address,numberOfEmployees,creationDate},{new:true})
        res.send({updateCompany})
    } catch (error) {
        res.send(error)
    }
}
export default {getCompany,addCompany,deleteCompany,updateCompany}