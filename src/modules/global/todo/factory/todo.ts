import {TodoPersistence} from '../persistence';
import {TodoService} from '../services';

export const makeTodoConsumer = (): TodoService => {
    const TodoP = new TodoPersistence();
    return new TodoService(TodoP);
};
