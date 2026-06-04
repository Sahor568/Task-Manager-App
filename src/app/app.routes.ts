import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { Login } from './component/login/login';
import { Register } from './component/register/register'
import { authGuard, logGuard } from './auth-guard';
import { Categories } from './component/categories/categories';
import { Tasks } from './component/tasks/tasks';
import { TasksDetail } from './component/tasks-detail/tasks-detail'
import { TaskFormComponent } from './component/task-form/task-form';



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
