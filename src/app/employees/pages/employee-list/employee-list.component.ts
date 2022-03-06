import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as _ from "lodash";

import { Employee } from 'src/app/shared/interfaces/employee.interface';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  data!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'city', 'departmentName', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  constructor(private es: EmployeeService,
    private renderer: Renderer2,
    private ns: NotificationService,
    private dialog: MatDialog,
    private cs: ConfirmService) { }


  ngOnInit(): void {
    this.es.getEmployees().subscribe(resp => {
      this.data = new MatTableDataSource(resp);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.renderer.setProperty(this.input.nativeElement, 'value', '');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
    this.data.filterPredicate = (data: Employee, filter: string) => {
      return (data.fullName.toLowerCase().indexOf(filter) !== -1 ||
        data.email.toLowerCase().indexOf(filter) !== -1 ||
        data.phone.toLowerCase().indexOf(filter) !== -1 ||
        data.city.toLowerCase().indexOf(filter) !== -1 ||
        data.departmentName!.toLowerCase().indexOf(filter) !== -1);
    }

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }

  }

  onDelete(employee: Employee) {
    if (!employee.$key) {
      return;
    }
    this.cs.openConfirm(employee).afterClosed().subscribe(resp => {
      if (resp) {
        this.es.deleteEmployee(employee.$key!);
        this.ns.showSnackBar(`"${employee.fullName}" ha sido eliminado correctamente...`, 'error');
      }
    });
  }

  openDialog(employee: Employee | {}) {
    this.dialog.open(EmployeeComponent, {
      height: '60%',
      width: '60%',
      panelClass: 'dialog-employee',
      autoFocus: true,
      disableClose: true,
      data: employee
    });
  }

  openDialogEdit(employee: Employee | {}) {
    this.openDialog(_.omit(employee, 'departmentName'));
  }

  openDetails(employee: Employee) {
    this.dialog.open(EmployeeDetailsComponent, {
      height: '700px',
      width: '400px',
      autoFocus: false,
      disableClose: true,
      data: employee
    })
  }

}
