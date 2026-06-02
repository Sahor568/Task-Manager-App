import { Component, inject, signal } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { iTask } from '../../common/interface/iTask';
import { ToastService } from '../../common/service/toast.service';

@Component({
  selector: 'app-tasks-detail',
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './tasks-detail.html',
  styleUrl: './tasks-detail.scss',
})
export class TasksDetail {
  tasks!: iTask;
  taskId = signal('');

  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);


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
    this.toastService.showToast('error', 'Alert', 'Task deleted successfully!');
    this.back();
  }

  back() {
    window.history.back();
  }
}
