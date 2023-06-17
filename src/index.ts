import express from "express"
import { UserController } from "./controllers/User.controller";
import { RecadoController } from "./controllers/Recado.controller";

const app = express();
app.use(express.json())
//user
app.post("/register", new UserController().CreateUser )

app.post("/login", new UserController().login )

app.put("/user-new-password", new UserController().updateUserPassword)

app.delete("/user-delete",new UserController().deleteUser)


//Recado

app.post("/user/:id/recado", new RecadoController().createRecado)

app.get("/user/:userId/recado",new RecadoController().getAllRecado)
app.put("/user/:userId/recado/:id",new RecadoController().updateRecado)
app.delete("/user/:userId/recado/:id",new RecadoController().deleteRecado)







app.listen(3333, ()=>{
    console.log("API is running")
})