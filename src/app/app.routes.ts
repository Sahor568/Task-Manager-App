import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { TasksComponent } from './components/tasks/tasks';
import { Categories } from './components/categories/categories';
import { Register } from './components/register/register';
import { TasksNew } from './components/tasks-new/tasks-new';
import { TasksEdit } from './components/tasks-edit/tasks-edit';
import { TasksDetails } from './components/tasks-details/tasks-details';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/details', component: TasksDetails },
  { path: 'tasks/new', component: TasksNew },
  { path: 'tasks/edit', component: TasksEdit },
  { path: 'categories', component: Categories },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];


