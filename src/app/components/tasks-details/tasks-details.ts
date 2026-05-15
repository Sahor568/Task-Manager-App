import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks-details',
  imports: [RouterLink],
  templateUrl: './tasks-details.html',
  styleUrl: './tasks-details.scss',
})
export class TasksDetails {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  DeleteTask(): void {
    alert('Task deleted successfully');
    console.log('Task deleted');
  }
}
