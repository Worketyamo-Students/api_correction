import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { HttpCode } from "../core/constants";
import chalk from "chalk";

const Prisma = new PrismaClient();

const UserControllers = {
    getOneUser: async (req: Request, res: Response) => {
        try {
            const users = await Prisma.user.findMany();
            res.json(users).status(HttpCode.OK);
        } catch (error) {
            console.error(error);
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    },
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const { id } = req.params; 
            const user = await Prisma.user.findUnique({ 
                where: { user_id: id }
            });
            if (!user) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'User not found' });
            }
            res.json(user).status(HttpCode.OK);
        } catch (error) {
            console.error(error);
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, age, password, role } = req.body

            if (!name || !email || !password)
                res.status(HttpCode.BAD_REQUEST).json({ "msg": "veillez remplir ces champs" })

            const Hash = await bcrypt.hash(password, 10)
            const user = await Prisma.user.create({
                data: {
                    name,
                    email,
                    password: Hash,
                    role,
                },
            })
            res.status(HttpCode.OK).json(user)
        } catch (error) {
            console.error(chalk.red(error));
        }
    },
    modifyUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { name, email, password, role } = req.body
            const updateUser = await Prisma.user.update({
                where: {
                    user_id: id
                },
                data: {
                    name,
                    email,
                    password,
                    role
                },
            })
            if (updateUser) {
                res.json({ msg : "les informations de l'utilisateur ont été modifiées avec succès" })
                console.log(updateUser)
            }
            else res.send({ msg: "impossible de modifier les infos du user" })
        } catch (error) {
            console.error(chalk.red(error));
        }
    },
    deleteoneUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const deleteUser = await Prisma.user.delete({
                where: {
                    user_id: id
                },
            })
            if (deleteUser) {
                res.json({ msg : "l'utilisateur a été supprimé avec succès" })
                console.log(deleteUser)
            }
            else res.send({ msg: "impossible de supprimer l'utilisateur" })
        } catch (error) {
            console.error(chalk.red(error));
        }
    },


};

export default UserControllers;
