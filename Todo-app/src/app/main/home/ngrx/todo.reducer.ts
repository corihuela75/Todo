import { createReducer, on } from '@ngrx/store';
import { Todo } from '../interface/todo.interface';
import { 
  loadTodosSuccess, 
  createTodoSuccess, 
  updateTodoSuccess, 
  deleteTodoSuccess
} from './todo.actions';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,

  // Se carga la lista completa por primera vez
  on(loadTodosSuccess, (_, { todos }) => [...todos]),

  // Se agrega una nueva tarea
  on(createTodoSuccess, (state, { todo }) => [todo, ...state]),

  // Se actualiza una tarea
  on(updateTodoSuccess, (state, { todo }) =>
    state.map(t => t.uid === todo.uid ? todo : t)
  ),

  // Se elimina una tarea
  on(deleteTodoSuccess, (state, { uid }) => state.filter(t => t.uid !== uid)),

);
