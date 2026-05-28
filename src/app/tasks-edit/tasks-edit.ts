import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Task {
  id: number;
  title: string;
  category: string;
  status: string;
  dueDate: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  userId: number;
}

@Component({
  selector: 'app-tasks-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-edit.html',
  styleUrl: './tasks-edit.scss',
})
export class TasksEdit {

  tasks!: Task ;
  categories: Category[] = [];

  taskForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(public route:ActivatedRoute) { }

  taskId=signal('');

  ngOnInit(): void {
    this.loadTasks(); // Will load tasks when the component initializes
    this.loadCategory(); // Will load tasks when the component initializes
  }

  private getCurrentUserId(): number {
    return Number(localStorage.getItem('currentUser') || '{}');
  }

  loadTasks(): void {
    // if (this.taskForm.invalid) return;
    this.route.params.subscribe((params) => {
      // console.log(params);
      this.taskId.set(params['id']);
    });
    const taskId = this.taskId();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = tasks.find((t: any) => t.id == taskId);

    // console.log(this.tasks);
    this.taskForm.patchValue({
      title: this.tasks.title,
      category: this.tasks.category,
      dueDate: this.tasks.dueDate,
      status: this.tasks.status,
      description: this.tasks.description
    });
    // console.log(this.taskForm.value);
  }


  loadCategory(): void {
    const userId = this.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categories = categories.filter((t: any) => t.userId === userId);
  }

  updateTask() {
    // alert('Update task is Called....');
    // console.log(this.taskForm.value);

    const taskId = this.taskId();
    // console.log('This is TaskId: '+ taskId);

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const app = tasks.map((t: any) => {
      if (t.id == taskId) {
        return {
          ...t,
          title: this.taskForm.value.title,
          category: this.taskForm.value.category,
          dueDate: this.taskForm.value.dueDate,
          status: this.taskForm.value.status,
          description: this.taskForm.value.description
        };
      }
      return t;
    });

    localStorage.setItem('tasks', JSON.stringify(app));

    console.log('Edited Successfully.');
    // window.history.back();
    window.location.href='/tasks';
  }

  onCancel() {
    // window.history.back();
    window.location.href = '/tasks';
  }
}
