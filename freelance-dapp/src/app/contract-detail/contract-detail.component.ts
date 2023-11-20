import {Component, Input} from '@angular/core';
import {ContractModel} from '../models/contract.model';
import {BlockchainService} from '../services/blockchain.service';
import {ethers} from 'ethers';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent {

  @Input('openedContract') openedContract!: ContractModel;

  blockchainService: BlockchainService;
  memaskSigner!: string;

  constructor(blockchainService: BlockchainService) {
    this.blockchainService = blockchainService;
  }

  // TODO: ...
  getSignerAddress() {
    return this.blockchainService.getSigner().getAddress().then((address) => {
      return address;
    });
  }

  isOwner(): boolean {
    return this.openedContract.contractOwner === this.memaskSigner;
  }

  isRecipient(): boolean {
    return this.openedContract.contractRecipient === this.memaskSigner;
  }

  getBalanceInEther(): string {
    return ethers.utils.formatEther(this.openedContract.balance);
  }

  async ngOnInit() {
    this.memaskSigner = await this.getSignerAddress();
  }
}
