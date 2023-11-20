import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BlockchainService} from '../../services/blockchain.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent {

  private _blockchainService: BlockchainService;
  private _localStorageService: LocalStorageService;

  constructor(
    blockchainService: BlockchainService,
    localStorageService: LocalStorageService) {
    this._blockchainService = blockchainService;
    this._localStorageService = localStorageService;
  }

  async onCreateSubmit(createForm: NgForm) {

    let deployedContract =
      await this._blockchainService.deployContract(
        createForm.value.recipient,
        createForm.value.title,
        createForm.value.description,
        UtilityService.getEtherAmount(createForm.value.amount.toString()),
        createForm.value.deadline
      );

    const signerAddress = await this._blockchainService.getSigner().getAddress()

    this._localStorageService.addContractAddressForOwner(
      signerAddress, deployedContract.address);
  }

  getFutureDate(): string {
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
    return  nextMonthDate.toISOString().split('T')[0];
  }
}
