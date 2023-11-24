// old nodejs version
// const express = require('express');
// now nodejs supports AS6 syntax so we directly use import here.
import express from 'express';
import Connection from './database/db.js';
import Route from './routes/route.js';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json({ entended: true }))
app.use(express.urlencoded({ extended: true }));
app.use("/", Route);

Connection(); 

const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))