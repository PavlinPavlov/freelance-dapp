import {BigNumber} from 'ethers';

export interface PaymentChannel {
  balance(): Promise<string>;

  claimTimeout(): Promise<void>;

  redeem(signature: string, amount: BigNumber, nonce: number): Promise<void>;

  recipient(): Promise<string>;

  recoverSigner(message: string, sig: string): Promise<{ '': string }>;

  owner(): Promise<string>;

  metadata(): Promise<{ title: string; description: string }>;

}
