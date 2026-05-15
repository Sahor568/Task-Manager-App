import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDetails } from './tasks-details';

describe('TasksDetails', () => {
  let component: TasksDetails;
  let fixture: ComponentFixture<TasksDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
