import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  userId: number;
}


@Component({
  selector: 'app-tasks-new',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-new.html',
  styleUrl: './tasks-new.scss',
})
export class TasksNew {

  categories: Category[] = [];

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.loadCategories(); // Will load categories when the component initializes
  }

  private getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user;
  }

  private loadCategories(): void {
    const userId = this.getCurrentUserId();
    console.log("user id", userId);
    const allCategories: Category[] = JSON.parse(localStorage.getItem('categories') || '[]');
    console.log("all categories", allCategories);
    this.categories = allCategories.filter(c => c.userId === userId);
  }

  onSubmit() {
    // if (this.taskForm.invalid) {
    //   alert('Please fill in all required fields with valid data!');
    //   return;
    // }

    const formData = this.taskForm.getRawValue(); // Get form data as a plain object
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const nextId = tasks.length ? Math.max(...tasks.map((t: any) => t.id)) + 1 : 1;
    const userId = this.getCurrentUserId();

    const createdDate = new Date().toISOString().split('T')[0];;

    const newTask = { id: nextId, userId: userId, ...formData, createdAt: createdDate };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Task created successfully!');
    // this.taskForm.reset();
    window.history.back();
  }

  onCancel() {
    window.history.back();
  }
}
