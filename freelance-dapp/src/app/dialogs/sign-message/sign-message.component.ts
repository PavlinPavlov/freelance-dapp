import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BlockchainService} from '../../services/blockchain.service';
import {NgForm} from '@angular/forms';
import {ethers} from 'ethers';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-sign-message',
  templateUrl: './sign-message.component.html',
  styleUrls: ['./sign-message.component.css']
})
export class SignMessageComponent {

  address: string = '77';
  copyText: string = '';

  constructor(
    // This is the dialog reference that contains the component.
    private dialogRef: MatDialogRef<SignMessageComponent>,
    private _blockchainService: BlockchainService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.address = data.address;
  }

  async onSignSubmit(form: NgForm) {

    const message = ethers.utils.solidityKeccak256(
      ['address', 'uint256', 'uint256'],
      [
        form.value.contract,
        UtilityService.getEtherAmount(form.value.amount.toString()),
        form.value.nonce
      ]
    );

    const signer = this._blockchainService.getSigner();
    this.copyText = await signer.signMessage(ethers.utils.arrayify(message));
  }

  copyToClipboard(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
