import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../common/interface/iCategory';
import { ITask } from '../../common/interface/iTask';
// import { AuthService} from '../../common/service/auth.service';
import { LoadService } from '../../common/service/load.service';
import { ToastService } from '../../common/service/toast.service';

import { SelectModule } from 'primeng/select';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ColorPicker } from 'primeng/colorpicker';
import { TableModule } from 'primeng/table';

// It is an interface for the Status model
interface Status {
  name: string;
  value: string;
}


@Component({
  selector: 'app-tasks',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    SelectModule,
    FormsModule,
    CommonModule,
    Button,
    ConfirmDialog,
    ConfirmDialogModule,
    TableModule,
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  providers: [ConfirmationService],
})
export class Tasks implements OnInit {
  private confirmationService = inject(ConfirmationService);
  status!: Status[];
  categoryOptions: { name: string; value: string }[] = [];

  tasks: ITask[] = [];
  categories: ICategory[] = [];

  private loadService = inject(LoadService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.tasks = this.loadService.loadTasks(); // Load tasks when the component initializes
    this.categories = this.loadService.loadCategories(); // Load Category when the component initializes

    // Prepare status options for the primeNG dropdown filter
    this.status = [
      { name: 'All Status', value: '' },
      { name: 'Pending', value: 'Pending' },
      { name: 'In Progress', value: 'In Progress' },
      { name: 'Completed', value: 'Completed' },
    ];

    // Prepare category options for the primeNG dropdown filter
    this.categoryOptions = [
      { name: 'All Categories', value: '' },
      ...this.categories.map((c) => ({ name: c.name, value: c.name })),
    ];
  }

  // To handle task deletion
  protected deleteTask(taskId: number): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.toastService.showToast('error', 'Alert', 'Task deleted successfully!');
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.filter((t: any) => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        this.tasks = this.loadService.loadTasks();
      },
      reject: () => {
        this.toastService.showToast('error', 'Rejected', 'You have cancelled task deletion.');
      },
    });
  }

  // To handle task searching
  protected onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.tasks = this.loadService.loadTasks();
    this.tasks = this.tasks.filter((t: any) => t.title.toLowerCase().includes(searchTerm));
  }

  // To handle category filtering
  protected filterCategory(category: string): void {
    this.tasks = this.loadService.loadTasks();
    if (category) {
      this.tasks = this.tasks.filter((t: any) => t.category === category);
    }
  }

  // To handle task status filtering
  protected filterStatus(status: string): void {
    this.tasks = this.loadService.loadTasks();
    if (status) {
      this.tasks = this.tasks.filter((t: any) => t.status === status);
    }
  }
}
