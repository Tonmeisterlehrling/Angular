import {Component, inject} from '@angular/core';
import {EmployeeStore} from '../store/employees/employee.store';

@Component({
  selector: 'app-employee-reset',
  standalone: true,
  imports: [],
  templateUrl: './employee-reset.component.html',
  styleUrl: './employee-reset.component.css'
})
export class EmployeeResetComponent {
  readonly employeeStore = inject(EmployeeStore);
}
