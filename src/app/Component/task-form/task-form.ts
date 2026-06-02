import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iCategory } from '../../interFace/iCategory';
import { iTask } from '../../interFace/iTask';
import { authService } from '../../Service/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-tasks-form',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  providers: [MessageService],
})

export class TaskFormComponent {
  isEditMode = false;

  task!: iTask;
  categories: iCategory[] = [];

  private authService = inject(authService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

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
    const userId = this.authService.getCurrentUser();
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
    const userId = this.authService.getCurrentUser();
    const createdDate = new Date().toISOString().split('T')[0];
    const newTask = { id: nextId, userId, ...formData, createdAt: createdDate };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // alert('Task created successfully!');
    this.showSuccess();
    setTimeout(() => {
      this.router.navigate(['/tasks']);
    }, 2000);
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
    this.showEdited();
    setTimeout(() => {
      this.router.navigate(['/tasks']);
    }, 2000);
    // window.location.href = '/tasks';
  }

  onCancel(): void {
    this.showCancelled();
    setTimeout(() => {
      window.history.back();
    }, 2000);
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Task Status',
      detail: 'Task Added Successfully!',
      life: 3000,
    });
  }

  showCancelled() {
    this.messageService.add({
      severity: 'error',
      summary: 'Task Status',
      detail: 'You cancelled the task!',
      life: 3000,
    });
  }

  showEdited() {
    this.messageService.add({
      severity: 'info',
      summary: 'Task Status',
      detail: 'Task edited successfully!',
      life: 3000,
    });
  }


}
