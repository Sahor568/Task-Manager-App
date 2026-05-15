import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Task {
  id: number;
  title: string;
  category: string;
  dueDate: string;
  status: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  imports: [RouterLink],
})
export class TasksComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';

  tasks: Task[] = [];

  ngOnInit(): void {}

  get filteredTasks(): Task[] {
    return this.tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCategory = !this.selectedCategory || task.category === this.selectedCategory;

      const matchesStatus = !this.selectedStatus || task.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  DeleteTask(): void {
    alert('Task deleted successfully');
    console.log('Task deleted');
  }
}
