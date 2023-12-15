import express from 'express'
import { deleteEmployee, getAllEmployees, saveEmployee, updatedEmployee } from '../controllers/employeeControllers';
const employeeRoute = express.Router()

const uri: string = "/employees";

employeeRoute.get(`${uri}/get/all`,getAllEmployees)
employeeRoute.post(`${uri}/post/save`,saveEmployee)
employeeRoute.put(`${uri}/put/:id`,updatedEmployee)
employeeRoute.delete(`${uri}/delete/:id`,deleteEmployee)

export default employeeRoute;