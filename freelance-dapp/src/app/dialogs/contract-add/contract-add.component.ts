import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {BlockchainService} from '../../services/blockchain.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html'
})
export class ContractAddComponent {

  constructor(
    // This is the dialog reference that contains the component.
    private dialogRef: MatDialogRef<ContractAddComponent>,
    private _localStorageService: LocalStorageService,
    private _blockchainService: BlockchainService
  ) {
  }

  async onSubmit(form: NgForm) {
    const contractAddress = form.value.address;
    const owner = await this._blockchainService.getSigner().getAddress();
    this._localStorageService.addContractAddressForOwner(owner, contractAddress);
    this.dialogRef.close();
  }
}
