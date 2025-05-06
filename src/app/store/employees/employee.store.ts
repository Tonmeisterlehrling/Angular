import {Employee} from '../../model/employee';
import {employeeData} from '../../model/db';
import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap} from 'rxjs';
import {inject} from '@angular/core';
import {tapResponse} from '@ngrx/operators';
import {HttpClient} from '@angular/common/http';

type EmployeeState = {
  employees: Employee[];
  isLoading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  isLoading: false
}

export const EmployeeStore = signalStore(
  withState(initialState),
  withMethods((store, httpClient = inject(HttpClient)) => ({
    reset() {
      patchState(store, { employees: [] })
    },
    loadEmployees: rxMethod<void>(pipe(
      switchMap(() => {
        patchState(store, {isLoading: true});
        return httpClient.get<Employee[]>("http://localhost:3000/employees")
      }),
      tapResponse(
        employees => patchState(store, {employees: employees, isLoading: false}),
        err => {
          console.error(err)
          patchState(store, {employees: [], isLoading: false});
        }
      )
    ))
  })),
    withHooks({
      onInit(store) {
        store.loadEmployees();
      }
    })
  )

