import { Component, inject } from '@angular/core';
import { ColorPicker } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../common/interface/iCategory';
import { ITask } from '../../common/interface/iTask';
import { LoadService } from '../../common/service/load.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule, ColorPicker, BreadcrumbModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  tasks: ITask[] = [];
  categories: ICategory[] = [];

  private loadService = inject(LoadService);

  protected readonly Math = Math; // To use Math functions in the template

  ngOnInit() {
    // Load tasks and categories when the component initializes
    this.tasks = this.loadService.loadTasks();
    this.categories = this.loadService.loadCategories();
  }
 
  // Getter methods to filter completed tasks
  protected get completedTasks() {
    return this.tasks.filter((task) => task.status === 'Completed');
  }

  // Getter methods to filter pending tasks
  protected get pendingTasks() {
    return this.tasks.filter((task) => task.status === 'Pending');
  }

  // Getter methods to filter completed tasks
  protected get completionRate() {
    if (this.tasks.length === 0) {
      return 0;
    }
    const completedCount = this.completedTasks.length;
    return Math.round((completedCount / this.tasks.length) * 100);
  }

  // Getter methods to filter due today tasks
  protected get dueTodayTasks() {
    const today = new Date().toISOString().split('T')[0];
    console.log(today);
    return this.tasks.filter((task) => task.dueDate === today);
  }

  // Getter methods to filter overdue tasks
  protected get overdueTasks() {
    const today = new Date().toISOString().split('T')[0];
    return this.tasks.filter((task) => task.dueDate < today && task.status !== 'Completed');
  }

  // Getter methods to filter tasks by category
  protected categoryTasks(name: string) {
    return this.tasks.filter((task) => task.category === name);
  }

  // Getter methods to filter completed tasks by category
  protected completedCategoryTask(name: string) {
    return this.tasks.filter((task) => task.category === name && task.status === 'Completed');
  }

  // Getter methods to filter new tasks created in the last 7 days
  protected get newTaskTasks() {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() - 7);
    return this.tasks.filter((task) => new Date(task.createdAt) >= sevenDaysLater);
  }
}

