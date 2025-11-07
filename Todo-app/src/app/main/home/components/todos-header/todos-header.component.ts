import { TodoFormComponent } from './../todo-form/todo-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { State } from '../../interface/todo.interface';
import { AppState } from '../../ngrx/app.state';
import { Store } from '@ngrx/store';
import { setFilter } from '../../ngrx/filter/filter.action';

@Component({
  selector: 'app-todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.css']
})
export class TodosHeaderComponent implements OnInit {

  state!:string;
  constructor(public dialog: MatDialog,
    private store: Store<AppState>
    ){}

    ngOnInit(): void {
      this.getState()
    }

  private getState(){
    this.store.select('filter').subscribe(res => this.state = res)
  }

  openDialog(){
    this.dialog.open(TodoFormComponent)
  }

  changeFilterStatus(){
    if(this.state == State.ALL) this.state = State.DONE
    else if (this.state == State.DONE) this.state = State.PENDING
    else this.state = State.ALL
    this.store.dispatch(setFilter({filter:this.state}))
  }

}
