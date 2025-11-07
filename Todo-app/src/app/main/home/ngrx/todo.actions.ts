// todo.actions.ts
import { createAction, props } from "@ngrx/store";
import { Todo } from "../interface/todo.interface";

export const initializate = createAction('[Todo[]] initializate');
export const loadTodosSuccess = createAction('[Todo[]] loadSuccess', props<{ todos: Todo[] }>());

export const createTodo = createAction('[Todo] create', props<{ todo: Partial<Todo> }>());
export const createTodoSuccess = createAction('[Todo] createSuccess', props<{ todo: Todo }>());

export const updateTodo = createAction('[Todo] update', props<{ todo: Todo }>());
export const updateTodoSuccess = createAction('[Todo] updateSuccess', props<{ todo: Todo }>());

export const deleteTodo = createAction('[Todo] delete', props<{ uid: string }>());
export const deleteTodoSuccess = createAction('[Todo] deleteSuccess', props<{ uid: string }>());



export const filterByStatus = createAction(
  '[Filtro] filterByStatus',
  props<{filter:string}>()
);
