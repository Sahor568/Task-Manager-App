import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../common/interface/iCategory';
import { ITask } from '../../common/interface/iTask';
import { AuthService} from '../../common/service/auth.service';
import { LoadService } from '../../common/service/load.service';
import { ToastService } from '../../common/service/toast.service';

import { SelectModule } from 'primeng/select';

interface Status {
  name: string;
  value: string;
}


@Component({
  selector: 'app-tasks',
  imports: [RouterLink, ReactiveFormsModule, SelectModule, FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  status!: Status[];
  categoryOptions: { name: string; value: string }[] = [];

  tasks: ITask[] = [];
  categories: ICategory[] = [];

  private authService = inject(AuthService);
  private loadService = inject(LoadService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.tasks = this.loadService.loadTasks(); // Load tasks when the component initializes
    this.categories = this.loadService.loadCategories(); // Load Category when the component initializes

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

  protected deleteTask(taskId: number): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter((t: any) => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.loadService.loadTasks();
    // alert('Deleted');
    this.toastService.showToast('error', 'Alert', 'Task deleted successfully!');
    this.tasks = updatedTasks;
  }

  protected onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.tasks = this.loadService.loadTasks();
    this.tasks = this.tasks.filter((t: any) => t.title.toLowerCase().includes(searchTerm));
  }

  protected filterCategory(category: string): void {
    this.tasks = this.loadService.loadTasks();
    if (category) {
      this.tasks = this.tasks.filter((t: any) => t.category === category);
    }
  }

  protected filterStatus(status: string): void {
    this.tasks = this.loadService.loadTasks();
    if (status) {
      this.tasks = this.tasks.filter((t: any) => t.status === status);
    }
  }
}
