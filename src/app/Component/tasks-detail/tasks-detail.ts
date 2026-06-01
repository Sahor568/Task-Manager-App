import { Component, signal } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { iTask } from '../interFace/iTask';

@Component({
  selector: 'app-tasks-detail',
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './tasks-detail.html',
  styleUrl: './tasks-detail.scss',
})
export class TasksDetail {
  tasks!: iTask;

  taskId = signal('');

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.route.params.subscribe((params) => {
      // console.log(params);
      this.taskId.set(params['id']);
    });
    const taskId = this.taskId();
    // console.log(taskId);

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = tasks.find((t: any) => t.id == taskId);
  }

  deleteTask() {}

  back() {
    window.history.back();
  }
}
