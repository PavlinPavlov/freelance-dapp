import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContractModel} from '../models/contract.model';
import {BlockchainService} from '../services/blockchain.service';

@Component({
  selector: 'app-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.css']
})
export class ContractCardComponent implements OnInit {

  @Input() contract!: ContractModel;

  @Output() contractClicked = new EventEmitter<ContractModel>();
  private memaskSigner!: string;

  constructor(
    private _blockchainService: BlockchainService,
  ) {
  }

  onCardClick() {
    this.contractClicked.emit(this.contract);
  }

  async ngOnInit() {
    this.memaskSigner = await this.getSignerAddress();
  }
  isOwner(): boolean {
    return this.contract.contractOwner === this.memaskSigner;
  }

  getSignerAddress() {
    return this._blockchainService.getSigner().getAddress().then((address) => {
      return address;
    });
  }

}
