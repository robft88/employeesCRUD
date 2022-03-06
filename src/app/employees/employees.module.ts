import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ImagePipe } from '../shared/pipes/image.pipe';
import { MaterialModule } from '../material/material.module';
import { NotificationComponent } from './components/notification/notification.component';




@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    NotificationComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    ImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    EmployeesComponent,
    EmployeeComponent,
    NotificationComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    ImagePipe,
    ConfirmDialogComponent
  ]
})
export class EmployeesModule { }
