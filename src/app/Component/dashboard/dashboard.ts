import { Component, inject } from '@angular/core';
import { ColorPicker } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { iCategory } from '../../interFace/iCategory';
import { iTask } from '../../interFace/iTask';
import { authService } from '../../Service/auth.service';
import { LoadService } from '../../Service/load.service';


@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule, ColorPicker],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  tasks: iTask[] = [];
  categories: iCategory[] = [];

  private authService = inject(authService);
  private loadService = inject(LoadService);

  protected readonly Math = Math;

  ngOnInit() {
    this.tasks = this.loadService.loadTasks();
    this.categories = this.loadService.loadCategories();
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
    return this.tasks.filter((task) => task.category === name);
  }

  completedCategoryTask(name: string) {
    // console.log('getCategoryTasks', name);
    return this.tasks.filter((task) => task.category === name && task.status === 'Completed');
  }

  get newTaskTasks() {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() - 7);
    return this.tasks.filter((task) => new Date(task.createdAt) >= sevenDaysLater);
  }
}

