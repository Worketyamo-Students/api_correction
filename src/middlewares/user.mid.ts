import { ExpressValidator, body, validationResult } from "express-validator";
import { Response, Request ,NextFunction } from "express";
import { HttpCode } from "../core/constants";


const Uservalidate = {
    validation : [
        body('email')
          .isEmail()
          .withMessage('Veuillez entrer une adresse email valide'),
        body('password')
          .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
          })
          .withMessage('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'),
        (req: Request, res: Response, next: NextFunction) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(HttpCode.BAD_REQUEST).json({ errors: errors.array() });
          }
          next();
        }
    ]
}

export default Uservalidate;