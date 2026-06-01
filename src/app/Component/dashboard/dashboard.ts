import { Component } from '@angular/core';
import { ColorPicker } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { iCategory } from '../interFace/iCategory';
import { iTask } from '../interFace/iTask';


@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule, ColorPicker],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  tasks: iTask[] = [];
  categories: iCategory[] = [];

  protected readonly Math = Math;

  ngOnInit() {
    this.loadCategory();
    this.loadTasks();
    // console.log(this.getCurrentUserId);
  }

  private getCurrentUserId() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user;
  }

  private loadCategory() {
    const userId = this.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categories = categories.filter((c: any) => c.userId === userId);
  }

  private loadTasks() {
    const userId = this.getCurrentUserId();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = tasks.filter((c: any) => c.userId === userId);
  }

  get completedTasks() {
    return this.tasks.filter((task) => task.status === 'Completed');
  }

  get pendingTasks() {
    return this.tasks.filter((task) => task.status === 'Pending');
  }

  get completionRate() {
    if (this.tasks.length === 0) {
      return 0;
    }
    const completedCount = this.completedTasks.length;
    return Math.round((completedCount / this.tasks.length) * 100);
  }

  get dueTodayTasks() {
    const today = new Date().toISOString().split('T')[0];
    console.log(today);
    return this.tasks.filter((task) => task.dueDate === today);
  }

  get overdueTasks() {
    const today = new Date().toISOString().split('T')[0];
    return this.tasks.filter((task) => task.dueDate < today && task.status !== 'Completed');
  }

  categoryTasks(name: string) {
    // console.log('getCategoryTasks', name);
    const app = this.tasks.filter((task) => task.category === name);
    return app;
  }

  completedCategoryTask(name: string) {
    // console.log('getCategoryTasks', name);
    const app = this.tasks.filter((task) => task.category === name && task.status === 'Completed');
    return app;
  }

  get newTaskTasks() {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() - 7);
    const app = this.tasks.filter((task) => new Date(task.createdAt) >= sevenDaysLater);
    return app;
  }
}

