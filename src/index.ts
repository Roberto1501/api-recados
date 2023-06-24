import express from "express"
import { UserController } from "./controllers/User.controller";
import { RecadoController } from "./controllers/Recado.controller";
import cors from 'cors'
import { UserMiddleware } from "./middlewares/User.middleare";


const app = express();
app.use(express.json())

app.use(cors())

//user
app.post("/register", new UserMiddleware().validateUserCreation, new UserController().CreateUser )
app.post("/login", new UserMiddleware().ValidateUserExists, new UserController().login )
app.get("/get-all", new UserMiddleware().getAllUsers, new UserController().getUser )
app.delete("/user-delete", new UserMiddleware().Delete,new UserController().deleteUser)



app.put("/user-new-password", new UserController().updateUserPassword)



//Recado

app.post("/user/:id/recado", new RecadoController().createRecado)

app.get("/user/:userId/recado",new RecadoController().getAllRecado)
app.put("/user/:userId/recado/:id",new RecadoController().updateRecado)
app.delete("/user/:userId/recado/:id",new RecadoController().deleteRecado)







app.listen(3333, ()=>{
    console.log("API is running")
})