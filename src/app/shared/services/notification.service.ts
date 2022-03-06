import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../../employees/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }


  showSnackBar(msg: string, cssClass: string) {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message: msg },
      panelClass: [cssClass]
    })
  }

}
