import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContractModel} from '../models/contract.model';
import {BlockchainService} from '../services/blockchain.service';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.css']
})
export class ContractCardComponent implements OnInit {

  @Input("inputContract") contract!: ContractModel;

  @Output() contractClicked = new EventEmitter<ContractModel>();
  private metaMaskSigner!: string;

  constructor(
    private _blockchainService: BlockchainService,
    private _localStorageService: LocalStorageService
  ) {
  }

  onCardClick() {
    this.contractClicked.emit(this.contract);
  }

  async ngOnInit() {
    this.metaMaskSigner = await this.getSignerAddress();
  }
  isOwner(): boolean {
    return this.contract.contractOwner === this.metaMaskSigner;
  }

  async getSignerAddress() {
    return await this._blockchainService.getSigner().getAddress();
  }

  removeFromLS() {
    this._localStorageService.removeContractAddress(this.metaMaskSigner, this.contract.contractAddress);
  }
}
