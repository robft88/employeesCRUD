import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../interfaces/employee.interface';
import { ConfirmDialogComponent } from '../../employees/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  openConfirm(employee: Employee){
    return this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: employee
    })
  }
}
