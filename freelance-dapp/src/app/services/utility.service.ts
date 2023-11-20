import {ethers} from 'ethers';

export class UtilityService {

  constructor() {
  }

  public static getEtherAmount(etherAmount: string): ethers.BigNumber {
    return ethers.utils.parseEther(etherAmount);
  }
}
