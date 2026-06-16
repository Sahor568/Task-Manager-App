import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../common/interface/iCategory';
import { ITask } from '../../common/interface/iTask';
import { AuthService } from '../../common/service/auth.service';
import { ToastService } from '../../common/service/toast.service';

import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePipe } from '@angular/common';
import { Select } from 'primeng/select';

interface Status {
  name: string;
  value: string;
}

@Component({
  selector: 'app-tasks-form',
  imports: [ReactiveFormsModule, DatePickerModule, InputMaskModule, Select],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  providers: [DatePipe] // Added DatePipe to providers to fix inject error
})
export class TaskFormComponent {
  status!: Status[];

  isEditMode = false;

  task!: ITask;
  categoryOptions: { name: string; value: string }[] = [];

  categories: ICategory[] = [];

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private datePipe = inject(DatePipe);

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

    this.status = [
      { name: 'All Status', value: '' },
      { name: 'Pending', value: 'Pending' },
      { name: 'In Progress', value: 'In Progress' },
      { name: 'Completed', value: 'Completed' },
    ];

    this.categoryOptions = [
      { name: 'All Categories', value: '' },
      ...this.categories.map((c) => ({ name: c.name, value: c.name })),
    ];
  }

  private loadTask(taskId: string): void {
  const tasks: ITask[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  this.task = tasks.find((t) => t.id === Number(taskId))!;

  // Convert string to Date object for p-datepicker
  const dueDate = this.task.dueDate ? new Date(this.task.dueDate) : '';

  this.taskForm.patchValue({
    title: this.task.title,
    category: this.task.category,
    dueDate: dueDate as any,   // Date object
    status: this.task.status,
    description: this.task.description,
  });
}

  private loadCategories(): void {
    const userId = this.authService.getCurrentUserId();
    const allCategories: ICategory[] = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categories = allCategories.filter((c) => c.userId === userId);
  }

  protected onSubmit(): void {
    const formData = this.taskForm.value as {
      title: string;
      category: string;
      dueDate: string | Date;
      status: string;
      description: string;
    };

    if (this.isEditMode) {
      this.updateTask(formData);
    } else {
      this.createTask(formData);
    }
  }

  private createTask(formData: { dueDate: string | Date }): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const nextId = tasks.length ? Math.max(...tasks.map((t: any) => t.id)) + 1 : 1;
    const userId = this.authService.getCurrentUserId();
    const createdDate = new Date().toISOString().split('T')[0];

    const dueDate = this.taskForm.get('dueDate')?.value as unknown;
    if (dueDate instanceof Date) {
      formData['dueDate'] = this.datePipe.transform(dueDate, 'yyyy-MM-dd')!;
    }

    const newTask = { id: nextId, userId, ...formData, createdAt: createdDate };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.toastService.showToast('success', 'Task Added Successfully!', 'Task Added Successfully!');
    this.router.navigate(['/tasks']); // Fixed: Uncommented navigation after creating task
  }

  private updateTask(formData: { dueDate: string | Date }): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    console.log('Form Data:', formData);
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const dueDate = this.taskForm.get('dueDate')?.value as unknown;
    if (dueDate instanceof Date) {
      formData['dueDate'] = this.datePipe.transform(dueDate, 'yyyy-MM-dd')!;
    }

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

  protected onCancel(): void {
    this.toastService.showToast('error', 'Task Status', 'You cancelled the task!');
    window.history.back();
  }
}

