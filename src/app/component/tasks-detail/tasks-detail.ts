import { Component, inject, signal } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ITask } from '../../common/interface/iTask';
import { ToastService } from '../../common/service/toast.service';

@Component({
  selector: 'app-tasks-detail',
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './tasks-detail.html',
  styleUrl: './tasks-detail.scss',
})
export class TasksDetail {
  tasks!: ITask;
  taskId = signal('');

  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);


  ngOnInit() {
    this.loadTasks(); // Load task details when the component initializes
  }

  // Function to load task details based on the ID from the route
  protected loadTasks() {
    const taskId = this.route.snapshot.paramMap.get('id');
    console.log(taskId);

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = tasks.find((t: any) => t.id == taskId);
  }

  // Function to handle task deletion
  protected deleteTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter((t: any) => t.id != this.tasks.id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.toastService.showToast('error', 'Alert', 'Task deleted successfully!'); // Show error toast message
    this.back();
  }

  // Function to navigate back to the previous page
  protected back() {
    window.history.back();
  }
}
