import {Injectable} from '@angular/core';
import {StorageAccessor} from './storage.interface';
import {from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageAccessor {

  private readonly addresses_prefix = 'contratcs_for_owner_';
  // private storageSub = new BehaviorSubject<string | null>(
  //   '0xBdFaB42869dAa56211Fa585eA6E662F8feA4F2d0'
  // );
  // private storageSub = new BehaviorSubject<string | null>(localStorage.getItem('contratcs_for_owner_'));


  constructor() {
  }


  setContractAddressesForOwner(owner: string, addresses: string[]) {
    localStorage.setItem(this.addresses_prefix + owner, JSON.stringify(addresses));
  }


  getContractAddressesForOwner(owner: string): Observable<string> {
    console.log('Loaded contract addresses fot key: ' + this.addresses_prefix + owner);
    let lsValue = localStorage.getItem(this.addresses_prefix + owner);
    let addresses: string[] = lsValue ? JSON.parse(lsValue) : [];
    return from(addresses);
  }

  addContractAddressForOwner(owner: string, address: string): string[] {
    let lsValue = localStorage.getItem(this.addresses_prefix + owner);
    let addresses: string[] = lsValue ? JSON.parse(lsValue) : [];
    addresses.push(address);
    this.setContractAddressesForOwner(owner, addresses);
    return addresses;
  }

}
