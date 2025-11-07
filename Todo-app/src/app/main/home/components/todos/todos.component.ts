import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { Store } from '@ngrx/store';
import { AppState } from './../../ngrx/app.state';
import { State, Todo } from './../../interface/todo.interface';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { deleteTodo, updateTodo } from '../../ngrx/todo.actions';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],

})


export class TodosComponent implements OnInit {
  displayedColumns: string[] = ['title','priority','expiration','state','menu'];
  todos:Todo[]=[];
  dataSource!:MatTableDataSource<Todo>;
  todoEdit:Todo | null = null;

  colors: {[key:string]:string} = {
    "DONE":'primary',
    "PENDING":'accent',
  }

  // uids:string[]=[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private store:Store<AppState>
    ){}

  ngOnInit(): void {
    this.getTodos()
  }

  private getTodos(){
    this.store.subscribe(({filter,todos}) =>{
      let todosFilter  =  todos.filter((t)=>t.state===filter || filter === 'ALL');
       this.dataSource = new MatTableDataSource<Todo>(todosFilter)
       this.dataSource.paginator = this.paginator;
    });
  }

  deleteTodo(uid: string) {
    this.store.dispatch(deleteTodo({ uid }));
  }

  changeStatus(todo:Todo){
    let update_todo:Todo = {
      ...todo,
      state:todo.state === State.DONE ? State.PENDING:State.DONE
    }
   this.store.dispatch(updateTodo({todo:update_todo}))
  }

  editTodo(todo:Todo){
    this.dialog.open(TodoFormComponent,{data:todo})
  }

}
