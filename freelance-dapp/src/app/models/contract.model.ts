import {BigNumber} from 'ethers';

export class ContractModel {
  contractAddress: string;
  contractOwner: string;
  contractRecipient: string;
  balance: BigNumber;
  info: ContractInfo;

  constructor(contractAddress: string,
              contractOwner: string,
              contractRecipient: string,
              balance: BigNumber,
              name = contractRecipient,
              description = contractRecipient) {
    this.contractAddress = contractAddress;
    this.contractOwner = contractOwner;
    this.contractRecipient = contractRecipient;
    this.balance = balance;
    this.info = new ContractInfo(name, description);
  }
}

export class ContractCreateModel {
  recipient: string;
  info: ContractInfo;

  constructor(recipient: string,
              name = recipient,
              description = recipient) {
    this.recipient = recipient;
    this.info = new ContractInfo(name, description);
  }
}

export class ContractInfo {
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
