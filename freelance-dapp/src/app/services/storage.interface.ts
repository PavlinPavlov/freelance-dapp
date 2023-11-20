import {Observable} from 'rxjs';

export interface StorageAccessor {
  getContractAddressesForOwner(owner: string): Observable<string>;

  setContractAddressesForOwner(owner: string, addresses: string[]): void;

  addContractAddressForOwner(owner: string, address: string): string[];
}
