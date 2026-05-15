import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks-new',
  templateUrl: './tasks-new.html',
  styleUrl: './tasks-new.scss',
})
export class TasksNew {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    alert('Task added successfully');
    console.log('Task added');
  }
}
