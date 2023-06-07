import express from "express"
import { UserController } from "./controllers/User.controller";

const app = express();
app.use(express.json())

app.post("/user", new UserController().CreateUser )







app.listen(3333, ()=>{
    console.log("API is running")
})