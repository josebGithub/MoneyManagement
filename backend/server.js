import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routesHandler from "./routes/handler.js";
import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'development') {
    dotenv.config();
  }

//create express server
const app = express()


//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

//middleware
app.use(cors())

//this allows us to pass json
app.use(express.json());

app.use(express.urlencoded({extended:true}));  
app.use('/',routesHandler);

app.listen(process.env.PORT||3001, () => {console.log("Server started on port 3001")})