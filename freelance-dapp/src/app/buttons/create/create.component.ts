import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ContractCreateComponent} from '../../dialogs/contract-create/contract-create.component';

@Component({
  selector: 'button-create',
  template: '<button mat-raised-button color="accent" (click)="openDialog()" i18n>Create Contract</button>'
})
export class CreateComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContractCreateComponent);
  }

}
