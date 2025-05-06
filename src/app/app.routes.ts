import { Routes } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {HomeComponent} from './home/home.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';

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
    component: EmployeeEditComponent,
    children: [
      {
        path: 'id',
        component: EmployeeDetailComponent,
      }
    ],
  }
];
