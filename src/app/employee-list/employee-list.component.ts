import {Component, inject, signal} from '@angular/core';
import {Employee} from '../model/employee';
import {employeeData} from '../model/db';
import {RouterLink} from '@angular/router';
import {EmployeeCountComponent} from '../employee-count/employee-count.component';
import {EmployeeStore} from '../store/employees/employee.store';
import {signalStore, withState} from '@ngrx/signals';
import {EmployeeResetComponent} from '../employee-reset/employee-reset.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    RouterLink,
    EmployeeCountComponent,
    EmployeeResetComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  providers: [ EmployeeStore ]
})
export class EmployeeListComponent {

  readonly employeeStore = inject(EmployeeStore);

  employees = this.employeeStore.employees;

}
