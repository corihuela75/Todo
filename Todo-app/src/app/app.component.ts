import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { initializate } from './main/home/ngrx/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoApp';

  constructor(private store: Store) {}

  ngOnInit() {
    // 👇 Esto dispara el effect que carga los todos desde el backend
    this.store.dispatch(initializate());
  }
}
