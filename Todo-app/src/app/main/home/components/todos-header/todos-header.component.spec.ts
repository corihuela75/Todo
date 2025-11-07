import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosHeaderComponent } from './todos-header.component';

describe('TodosHeaderComponent', () => {
  let component: TodosHeaderComponent;
  let fixture: ComponentFixture<TodosHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosHeaderComponent]
    });
    fixture = TestBed.createComponent(TodosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
