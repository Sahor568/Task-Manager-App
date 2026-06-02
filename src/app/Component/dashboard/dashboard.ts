import { Component, inject } from '@angular/core';
import { ColorPicker } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { iCategory } from '../../common/interface/iCategory';
import { iTask } from '../../common/interface/iTask';
import { AuthService } from '../../common/service/auth.service';
import { LoadService } from '../../common/service/load.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule, ColorPicker, BreadcrumbModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  //  PrimeNg BreadCrumb
  // items: MenuItem[] = [
  //   { label: 'Components' },
  //   { label: 'Form' },
  //   { label: 'InputText', routerLink: '/inputtext' },
  // ];
  // home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  tasks: iTask[] = [];
  categories: iCategory[] = [];

  private authService = inject(AuthService);
  private loadService = inject(LoadService);

  protected readonly Math = Math;

  ngOnInit() {
    this.tasks = this.loadService.loadTasks();
    this.categories = this.loadService.loadCategories();
  }

  protected get completedTasks() {
    return this.tasks.filter((task) => task.status === 'Completed');
  }

  protected get pendingTasks() {
    return this.tasks.filter((task) => task.status === 'Pending');
  }

  protected get completionRate() {
    if (this.tasks.length === 0) {
      return 0;
    }
    const completedCount = this.completedTasks.length;
    return Math.round((completedCount / this.tasks.length) * 100);
  }

  protected get dueTodayTasks() {
    const today = new Date().toISOString().split('T')[0];
    console.log(today);
    return this.tasks.filter((task) => task.dueDate === today);
  }

  protected get overdueTasks() {
    const today = new Date().toISOString().split('T')[0];
    return this.tasks.filter((task) => task.dueDate < today && task.status !== 'Completed');
  }

  protected categoryTasks(name: string) {
    // console.log('getCategoryTasks', name);
    return this.tasks.filter((task) => task.category === name);
  }

  protected completedCategoryTask(name: string) {
    // console.log('getCategoryTasks', name);
    return this.tasks.filter((task) => task.category === name && task.status === 'Completed');
  }

  protected get newTaskTasks() {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() - 7);
    return this.tasks.filter((task) => new Date(task.createdAt) >= sevenDaysLater);
  }
}

