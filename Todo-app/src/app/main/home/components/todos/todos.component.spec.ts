import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodosComponent } from './todos.component';
import { State, Todo } from './../../interface/todo.interface';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let storeMock: any;
  let dialogMock: any;

  const mockTodos: Todo[] = [
    {
      uid: '1',
      title: 'T1',
      description: 'desc 1',
      priority: 'LOW' as any,
      creationDate: new Date(),
      expiration: new Date(),
      state: State.PENDING,
      tags: [],
    },
    {
      uid: '2',
      title: 'T2',
      description: 'desc 2',
      priority: 'HIGH' as any,
      creationDate: new Date(),
      expiration: new Date(),
      state: State.DONE,
      tags: [],
    },
  ];

  beforeEach(async () => {
    storeMock = {
      // el componente hace this.store.subscribe(...)
      subscribe: (fn: (state: any) => void) => {
        fn({ filter: 'ALL', todos: mockTodos });
        return { unsubscribe: () => {} };
      },
      dispatch: jasmine.createSpy('dispatch'),
    };

    dialogMock = {
      open: jasmine.createSpy('open'),
    };

    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], // ignora mat-table, mat-paginator, etc.
    }).compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // llama ngOnInit -> getTodos()
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar dataSource con los todos provenientes del store', () => {
    expect(component.dataSource).toBeDefined();
    const data = component.dataSource.data;
    expect(data.length).toBe(2);
    expect(data[0].uid).toBe('1');
  });

  it('debe despachar deleteTodo al llamar deleteTodo', () => {
    component.deleteTodo('1');
    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('debe abrir el diálogo al llamar editTodo', () => {
    component.editTodo(mockTodos[0]);
    expect(dialogMock.open).toHaveBeenCalled();
  });
});
