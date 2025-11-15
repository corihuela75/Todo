import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TodosHeaderComponent } from './todos-header.component';
import { State } from '../../interface/todo.interface';
import { setFilter } from '../../ngrx/filter/filter.action';

describe('TodosHeaderComponent', () => {
  let component: TodosHeaderComponent;
  let fixture: ComponentFixture<TodosHeaderComponent>;
  let storeMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of(State.ALL)),
      dispatch: jasmine.createSpy('dispatch'),
    };

    dialogMock = {
      open: jasmine.createSpy('open'),
    };

    await TestBed.configureTestingModule({
      declarations: [TodosHeaderComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit -> getState()
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el state con el valor del store (State.ALL)', () => {
    expect(storeMock.select).toHaveBeenCalledWith('filter');
    expect(component.state).toBe(State.ALL);
  });

  it('debe cambiar el filtro y hacer dispatch cuando se llama changeFilterStatus', () => {
    component.state = State.ALL;

    component.changeFilterStatus();

    expect(component.state).toBe(State.DONE);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      setFilter({ filter: State.DONE })
    );
  });

  it('debe abrir el diálogo al llamar openDialog', () => {
    component.openDialog();
    expect(dialogMock.open).toHaveBeenCalled();
  });
});
