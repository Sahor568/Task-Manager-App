import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ITask } from '../interface/iTask';
import { ICategory } from '../interface/iCategory';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private authService = inject(AuthService);

  // Load categories for the current user
  public loadCategories(){
    const userId = this.authService.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories.filter((c: any) => c.userId === userId);
  }

  // Load tasks for the current user and map category IDs to names
    public loadTasks() { 
    const userId = this.authService.getCurrentUserId();

    if (!userId) return []; // Return empty array if userId is not available

    const tasksData = localStorage.getItem('tasks');
    const categoriesData = localStorage.getItem('categories');

    if (!tasksData) return []; // Return empty array if tasks data is not available

    const tasks: any[] = JSON.parse(tasksData);
    const categories: ICategory[] = JSON.parse(categoriesData!); 

    const categoryMap = new Map<number, string>( // this map will help us to quickly find category names by their IDs
      categories.map(c => [c.id, c.name]) // Create a map of category IDs to names
    );

   return tasks.filter(t => t.userId === userId).map(t => ({
     ...t, category: categoryMap.get(t.category)})); 
  }
}
