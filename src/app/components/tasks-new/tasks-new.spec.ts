import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksNew } from './tasks-new';

describe('TasksNew', () => {
  let component: TasksNew;
  let fixture: ComponentFixture<TasksNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksNew],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
