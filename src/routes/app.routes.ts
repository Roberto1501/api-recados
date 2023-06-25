import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { UserMiddleware } from "../middlewares/User.middleare";
import { RecadoMiddleware } from "../middlewares/recado.middleware";
import { RecadoController } from "../controllers/Recado.controller";




export const appRoutes = () =>{
    const app = Router();

    // users
app.post("/register", new UserMiddleware().validateUserCreation, new UserController().CreateUser )
app.post("/login", new UserMiddleware().ValidateUserExists, new UserController().login )
app.get("/get-all", new UserMiddleware().getAllUsers, new UserController().getUser )
app.delete("/:userId/user-delete", new UserMiddleware().Delete,new UserController().deleteUser)
app.put("/:userId/user-new-password",new UserMiddleware().passwordUpdateLogged, new UserController().updateUserPassword)


// recados
app.post("/user/:userId/recado",new RecadoMiddleware().validatingRecadoCreation, new RecadoController().createRecado)

app.get("/user/:userId/recado",new RecadoMiddleware().checkUserId,new RecadoController().getAllRecado)
app.put("/user/:userId/recado/:id",new RecadoMiddleware().checkRecadoId,new RecadoMiddleware().checkRecadoId ,new RecadoController().updateRecado)
app.delete("/user/:userId/recado/:id",new RecadoMiddleware().checkRecadoId,new RecadoMiddleware().checkRecadoId,new RecadoController().deleteRecado)
   
return app
}