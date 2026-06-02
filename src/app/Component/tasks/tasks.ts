import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { iCategory } from '../../common/interface/iCategory';
import { iTask } from '../../common/interface/iTask';
import { AuthService} from '../../common/service/auth.service';
import { LoadService } from '../../common/service/load.service';
import { ToastService } from '../../common/service/toast.service';


@Component({
  selector: 'app-tasks',
  imports: [RouterLink, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  tasks: iTask[] = [];
  categories: iCategory[] = [];

  private authService = inject(AuthService);
  private loadService = inject(LoadService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.tasks = this.loadService.loadTasks(); // Load tasks when the component initializes
    this.categories = this.loadService.loadCategories(); // Load Category when the component initializes
  }

  deleteTask(taskId: number): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter((t: any) => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.loadService.loadTasks();
    // alert('Deleted');
    this.toastService.showToast('error', 'Alert', 'Task deleted successfully!');
    this.tasks = updatedTasks;
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.tasks = this.loadService.loadTasks();
      this.tasks = this.tasks.filter((t: any) => t.title.toLowerCase().includes(searchTerm) );

  }

  filterCategory(event: any): void {
    const filterCategory = event.target.value.toLowerCase();
    this.tasks = this.loadService.loadTasks();
    this.tasks = this.tasks.filter((t: any) => t.category.toLowerCase().includes(filterCategory));
  }

  filterStatus(event: any): void {
    const filterStatus = event.target.value.toLowerCase();
    this.tasks = this.loadService.loadTasks();
    this.tasks = this.tasks.filter((t: any) => t.status.toLowerCase().includes(filterStatus));
  }
}
