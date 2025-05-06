import {Component, input} from '@angular/core';
import {Employee} from '../model/employee';

@Component({
  selector: 'app-employee-count',
  standalone: true,
  imports: [],
  templateUrl: './employee-count.component.html',
  styleUrl: './employee-count.component.css'
})
export class EmployeeCountComponent {
  count = input<Employee[]>([]);

  employees = input<Employee[]>([]);

  countOfTrainings(employee: Employee) {
    return employee.trainings.length;
  }

  countOfAllTrainings(employees: Employee[]) {
    let sum: number = 0;
    for (let i = 0; i < employees.length; i++) {
      sum += employees[i].trainings.length;
    }
    return sum;
  }
}
