import {Model,DataTypes} from 'sequelize'
import { sequelize } from "../config/dbConnect";

export class Employee extends Model{
    public id!:number;
    public name!:string;
    public surname!:string;
    public email!:string;
    public phoneNumber!:string;
    public address!:string;
    public job!: string;
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        job: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        tableName: 'Employee',
    }
);