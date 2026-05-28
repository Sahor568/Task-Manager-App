import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Register } from './register/register'
import { authGuard } from './auth-guard';
import { Categories } from './categories/categories';
import { TasksNew } from './tasks-new/tasks-new';
import { Tasks } from './tasks/tasks';
import { TasksEdit } from './tasks-edit/tasks-edit';
import { TasksDetail } from './tasks-detail/tasks-detail';


export const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'categories', component: Categories, canActivate: [authGuard] },
  { path: 'tasks-new', component: TasksNew, canActivate: [authGuard] },
  { path: 'tasks', component: Tasks, canActivate: [authGuard] },
  { path: 'tasks-edit/:id', component: TasksEdit, canActivate: [authGuard] },
  { path: 'tasks-detail/:id', component: TasksDetail, canActivate: [authGuard] },
];
