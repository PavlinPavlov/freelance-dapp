import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SignMessageComponent} from '../../dialogs/sign-message/sign-message.component';

@Component({
  selector: 'button-sign',
  template: '<button mat-raised-button color="primary" (click)="openDialog()">Sign Message</button>'
})
export class SignComponent {

  @Input('address') address!: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignMessageComponent, {
      data: {address: this.address}
    });
  }
}
