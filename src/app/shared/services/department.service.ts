import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { combineLatest, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import * as _ from "lodash";
import { Department } from '../interfaces/employee.interface';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departments!: Department[];
  departmentsRef!: AngularFireList<any>;
  departmentName!: string;

  constructor(private afd: AngularFireDatabase) {
    this.getDepartments().subscribe(resp => {
      this.departments = resp;
    })
  }

  getDepartments(): Observable<Department[]> {
    this.departmentsRef = this.afd.list('departments');
    return this.departmentsRef.snapshotChanges().pipe(
      map(list => list.map(l => {
        const $key = l.payload.key!;
        const data = l.payload.val() as Department;
        return { $key: $key, ...data }
      }))
    )
  }

  getDepartmentsName($key: any): string {
    if ($key == '0') {
      return '';
    } else {
        return _.find(this.departments, (obj) => {
          return obj.$key == $key;
        })!['name'];
    }
  }
}
