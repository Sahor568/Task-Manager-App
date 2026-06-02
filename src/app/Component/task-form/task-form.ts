import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iCategory } from '../../common/interface/iCategory';
import { iTask } from '../../common/interface/iTask';
import { AuthService } from '../../common/service/auth.service';
import { ToastService } from '../../common/service/toast.service';

@Component({
  selector: 'app-tasks-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})

export class TaskFormComponent {
  isEditMode = false;

  task!: iTask;
  categories: iCategory[] = [];

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditMode = true;
      this.loadTask(taskId);
    }
    this.loadCategories();
  }

  private loadTask(taskId: string): void {
    const tasks: iTask[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.task = tasks.find((t) => t.id === Number(taskId))!;
    this.taskForm.patchValue({
      title: this.task.title,
      category: this.task.category,
      dueDate: this.task.dueDate,
      status: this.task.status,
      description: this.task.description,
    });
  }

  private loadCategories(): void {
    const userId = this.authService.getCurrentUserId();
    const allCategories: iCategory[] = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categories = allCategories.filter((c) => c.userId === userId);
  }

  onSubmit(): void {
    const formData = this.taskForm.value as {
      title: string;
      category: string;
      dueDate: string;
      status: string;
      description: string;
    };

    if (this.isEditMode) {
      this.updateTask(formData);
    } else {
      this.createTask(formData);
    }
  }

  private createTask(formData: {
    title: string;
    category: string;
    dueDate: string;
    status: string;
    description: string;
  }): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const nextId = tasks.length ? Math.max(...tasks.map((t: any) => t.id)) + 1 : 1;
    const userId = this.authService.getCurrentUserId();
    const createdDate = new Date().toISOString().split('T')[0];
    const newTask = { id: nextId, userId, ...formData, createdAt: createdDate };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // alert('Task created successfully!');
    this.toastService.showToast('success', 'Task Added Successfully!', 'Task Added Successfully!');
    this.router.navigate(['/tasks']);
    // window.location.href = '/tasks';
  }

  private updateTask(formData: {
    title: string;
    category: string;
    dueDate: string;
    status: string;
    description: string;
  }): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updated = tasks.map((t: any) => {
      if (t.id === Number(taskId)) {
        return { ...t, ...formData };
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(updated));
    this.toastService.showToast('info', 'Task Status', 'Task edited successfully!');
      this.router.navigate(['/tasks']);
    // window.location.href = '/tasks';
  }

  onCancel(): void {
    this.toastService.showToast('error', 'Task Status', 'You cancelled the task!');
      window.history.back();
  }

}
