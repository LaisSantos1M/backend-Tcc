import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client";


export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.livros.findMany({
                include: { escritor: true }
            });
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
            const { titulo, ano, editora, } = request.body;
            console.log(titulo, ano,  editora)
            const user = await prisma.livros.create({
                data: {
                    titulo,
                    ano,
                    editora,

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
        try {
            const user = await prisma.livros.findUnique({
                where: { id: +request.params.id },
                include: { escritor: true }
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
        try {
            const { id } = request.params;
            const { titulo, editora, ano } = request.body;
            const user = await prisma.livros.update({
                data: {
                    titulo,
                    ano,
                    editora,
                },
                where: { id: +id },
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

    }, delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.livros.delete({

                where: { id: + id }

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


    }, matricular: async (request: Request, response: Response) => {
        try {
            const { livroId, escritorId } = request.body;

            const livro = await prisma.livros.update({
                where: { id: +livroId },
                data: {
                    escritor: {
                        connect: { id: + escritorId }
                    }
                },
                include: { escritor: true }
            });

            return response.status(200).json(livro);
        } catch (e) {
            return response.status(500).json("Erro ao matricular");
        }
    },
     desmatricular: async (request: Request, response: Response) => {
        try {
            const { livroId, escritorId } = request.body;

            const livro = await prisma.livros.update({
                where: { id: +livroId },
                data: {
                    escritor: {
                        disconnect: { id: +escritorId }
                    }
                },
                include: { escritor: true }
            });

            return response.status(200).json(livro);
        } catch (e) {
            return response.status(500).json("Erro ao desmatricular");
        }
    }



};