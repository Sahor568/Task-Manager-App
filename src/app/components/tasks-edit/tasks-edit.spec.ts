import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEdit } from './tasks-edit';

describe('TasksEdit', () => {
  let component: TasksEdit;
  let fixture: ComponentFixture<TasksEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
