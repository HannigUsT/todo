import { Atividade } from '@prisma/client';
import prisma from '../../../../database/prisma';
import { log } from '../../logger/manager';

export class TodoPersistence {
  public async createTodo(descricao: string): Promise<Atividade | undefined> {
    try {
      const createdTodo = await prisma.atividade.create({
        data: {
          descricao,
          concluido: false,
          dataCriacao: new Date(),
        },
      });
      return createdTodo;
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
      const editedTodo = await prisma.atividade.update({
        where: { id },
        data: { descricao },
      });
      return editedTodo;
    } catch (err) {
      log.errors.error(err);
      return undefined;
    }
  }

  public async deleteTodo(id: number): Promise<Atividade | undefined> {
    try {
      const deletedTodo = await prisma.atividade.delete({
        where: { id },
      });
      return deletedTodo;
    } catch (err) {
      log.errors.error(err);
      return undefined;
    }
  }

  public async finishTodo(id: number): Promise<Atividade | undefined> {
    try {
      const finishedTodo = await prisma.atividade.update({
        where: { id },
        data: {
          concluido: true,
          dataConclusao: new Date(),
        },
      });

      return finishedTodo;
    } catch (err) {
      log.errors.error(err);
      return undefined;
    }
  }

  public async getUnfinishedTodo(): Promise<Atividade[]> {
    try {
      const unfinishedTodo = prisma.atividade.findMany({
        where: { concluido: false },
        orderBy: { dataCriacao: 'desc' },
      });
      return unfinishedTodo;
    } catch (err) {
      log.errors.error(err);
      return [];
    }
  }

  public async getFinishedTodo(): Promise<Atividade[]> {
    try {
      const finishedTodo = await prisma.atividade.findMany({
        where: { concluido: true },
        orderBy: { dataConclusao: 'desc' },
      });
      return finishedTodo;
    } catch (err) {
      log.errors.error(err);
      return [];
    }
  }

  public async revertStatusTodo(id: number): Promise<Atividade | undefined> {
    try {
      const revertedStatusTodo = await prisma.atividade.update({
        where: { id },
        data: {
          concluido: false,
          dataConclusao: null,
        },
      });
      return revertedStatusTodo;
    } catch (err) {
      log.errors.error(err);
      return undefined;
    }
  }

  public async listAllTodo(): Promise<Atividade[]> {
    try {
      const todos = await prisma.atividade.findMany({
        orderBy: { dataCriacao: 'desc' },
      });
      return todos;
    } catch (err) {
      log.errors.error(err);
      return [];
    }
  }

  public async getTodoById(id: number): Promise<Atividade | undefined> {
    try {
      const todo = await prisma.atividade.findUnique({
        where: { id },
      });
      return todo ?? undefined;
    } catch (err) {
      log.errors.error(err);
      return undefined;
    }
  }
}
