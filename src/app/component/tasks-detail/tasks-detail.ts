import { Component, inject, signal } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ITask } from '../../common/interface/iTask';
import { ToastService } from '../../common/service/toast.service';
import { LoadService } from '../../common/service/load.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tasks-detail',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, ConfirmDialog, Button, ConfirmDialogModule],
  templateUrl: './tasks-detail.html',
  styleUrl: './tasks-detail.scss',
  providers: [ConfirmationService],
})
export class TasksDetail {
  private confirmationService = inject(ConfirmationService);
  tasks!: ITask;

  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  private loadService = inject(LoadService);

  ngOnInit() {
    this.loadTasks(); // Load task details when the component initializes
  }

  // Function to load task details based on the ID from the route
  protected loadTasks() {
    const taskId = this.route.snapshot.paramMap.get('id');
    // console.log(taskId);

    const tasks = this.loadService.loadTasks();
    this.tasks = tasks.find((t: any) => t.id == taskId);
  }

  // Function to handle task deletion
  protected deleteTask() {
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
        const updatedTasks = tasks.filter((t: any) => t.id != this.tasks.id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        this.back();
      },
      reject: () => {
        this.toastService.showToast('error', 'Rejected', 'You have cancelled task deletion.');
      },
    });
  }

  // Function to navigate back to the previous page
  protected back() {
    window.history.back();
  }
}
