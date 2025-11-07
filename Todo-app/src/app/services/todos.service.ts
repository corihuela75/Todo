import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../main/home/interface/todo.interface';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodosService {

  private allTodos: Todo[] = [];
  private todos = new BehaviorSubject<Todo[]>([]);

  private apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  getTodosObs() {
    return this.todos.asObservable();
  }

  loadTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe((data) => {
      this.allTodos = data;
      this.todos.next(this.allTodos);
    });
  }

  // ✅ Para Effects → devuelve Observable
  loadTodosFromApi() {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // ✅ Para Effects → devuelve Observable<Todo>
  createTodoApi(todo: Partial<Todo>) {
    return this.http.post<{ todo: Todo }>(this.apiUrl, todo)
      .pipe(map(res => res.todo));
  }

  // ✅ Para Effects → devuelve Observable<Todo>
  updateTodoApi(todo: Partial<Todo> & { uid: string }) {
    return this.http.put<{ todo: Todo }>(`${this.apiUrl}/${todo.uid}`, todo)
      .pipe(map(res => res.todo));
  }

  deleteTodoApi(uid: string) {
    return this.http.delete(`${this.apiUrl}/${uid}`);
  }


  // ✅ Sincronización local (si también usás el BehaviorSubject)
  createTodo(todo: Partial<Todo>) {
    this.createTodoApi(todo).subscribe((newTodo) => {
      this.allTodos.unshift(newTodo);
      this.todos.next(this.allTodos);
    });
  }

  updateTodo(todo: Partial<Todo> & { uid: string }) {
    this.updateTodoApi(todo).subscribe((updated) => {
      this.allTodos = this.allTodos.map(t => t.uid === updated.uid ? updated : t);
      this.todos.next(this.allTodos);
    });
  }

  deleteTodo(uid: string) {
    return this.http.delete(`${this.apiUrl}/${uid}`).subscribe(() => {
      this.allTodos = this.allTodos.filter(t => t.uid !== uid);
      this.todos.next(this.allTodos);
    });
  }

  filterByText(value: string | null) {
    if (!value) return this.todos.next(this.allTodos);
    this.todos.next(this.allTodos.filter(todo => todo.description.includes(value)));
  }
}
