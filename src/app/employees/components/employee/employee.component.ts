import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Department } from 'src/app/shared/interfaces/employee.interface';
import { Employee } from '../../../shared/interfaces/employee.interface';

import { DepartmentService } from '../../../shared/services/department.service';
import { EmployeeService } from '../../../shared/services/employee.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  imagePrueba!: any;

  departments!: Department[];

  form: FormGroup = this.fb.group({
    $key: [null],
    fullName: ['', [Validators.required, Validators.pattern(this.vs.completeNamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    phone: ['', [Validators.required, Validators.pattern(this.vs.phonePattern)]],
    city: ['', [Validators.required, Validators.pattern(this.vs.cityPattern)]],
    gender: [''],
    department: ['', Validators.required],
    hireDate: ['', Validators.required],
    isPermanent: [true]
  });

  get fullNameErrorMsg(): string {
    const errors = this.form.get('fullName')?.errors;
    if (errors?.['required']) {
      return 'Full name is required.'
    }
    if (errors?.['pattern']) {
      return 'You must add a first and last name.'
    }
    return '';
  }
  get emailErrorMsg(): string {
    const errors = this.form.get('email')?.errors;
    if (errors?.['required']) {
      return 'Email is required.'
    }
    if (errors?.['pattern']) {
      return 'Invalid email.'
    }
    return '';
  }

  get phoneErrorMsg(): string {
    const errors = this.form.get('phone')?.errors;
    if (errors?.['required']) {
      return 'Phone is required.'
    }
    if (errors?.['pattern']) {
      return 'Invalid phone. Ex: 0034XXXXXXXXX'
    }
    return '';
  }
  get cityErrorMsg(): string {
    const errors = this.form.get('city')?.errors;
    if (errors?.['required']) {
      return 'City is required.'
    }
    if (errors?.['pattern']) {
      return 'Invalid name format.'
    }
    return '';
  }
  get hireDateErrorMsg(): string {
    const errors = this.form.get('hireDate')?.errors;
    if (errors?.['required']) {
      return 'Hire date is required.'
    }
    return '';
  }
  constructor(private fb: FormBuilder,
    private vs: ValidatorService,
    private es: EmployeeService,
    private ds: DepartmentService,
    private ns: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {
    if (data.$key) {
      this.form.setValue(data);
    }
  }

  ngOnInit(): void {
    this.ds.getDepartments().subscribe(resp => this.departments = resp)
  }

  onClear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.es.saveEmployee(this.form.value);

    if (this.form.get('$key')?.value) {
      this.ns.showSnackBar('Registro actualizado exitosamente...', 'success');
    } else {
      this.ns.showSnackBar('Registro creado exitosamente...', 'success');
    }

    this.closeDialog();
  }


  closeDialog() {
    this.form.reset();
    this.dialogRef.close();
  }

}


