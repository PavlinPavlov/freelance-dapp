import {Component, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UtilityService} from '../services/utility.service';
import {ContractModel} from '../models/contract.model';
import {BlockchainService} from '../services/blockchain.service';

@Component({
  selector: 'app-redeem-form',
  templateUrl: './redeem-form.component.html',
  styleUrls: ['./redeem-form.component.css']
})
export class RedeemFormComponent {

  @Input('openedContract') openedContract!: ContractModel;
  blockchainService: BlockchainService;

  constructor(blockchainService: BlockchainService) {
    this.blockchainService = blockchainService;
  }

  async onRedeemSubmit(redeemForm: NgForm) {
    const signature = redeemForm.value.signature;
    const amountWei = UtilityService.getEtherAmount(redeemForm.value.amount.toString());
    const nonce = redeemForm.value.nonce;

    let deployedContract =
      await this.blockchainService.fromAddress(this.openedContract.contractAddress);

    await deployedContract.redeem(signature, amountWei, nonce);
  }
}
