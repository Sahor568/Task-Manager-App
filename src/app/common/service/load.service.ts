import { inject, Injectable } from '@angular/core';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private authService = inject(AuthService);

  public loadCategories(){
    const userId = this.authService.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories.filter((c: any) => c.userId === userId);
  }

  public loadTasks() {
    const userId = this.authService.getCurrentUserId();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return tasks.filter((c: any) => c.userId === userId);
  }
}
