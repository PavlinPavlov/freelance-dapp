import { Component } from '@angular/core';
import {ContractModel} from './models/contract.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openedContract!: ContractModel;

  onContractSelected(contract: ContractModel) {
    this.openedContract = contract;
  }
}
