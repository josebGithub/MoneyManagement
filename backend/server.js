import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routesHandler from "./routes/handler.js";


const app = express()


//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());

mongoose.connect('mongodb+srv://chanFamilyStatements:chan09WZ@cluster0.n0mu27z.mongodb.net/chanFamilyStatements?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));  
app.use('/',routesHandler);

app.listen(process.env.PORT||3001, () => {console.log("Server started on port 3001")})