import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';
import {CategoryCreate} from './pages/category/create/create';
import {CategoryEdit} from './pages/category/edit/edit';

export const routes: Routes = [
  { path: "home", component: Home },
  { path: "login", component: Login },
  { path: "register", component: Register },
  {
    path: 'category',
    children: [
      { path: 'create', component: CategoryCreate },
      { path: 'edit', component: CategoryEdit }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

