import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../interfaces/employee.interface';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees!: Observable<any[]>;
  employeesRef!: AngularFireList<any>;

  constructor(private afd: AngularFireDatabase,
    private ds: DepartmentService,
    private dp: DatePipe) {
  }

  saveEmployee(employee: Employee) {
    const employeeData: Employee = {
      fullName: employee.fullName,
      email: employee.email,
      phone: employee.phone,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate === '' ? '' : this.dp.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent
    };
    if (employee.$key) {
      this.employeesRef.update(employee.$key!, employeeData);
    } else {
      this.employeesRef.push(employeeData);
    }
  }

  getEmployees(): Observable<Employee[]> {
    this.employeesRef = this.afd.list('employees');
    return this.employees = this.employeesRef.snapshotChanges().pipe(
      map(value => value.map(v => {
        let departmentName = this.ds.getDepartmentsName(v.payload.val()['department']);
        const $key = v.payload.key!;
        const data = v.payload.val() as Employee;
        console.log({ $key, departmentName, ...data });
        return { $key, departmentName, ...data }
      }))
    )
  }

  deleteEmployee($key: string) {
    this.employeesRef.remove($key);
  }

}
