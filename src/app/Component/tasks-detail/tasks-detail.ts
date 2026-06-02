import { Component, inject, signal } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { iTask } from '../../interFace/iTask';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-tasks-detail',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, ToastModule],
  templateUrl: './tasks-detail.html',
  styleUrl: './tasks-detail.scss',
  providers: [MessageService],
})
export class TasksDetail {
  tasks!: iTask;
  taskId = signal('');

  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    // this.route.params.subscribe((params) => {
    //   this.taskId.set(params['id']);
    // });
    // const taskId = this.taskId();

    const taskId = this.route.snapshot.paramMap.get('id');
    console.log(taskId);

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = tasks.find((t: any) => t.id == taskId);
  }

  deleteTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter((t: any) => t.id != this.tasks.id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.showDeleted();
    setTimeout(() => {
      this.back();
    }, 2000);
  }

  back() {
    window.history.back();
  }

  showDeleted() {
    this.messageService.add({
      severity: 'error',
      summary: 'Alert',
      detail: 'Task deleted successfully!',
      life: 3000,
    });
  }
}
