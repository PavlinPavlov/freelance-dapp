import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ContractAddComponent} from '../../dialogs/contract-add/contract-add.component';

@Component({
  selector: 'button-add',
  template: '<button mat-raised-button color="accent" (click)="openDialog()" i18n>Add Contract</button>'
})
export class AddComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContractAddComponent);
  }

}
