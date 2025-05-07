import {Component, inject, input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Employee} from '../model/employee';
import {Router} from '@angular/router';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

type TrainingForm = {
  subject: FormControl<string | null>,
  date: FormControl<string | null>
}

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgbCollapse],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent implements OnInit {

  id = input<number | undefined>();
  httpClient = inject(HttpClient);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required)
    }),
    trainings: new FormArray<FormGroup<any>>([])
  })
  isCollapsed = false;

  get trainings(): FormArray {
    return this.form.controls.trainings as FormArray;
  }

  constructor(public router: Router) {
  }

  ngOnInit() {
    if (this.id()) {
      console.log("Load values")
      this.httpClient.get<Employee>(
        `http://localhost:3000/employees/${this.id()}`)
        .subscribe(emp => this.setFormValue(emp))
    }
  }

  setFormValue(emp: Employee) {
    this.trainings.clear();
    console.log(":::: ", emp.trainings.length);
    for (const training of emp.trainings ?? []) {
      this.trainings.push(new FormGroup({
        subject: new FormControl(['']),
        date: new FormControl([''])
      }))
    }

    this.form.patchValue(emp);
  }

  submit() {
    console.log(this.id())
    console.log(this.form.getRawValue())
  }

  back() {
    //window.history.back();
    this.router.navigate(['/list']);
  }

  add() {
    this.trainings.push(
      new FormGroup({
      subject: new FormControl(['']),
      date: new FormControl([''])
    }))
  }

  deleteIdx(index: number) {
    this.trainings.removeAt(index);

  }
}
