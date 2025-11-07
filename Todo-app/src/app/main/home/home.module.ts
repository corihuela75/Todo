import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TodosComponent } from './components/todos/todos.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TodosHeaderComponent } from './components/todos-header/todos-header.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodosComponent,
    FooterComponent,
    TodosHeaderComponent,
    TodoFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
