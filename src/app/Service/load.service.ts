import { inject, Injectable } from '@angular/core';
import { authService} from './auth.service';
import { iCategory } from '../interFace/iCategory';
import { iTask } from '../interFace/iTask';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  categories: iCategory[] = [];
  tasks: iTask[] = [];
  private authService = inject(authService);

  public loadCategories(){
    const userId = this.authService.getCurrentUser();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories.filter((c: any) => c.userId === userId);
  }

  public loadTasks() {
    const userId = this.authService.getCurrentUser();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return tasks.filter((c: any) => c.userId === userId);
  }
}
