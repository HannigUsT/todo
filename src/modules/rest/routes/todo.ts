import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { todoManager } from '../../global/todo/manager';
import { descricaoSchema, idSchema } from '../../global/todo/validation';
import { authenticate, authorize } from '../middleware/authorization';

export default (router: Router): void => {
  // Create todo
  router.post(
    '/todo/create',
    authenticate,
    authorize(['create_todo']),
    async (req: Request, res: Response) => {
      try {
        const { descricao } = req.body;

        const descricaoValidated = descricaoSchema.parse(descricao);

        const createdTodo = await todoManager.create(descricaoValidated, req);

        if (typeof createdTodo === 'undefined') {
          throw new Error(req.t('todo.create_error'));
        }

        return res.status(201).json({
          status: 'success',
          data: createdTodo,
        });
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res
            .status(400)
            .json({ status: 'error', data: formattedErrors });
        }
        return res
          .status(500)
          .json({ status: 'error', data: req.t('error.server_error') });
      }
    },
  );

  // Edit todo
  router.put(
    '/todo/edit',
    authenticate,
    authorize(['edit_todo']),
    async (req: Request, res: Response) => {
      try {
        const { id, descricao } = req.body;

        const idValidated = idSchema.parse(id);

        const descricaoValidated = descricaoSchema.parse(descricao);

        const editedTodo = await todoManager.edit(
          idValidated,
          descricaoValidated,
          req,
        );

        if (typeof editedTodo === 'string') {
          return res.status(400).json({
            status: 'error',
            data: req.t('todo.not_found'),
          });
        }

        if (!editedTodo) {
          throw new Error(req.t('todo.edit_error'));
        }

        return res.status(202).json({
          status: 'success',
          data: editedTodo,
        });
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res
            .status(400)
            .json({ status: 'error', data: formattedErrors });
        }
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );

  // Delete todo
  router.delete(
    '/todo/delete/:id',
    authenticate,
    authorize(['delete_todo']),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const idValidated = idSchema.parse(Number(id));

        const deletedTodo = await todoManager.delete(idValidated, req);

        if (typeof deletedTodo === 'string') {
          return res.status(404).json({
            status: 'error',
            data: req.t('todo.not_found'),
          });
        }

        if (typeof deletedTodo === 'undefined') {
          throw new Error(req.t('todo.delete_error'));
        }

        return res.status(200).json({
          status: 'success',
          data: req.t('todo.delete_success'),
        });
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res
            .status(400)
            .json({ status: 'error', data: formattedErrors });
        }
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );

  // Finish todo
  router.put(
    '/todo/finish/:id',
    authenticate,
    authorize(['finish_todo']),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const idValidated = idSchema.parse(Number(id));

        const finished = await todoManager.finish(idValidated, req);

        if (typeof finished === 'string') {
          return res.status(404).json({
            status: 'error',
            data: finished,
          });
        }

        if (!finished) {
          throw new Error(req.t('todo.finish_error'));
        }

        return res.status(200).json({
          status: 'success',
          data: req.t('todo.finish_success'),
        });
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res
            .status(400)
            .json({ status: 'error', data: formattedErrors });
        }
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );

  // Get all unfinished todo
  router.get(
    '/todo/unfinished',
    authenticate,
    authorize(['unfineshed_todo']),
    async (req: Request, res: Response) => {
      try {
        const unfinished = await todoManager.unfinished();

        return res.status(200).json({
          status: 'success',
          data: unfinished,
        });
      } catch (err: unknown) {
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );

  // Get all finished todo
  router.get(
    '/todo/finished',
    authenticate,
    authorize(['finished_todo']),
    async (req: Request, res: Response) => {
      try {
        const finished = await todoManager.finished();

        return res.status(200).json({
          status: 'success',
          data: finished,
        });
      } catch (err: unknown) {
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );

  // Revert todo status
  router.put(
    '/todo/revert/:id',
    authenticate,
    authorize(['revert_todo']),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const idValidated = idSchema.parse(Number(id));

        const reverted = await todoManager.revert(idValidated, req);

        if (typeof reverted === 'string') {
          return res.status(404).json({
            status: 'error',
            data: reverted,
          });
        }

        if (!reverted) {
          throw new Error(req.t('todo.revert_error'));
        }

        return res.status(200).json({
          status: 'success',
          data: req.t('todo.revert_success'),
        });
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res
            .status(400)
            .json({ status: 'error', data: formattedErrors });
        }
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );

  // List all todo
  router.get(
    '/todo/list',
    authenticate,

    authorize(['list_todo']),
    async (req: Request, res: Response) => {
      try {
        const reverted = await todoManager.list();

        return res.status(200).json({
          status: 'success',
          data: reverted,
        });
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res
            .status(400)
            .json({ status: 'error', data: formattedErrors });
        }
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );

  // Get todo by id
  router.get(
    '/todo/:id',
    authenticate,
    authorize(['get_todo']),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const idValidated = idSchema.parse(Number(id));

        const todo = await todoManager.getById(idValidated);

        if (!todo) {
          return res.status(404).json({
            status: 'error',
            data: req.t('todo.not_found'),
          });
        }

        return res.status(200).json({
          status: 'success',
          data: todo,
        });
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res
            .status(400)
            .json({ status: 'error', data: formattedErrors });
        }
        return res.status(500).json({
          status: 'error',
          data: req.t('error.server_error'),
        });
      }
    },
  );
};
