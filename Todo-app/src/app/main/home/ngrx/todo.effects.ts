import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { TodosService } from '../../../services/todos.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class TodoEffects {

  // Cargar todos desde backend
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.initializate),
      mergeMap(() =>
        this.todosService.loadTodosFromApi()
          .pipe(map(todos => TodoActions.loadTodosSuccess({ todos })))
      )
    )
  );

  // Crear tarea
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      mergeMap(({ todo }) =>
        this.todosService.createTodoApi(todo)
          .pipe(map(newTodo => TodoActions.createTodoSuccess({ todo: newTodo })))
      )
    )
  );

  // Actualizar tarea
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ todo }) =>
        this.todosService.updateTodoApi(todo)
          .pipe(map(updated => TodoActions.updateTodoSuccess({ todo: updated })))
      )
    )
  );
// Eliminar tarea
  deleteTodo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.deleteTodo),
    mergeMap(({ uid }) =>
      this.todosService.deleteTodoApi(uid).pipe(
        map(() => TodoActions.deleteTodoSuccess({ uid }))
      )
    )
  )
);


  constructor(
    private actions$: Actions,
    private todosService: TodosService
  ) {}
}
