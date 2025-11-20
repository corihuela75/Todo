import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TodoFormComponent } from './todo-form.component';
import { Priority, State, Todo } from '../../interface/todo.interface';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let dialogRefMock: any;
  let storeMock: any;

  const existingTodo: Todo = {
    uid: '123',
    title: 'Todo existente',
    description: 'Descripción existente',
    priority: Priority.HIGH,
    creationDate: new Date(),
    expiration: new Date(),
    state: State.PENDING,
    tags: ['tag1', 'tag2'],
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,

        // Material real
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatChipsModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();
  });

  it('debe crearse con valores por defecto cuando no hay data', () => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.todoForm.value.title).toBe('');
    expect(component.chips.length).toBe(0);
  });

  it('debe cargar datos cuando MAT_DIALOG_DATA tiene un todo', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: existingTodo });

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.chips).toEqual(['tag1', 'tag2']);
    expect(component.todoForm.value.title).toBe(existingTodo.title);
  });

  it('debe llamar close() al finalizar onSubmit válido', () => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.todoForm.setValue({
      title: 'Nuevo todo válido',
      description: 'Descripción suficientemente larga',
      priority: Priority.MEDIUM,
      expiration: new Date(),
      state: State.PENDING,
      tags: '',
    });

    component.onSubmit();

    expect(storeMock.dispatch).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
