import { ActionReducerMap } from "@ngrx/store";
import { Todo } from "../interface/todo.interface";
import { filterReducer } from "./filter/filter.reducer";
import { todoReducer } from "./todo.reducer";


export interface AppState {
  todos: Todo[],
  filter: string,
}


export const appReducers: ActionReducerMap<AppState> = {
  todos:todoReducer,
  filter: filterReducer
}
