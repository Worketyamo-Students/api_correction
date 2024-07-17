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

            const Hash = await bcrypt.hash(password, 12)
            const user = await Prisma.user.create({
                data: {
                    name,
                    email,
                    password: Hash,
                    role,
                },
            })
        } catch (error) {
            console.error(chalk.red(error));
        }
    }
};

export default UserControllers;
