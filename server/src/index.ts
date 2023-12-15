import express, { Request, Response } from 'express';
const app = express();
import { sequelize } from './config/dbConnect';
import employeeRoute from './routes/employeeRoute';
// const { Sequelize } = require("sequelize");
require('dotenv').config();
app.use(express.json());

const port: string | undefined = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});

app.use( employeeRoute);

sequelize
    .sync()
    .then(() => {
        console.log('PostgreSQL database connected');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });