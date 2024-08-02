import {Atividade} from '@prisma/client';
import prisma from '../../../../database/prisma';
import {log} from '../../logger/manager';

export class TodoPersistence {
    public async createTodo(description: string): Promise<Atividade | undefined> {
        try {
            return await prisma.atividade.create({
                data: {
                    descricao: description,
                    concluido: false,
                    dataCriacao: new Date(),
                },
            });
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async editTodo(
        id: number,
        descricao: string,
    ): Promise<Atividade | undefined> {
        try {
            return await prisma.atividade.update({
                where: {id},
                data: {descricao},
            });
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async deleteTodo(id: number): Promise<Atividade | undefined> {
        try {
            return await prisma.atividade.delete({
                where: {id},
            });
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async finishTodo(id: number): Promise<Atividade | undefined> {
        try {
            return await prisma.atividade.update({
                where: {id},
                data: {
                    concluido: true,
                    dataConclusao: new Date(),
                },
            });
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async getUnfinishedTodo(): Promise<Atividade[]> {
        try {
            return prisma.atividade.findMany({
                where: {concluido: false},
                orderBy: {dataCriacao: 'desc'},
            });
        } catch (err) {
            log.errors.error(err);
            return [];
        }
    }

    public async getFinishedTodo(): Promise<Atividade[]> {
        try {
            return await prisma.atividade.findMany({
                where: {concluido: true},
                orderBy: {dataConclusao: 'desc'},
            });
        } catch (err) {
            log.errors.error(err);
            return [];
        }
    }

    public async revertStatusTodo(id: number): Promise<Atividade | undefined> {
        try {
            return await prisma.atividade.update({
                where: {id},
                data: {
                    concluido: false,
                    dataConclusao: null,
                },
            });
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async listAllTodo(): Promise<Atividade[]> {
        try {
            return await prisma.atividade.findMany({
                orderBy: {dataCriacao: 'desc'},
            });
        } catch (err) {
            log.errors.error(err);
            return [];
        }
    }

    public async getTodoById(id: number): Promise<Atividade | undefined> {
        try {
            const todo = await prisma.atividade.findUnique({
                where: {id},
            });
            return todo ?? undefined;
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }
}
