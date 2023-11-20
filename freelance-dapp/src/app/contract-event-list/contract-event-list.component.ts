import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventModel} from '../models/eventModel';
import {ContractModel} from '../models/contract.model';
import {BlockchainService} from '../services/blockchain.service';

@Component({
  selector: 'app-contract-event-list',
  templateUrl: './contract-event-list.component.html',
  styleUrls: ['./contract-event-list.component.css']
})
export class ContractEventListComponent implements OnInit, OnChanges {

  @Input() contract: ContractModel | undefined
  events: EventModel[] = []

  constructor(
    private _blockchainService: BlockchainService
  ) {
  }

  async loadEvents() {
    if (this.contract) {
      let eventModels = await this._blockchainService.getAllEvents(this.contract.contractAddress);
      this.events = await Promise.all(eventModels)
    }
  }

  async ngOnInit() {
    await this.loadEvents()
  }

  // TODO Check for a better way
  async ngOnChanges(changes: SimpleChanges) {
    await this.loadEvents()
  }

}
