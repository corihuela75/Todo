import { Component, Inject, OnInit } from '@angular/core';
import { Priority, State, Todo } from '../../interface/todo.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {v4 } from 'uuid';
import { Store } from '@ngrx/store';
import { createTodo, updateTodo } from '../../ngrx/todo.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  chips: string[] = [];
  todoForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(100)]],
    description: ['', [Validators.required,Validators.minLength(20),Validators.maxLength(200)]],
    priority: [Priority.MEDIUM, [Validators.required]],
    expiration: ['', [Validators.required]],
    state: [State.PENDING, [Validators.required]],
    tags: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private fb: FormBuilder,
    private store:Store
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    if(this.data){
      const {tags,uid,creationDate,...others} = this.data;
      this.chips = tags;
      this.todoForm.setValue({tags:'',...others});
    }
  }

  addTag(tag:string):void{
    if(!tag) return;
    this.chips.push(tag);
    this.todoForm.controls['tags'].setValue('')
  }

  deleteChip(index:number){
    this.chips.splice(index,1)
  }

  onSubmit(){
    if(this.todoForm.invalid) return;
    const formData = this.todoForm.value
    if(this.data){
      const {uid,creationDate}=this.data;
      let updated:Todo ={
        uid,
        creationDate,
        tags:this.chips,
        ...formData
      }
      this.store.dispatch(updateTodo({todo:updated}));
    } else{
      let newTodo:Todo = {
        uid: v4(),
        tags:this.chips,
        creationDate: new Date(),
        ...formData
      }
        this.store.dispatch(createTodo({todo:newTodo}))
      }
      this.close()
  }

  close(){
    this.dialogRef.close()
  }
}
