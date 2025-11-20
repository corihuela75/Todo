import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { Todo, Priority, State } from '../main/home/interface/todo.interface';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });

    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loadTodos debe hacer GET y actualizar el BehaviorSubject', () => {
    const mockTodos: Todo[] = [
      {
        uid: '1',
        title: 'T1',
        description: 'desc 1',
        priority: Priority.LOW,
        creationDate: new Date(),
        expiration: new Date(),
        state: State.PENDING,
        tags: [],
      },
      {
        uid: '2',
        title: 'T2',
        description: 'desc 2',
        priority: Priority.HIGH,
        creationDate: new Date(),
        expiration: new Date(),
        state: State.DONE,
        tags: [],
      },
    ];

    let latest: Todo[] = [];
    service.getTodosObs().subscribe((todos) => {
      latest = todos;
    });

    service.loadTodos();

    const req = httpMock.expectOne('http://localhost:3000/api/todos');
    expect(req.request.method).toBe('GET');

    req.flush(mockTodos);

    expect(latest.length).toBe(2);
    expect(latest[0].uid).toBe('1');
  });

  it('createTodoApi debe hacer POST y devolver solo res.todo', () => {
    const partial: Partial<Todo> = {
      title: 'Nuevo',
      description: 'algo',
    };

    const mockResponse = {
      todo: {
        uid: '123',
        title: 'Nuevo',
        description: 'algo',
        priority: Priority.LOW,
        creationDate: new Date(),
        expiration: new Date(),
        state: State.PENDING,
        tags: [],
      } as Todo,
    };

    let result: Todo | undefined;

    service.createTodoApi(partial).subscribe((todo) => {
      result = todo;
    });

    const req = httpMock.expectOne('http://localhost:3000/api/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(partial);

    req.flush(mockResponse);

    expect(result).toBeDefined();
    expect(result!.uid).toBe('123');
    expect(result!.title).toBe('Nuevo');
  });

  it('filterByText debe filtrar por description usando los datos cargados', () => {
    const mockTodos: Todo[] = [
      {
        uid: '1',
        title: 'T1',
        description: 'hola mundo',
        priority: Priority.LOW,
        creationDate: new Date(),
        expiration: new Date(),
        state: State.PENDING,
        tags: [],
      },
      {
        uid: '2',
        title: 'T2',
        description: 'chau mundo',
        priority: Priority.HIGH,
        creationDate: new Date(),
        expiration: new Date(),
        state: State.DONE,
        tags: [],
      },
    ];

    let latest: Todo[] = [];
    service.getTodosObs().subscribe((t) => (latest = t));

    // Cargamos todos primero
    service.loadTodos();
    const req = httpMock.expectOne('http://localhost:3000/api/todos');
    req.flush(mockTodos);

    // Ahora filtramos
    service.filterByText('hola');

    expect(latest.length).toBe(1);
    expect(latest[0].description).toContain('hola');

    // Si limpiamos el filtro, deben volver todos
    service.filterByText(null);
    expect(latest.length).toBe(2);
  });
});
