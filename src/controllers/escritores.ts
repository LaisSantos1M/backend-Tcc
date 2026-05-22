import type { Request, Response } from "express";

import { prisma } from "../../config/prisma.js";
import primaErrorCodes from "../../config/prismaErrorCode.json" with { type: "json" };
import { Prisma } from "../../generated/prisma/client.js";
import bcrypt from "bcrypt";


export default {
      list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.escritor.findMany();
            return response.status(200).json(users);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unknown error");
        }
    },



    create: async (request: Request, response: Response) => {
        try {
            const { nome, email, senha } = request.body;
            const user = await prisma.escritor.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!)
                },
            });
            return response.status(201).json(user);
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }

    },


    
    getById: async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        if (!request.params.id || Number.isNaN(id)) {
            return response.status(400).json("Invalid id");
        }

        try {
            const user = await prisma.escritor.findUnique({
                where: { id },
            });
            return response.status(200).json(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }

    },


    update: async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        if (!request.params.id || Number.isNaN(id)) {
            return response.status(400).json("Invalid id");
        }

        try {
            const { nome, email, senha } = request.body;
            const user = await prisma.escritor.update({
                data: {
                    nome,
                    email,
                    senha,
                    
                },
                where: { id },
            });
            return response.status(200).json(user);
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }

    },

    delete: async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        if (!request.params.id || Number.isNaN(id)) {
            return response.status(400).json("Invalid id");
        }

        try {
            const user = await prisma.escritor.delete({
                where: { id },
            });
            return response.status(200).json(user);
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }


    },

};