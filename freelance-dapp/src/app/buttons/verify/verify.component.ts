import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ContractCreateComponent} from '../../dialogs/contract-create/contract-create.component';

@Component({
  selector: 'button-verify',
  template: '<button mat-raised-button color="primary" (click)="openDialog()" i18n>Verify Payment</button>'
})
export class VerifyComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContractCreateComponent, {
      width: '70%',
      height: '70%',
    });
  }

}
