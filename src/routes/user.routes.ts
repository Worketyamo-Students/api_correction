import { Router } from "express";
import UserControllers from "../controllers/user.controllers";
import Uservalidate from "../middlewares/user.mid";




// creation d'une constante qui vas contenir le Router
export const User = Router();
// route GET pour récupérer un utilisateur par son id
User.get('/:id', UserControllers.getOneUser)

// route GET pour récupérer tous les utilisateurs
User.get('/', UserControllers.getAllUsers)

// route Post pour creer un utilisateur
User.post('/', Uservalidate.validation ,UserControllers.createUser)

// route Put pour modifier les informations d'un utilisateur par son id
User.put('/:id', UserControllers.modifyUser) 

User.delete('/:id', UserControllers.deleteoneUser)