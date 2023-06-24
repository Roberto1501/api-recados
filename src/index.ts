import express from "express"
import cors from 'cors'
import { appRoutes } from "./routes/app.routes";


const app = express();
app.use(express.json())

app.use(cors())

app.use( appRoutes())

app.listen(3333, ()=>{
    console.log("API is running")
})