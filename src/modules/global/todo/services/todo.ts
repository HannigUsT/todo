import { Atividade } from '@prisma/client';
import { Request } from 'express';
import { log } from '../../logger/manager';
import { TodoPersistence } from '../persistence';

export class TodoService {
  constructor(private readonly todoPersistence: TodoPersistence) {}

  public async create(
    descricao: string,
    req: Request,
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

      const deleted = await this.todoPersistence.deleteTodo(id);

      return deleted;
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

      const finished = await this.todoPersistence.finishTodo(id);

      return finished;
    } catch (err) {
      log.errors.error(err);
      return undefined;
    }
  }

  public async unfinished(): Promise<Atividade[]> {
    try {
      const unfinished = await this.todoPersistence.getUnfinishedTodo();
      return unfinished;
    } catch (err) {
      log.errors.error(err);
      return [];
    }
  }

  public async finished(): Promise<Atividade[]> {
    try {
      const finished = await this.todoPersistence.getFinishedTodo();
      return finished;
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
      const todoExists = this.todoPersistence.getTodoById(id);

      if (!todoExists) {
        return req.t('todo.not_found');
      }

      const reverted = await this.todoPersistence.revertStatusTodo(id);

      return reverted;
    } catch (err) {
      log.errors.error(err);
      return undefined;
    }
  }

  public async list(): Promise<Atividade[]> {
    try {
      const todos = await this.todoPersistence.listAllTodo();
      return todos;
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
