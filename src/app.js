const express = require('express');
const app = express();
const cors = require ('cors');
const bodyParser = require ('body-parser');
const database = require('./models/database');

database.connect()


const index = require('./routes/index')
const criancas = require('./routes/criancasRoutes')

app.use(cors())
app.use( bodyParser.json());
app.use('/', index);
app.use ('//', criancas);




module.exports = app
    
