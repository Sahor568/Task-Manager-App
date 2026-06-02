import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { iCategory } from '../../interFace/iCategory';
import { iTask } from '../../interFace/iTask';
import { authService} from '../../Service/auth.service';
import { LoadService } from '../../Service/load.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-tasks',
  imports: [RouterLink, ReactiveFormsModule, ToastModule, ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  providers: [MessageService],
})
export class Tasks {
  tasks: iTask[] = [];
  categories: iCategory[] = [];

  private authService = inject(authService);
  private loadService = inject(LoadService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.tasks = this.loadService.loadTasks(); // Load tasks when the component initializes
    this.categories = this.loadService.loadCategories(); // Load Category when the component initializes
    console.log(this.authService.getCurrentUser());
  }

  deleteTask(taskId: number): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter((t: any) => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.loadService.loadTasks();
    // alert('Deleted');
    this.showDeleted();
    // window.location.reload();
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.loadService.loadTasks();
    if (searchTerm) {
      this.tasks = this.tasks.filter(
        (t: any) =>
          t.title.toLowerCase().includes(searchTerm) ||
          t.category.toLowerCase().includes(searchTerm),
      );
    }
  }

  filterCategory(event: any): void {
    const filterCategory = event.target.value.toLowerCase();
    this.loadService.loadTasks();
    if (filterCategory) {
      this.tasks = this.tasks.filter((t: any) => t.category.toLowerCase() === filterCategory);
    }
  }

  filterStatus(event: any): void {
    const filterStatus = event.target.value.toLowerCase();
    this.loadService.loadTasks();
    if (filterStatus) {
      this.tasks = this.tasks.filter((t: any) => t.status.toLowerCase() === filterStatus);
    }
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
