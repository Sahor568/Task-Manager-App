import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { iCategory } from '../interFace/iCategory';
import { iTask } from '../interFace/iTask';


@Component({
  selector: 'app-tasks',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  tasks: iTask[] = [];
  categories: iCategory[] = [];

  ngOnInit(): void {
    this.loadTasks(); // Load tasks when the component initializes
    this.loadCategory(); // Load Category when the component initializes
    console.log(this.getCurrentUserId());
  }

  private getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user;
  }

  private loadTasks(): void {
    const userId = this.getCurrentUserId();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = tasks.filter((t: any) => t.userId === userId);
    //     this.tasks = tasks.filter(
    //      (t: any) => Number(t.userId) === userId
    //      );
    //     console.log("filtered tasks", this.tasks);
  }

  private loadCategory(): void {
    const userId = this.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categories = categories.filter((c : any) => c.userId === userId);
  }

  deleteTask(taskId: number): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter((t: any) => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.loadTasks();
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.loadTasks();
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
    this.loadTasks();
    if (filterCategory) {
      this.tasks = this.tasks.filter((t: any) => t.category.toLowerCase() === filterCategory);
    }
  }

  filterStatus(event: any): void {
    const filterStatus = event.target.value.toLowerCase();
    this.loadTasks();
    if (filterStatus) {
      this.tasks = this.tasks.filter((t: any) => t.status.toLowerCase() === filterStatus);
    }
  }
}
