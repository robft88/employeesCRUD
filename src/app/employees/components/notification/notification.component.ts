import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: [`
    .snack-bar{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ::ng-deep .success{
      background-color: #69f0ae;
      color: black;
    }

    ::ng-deep .error{
      background-color: #f44336;
      color: white;
    }
  `]
})
export class NotificationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
