import { Routes } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'list',
    component: EmployeeListComponent
  },
  {
    path: 'edit',
    component: EmployeeEditComponent
  }
];
