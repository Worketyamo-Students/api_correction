import { Router } from "express";
import UserControllers from "../controllers/user.controllers";



// creation d'une constante qui vas contenir le Router
export const User = Router();

// route GET pour récupérer tous les utilisateurs
User.get('/', UserControllers.getOneUser)
User.get('/', UserControllers.getAllUsers)
User.post('/', UserControllers.createUser)