import {Component, Input} from '@angular/core';
import {BlockchainService} from '../../services/blockchain.service';

@Component({
  selector: 'button-close',
  template: '<button mat-raised-button color="primary" (click)="closeChanel()" i18n>Close Contract</button>',
})
export class CloseComponent {

  @Input('address') address!: string;

  constructor(
    private readonly blockchainService: BlockchainService,
  ) {
  }

  closeChanel(): void {
    this.blockchainService.closeChannel(this.address);
  }
}
