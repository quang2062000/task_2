import { Request,Response,NextFunction } from "express";
import companyModel from "../models/companyModel";
import employeesModel from "../models/employeesModel";

const getEmployees = async(req:Request,res:Response)=>{
    let textSearch = req.query.textSearch
    let activePage:any= req.query.activePage
    let limit:any =req.query.limit
    let skip = (activePage - 1)*limit
    let lengthData = await employeesModel.countDocuments({name:{$regex: textSearch,$options:'i'}})
    let totalPage = Math.ceil(lengthData/limit)
    let getEmployees = await employeesModel.find({name:{$regex: textSearch,$options:'i'}}).skip(skip).limit(limit)
    .populate({
        path:'id_Company',
        model: 'company'
    })
    console.log(getEmployees,"getEmployees");
    return {getEmployees,totalPage}
}

const addEmployees = async(req:Request,res:Response)=>{
    let {nameEmployee,age,id_Company,id_CompanyOld} = req.body
        let addEmployees = await employeesModel.create({nameEmployee,age,id_Company,id_CompanyOld})
        if(id_Company){
            let dataCompany = await companyModel.findById(id_Company)
            console.log(dataCompany,"dataa company");
            let arrayIdEmployees =[]
            arrayIdEmployees = dataCompany.id_Employee
            arrayIdEmployees.push(addEmployees._id)
            let updateCompany = await companyModel.findByIdAndUpdate(id_Company,{id_Employee: arrayIdEmployees},{new:true})
        }
        else{
            let updateEmployee = await employeesModel.findByIdAndUpdate(addEmployees._id,{id_Company: id_Company},{new:true})
        }
        return "Add employees thanh cong"
}

const updateEmployees = async(req:Request,res:Response)=>{
    let {idEmployee,nameEmployee,age,id_Company,id_CompanyOld} = req.body
        let dataEmployee = await employeesModel.findById(idEmployee)
        let dataCompany = await companyModel.findById(id_Company)
        let arrayIdEmployee =dataCompany.id_Employee
        arrayIdEmployee.push(idEmployee)
        let updateCompany = await companyModel.findByIdAndUpdate(id_Company,{id_Employee:arrayIdEmployee},{new:true})
        let arrayIdCompanyOld = dataEmployee.id_CompanyOld
        arrayIdCompanyOld.push(dataEmployee.id_Company)
        let updateEmployee = await employeesModel.findByIdAndUpdate(idEmployee,{nameEmployee,age,id_Company:id_Company,id_CompanyOld:arrayIdCompanyOld},{new:true})
        return "Update Employees thanh cong"
}

const deleteEmployees = async(req:Request,res:Response)=>{
    let id_delete_employees = req.body.id_delete_employees
    let deleteEmployees = await employeesModel.findById(id_delete_employees)
    let dataCompany = await companyModel.findById(deleteEmployees.id_Company)
    let arrayIdEmployee = dataCompany.id_Employee
    let index = arrayIdEmployee.indexOf(id_delete_employees)
    arrayIdEmployee.splice(index,1)
    let updateCompany = await companyModel.findByIdAndUpdate(deleteEmployees.id_Company,{id_Employee: arrayIdEmployee},{new:true})
    let arrayIdCompanyOld = deleteEmployees.id_CompanyOld
    arrayIdCompanyOld.push(dataCompany._id)
    let updateEmployee = await employeesModel.findByIdAndUpdate(id_delete_employees,{id_Company: null,id_CompanyOld:arrayIdCompanyOld },{new:true})
    return "Delete Employess thanh cong"
}
export default {getEmployees,addEmployees,updateEmployees,deleteEmployees}