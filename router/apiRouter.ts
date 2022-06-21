import express from 'express'
import controllerCompany from '../controllers/companyController'
import controllerEmployees from '../controllers/employeesController'
const apiRouter:express.Router = express.Router();

//get data company


apiRouter.get('/company',controllerCompany.getCompany)

//add data company
apiRouter.post('/company',controllerCompany.addCompany)

//delete data company
apiRouter.delete('/company',controllerCompany.deleteCompany)

//update data company
apiRouter.put('/company',controllerCompany.updateCompany)

//get data employees
apiRouter.get('/employees',controllerEmployees.getEmployees)

//add data employees
apiRouter.post('/employees',controllerEmployees.addEmployees)

//delete data employees
apiRouter.delete('/employees',controllerEmployees.deleteEmployees)

//update data employees
apiRouter.put('/employees',controllerEmployees.updateEmployees)


export default apiRouter