import { Routes } from '@angular/router';
import { Dashboard } from './Component/dashboard/dashboard';
import { Login } from './Component/login/login';
import { Register } from './Component/register/register'
import { authGuard, logGuard } from './auth-guard';
import { Categories } from './Component/categories/categories';
import { Tasks } from './Component/tasks/tasks';
import { TasksDetail } from './Component/tasks-detail/tasks-detail'
import { TaskFormComponent } from './Component/task-form/task-form';


export const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'login', component: Login, canActivate: [logGuard] },
  { path: 'register', component: Register, canActivate: [logGuard] },
  { path: 'categories', component: Categories, canActivate: [authGuard] },
  { path: 'tasks-new', component: TaskFormComponent, canActivate: [authGuard] },
  { path: 'tasks', component: Tasks, canActivate: [authGuard] },
  { path: 'tasks-edit/:id', component: TaskFormComponent, canActivate: [authGuard] },
  { path: 'tasks-detail/:id', component: TasksDetail, canActivate: [authGuard] },
];
