import {Atividade} from '@prisma/client';
import {Request} from 'express';
import {log} from '../../logger/manager';
import {TodoPersistence} from '../persistence';

export class TodoService {
    constructor(private readonly todoPersistence: TodoPersistence) {
    }

    public async create(
        descricao: string
    ): Promise<Atividade | undefined> {
        try {
            const created = await this.todoPersistence.createTodo(descricao);

            if (!created) {
                return undefined;
            }

            return created;
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async edit(
        id: number,
        descricao: string,
        req: Request,
    ): Promise<Atividade | undefined | string> {
        try {
            const todoExists = await this.todoPersistence.getTodoById(id);

            if (!todoExists) {
                return req.t('todo.not_found');
            }

            const edited = await this.todoPersistence.editTodo(id, descricao);

            if (!edited) {
                return undefined;
            }

            return edited;
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async delete(
        id: number,
        req: Request,
    ): Promise<Atividade | undefined | string> {
        try {
            const todoExists = this.todoPersistence.getTodoById(id);

            if (!todoExists) {
                return req.t('todo.not_found');
            }

            return await this.todoPersistence.deleteTodo(id);
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async finish(
        id: number,
        req: Request,
    ): Promise<Atividade | undefined | string> {
        try {
            const todoExists = this.todoPersistence.getTodoById(id);

            if (!todoExists) {
                return req.t('todo.not_found');
            }

            return await this.todoPersistence.finishTodo(id);
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async unfinished(): Promise<Atividade[]> {
        try {
            return await this.todoPersistence.getUnfinishedTodo();
        } catch (err) {
            log.errors.error(err);
            return [];
        }
    }

    public async finished(): Promise<Atividade[]> {
        try {
            return await this.todoPersistence.getFinishedTodo();
        } catch (err) {
            log.errors.error(err);
            return [];
        }
    }

    public async revert(
        id: number,
        req: Request,
    ): Promise<Atividade | undefined | string> {
        try {
            const todoExists = await this.todoPersistence.getTodoById(id);

            if (!todoExists) {
                return req.t('todo.not_found');
            }

            return await this.todoPersistence.revertStatusTodo(id);
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }

    public async list(): Promise<Atividade[]> {
        try {
            return await this.todoPersistence.listAllTodo();
        } catch (err) {
            log.errors.error(err);
            return [];
        }
    }

    public async getById(id: number): Promise<Atividade | undefined> {
        try {
            const todo = this.todoPersistence.getTodoById(id);
            return todo ?? undefined;
        } catch (err) {
            log.errors.error(err);
            return undefined;
        }
    }
}
