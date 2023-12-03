import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ContractModel} from '../models/contract.model';
import {BlockchainService} from '../services/blockchain.service';
import {LocalStorageService} from '../services/local-storage.service';
import {catchError, concatMap, filter, map, mergeMap, switchMap} from 'rxjs/operators';
import {EMPTY, forkJoin, from, Observable, of} from 'rxjs';
import {utils} from 'ethers';
import {UtilityService} from '../services/utility.service';


@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  @Output() activeContract = new EventEmitter<ContractModel>();
  focusedContract!: ContractModel;
  contracts$: Observable<ContractModel> = EMPTY;
  contracts: ContractModel[] = [];

  blockchainService: BlockchainService;
  contractAccessor: LocalStorageService;

  constructor(
    blockchainService: BlockchainService,
    contractAccessor: LocalStorageService) {
    this.blockchainService = blockchainService;
    this.contractAccessor = contractAccessor;
  }


  async ngOnInit() {
    this.contracts$ = this.getContracts();
    this.contracts$.subscribe(data => {
      this.contracts.unshift(data);
    });
  }

  onContractClicked(contract: ContractModel) {
    this.activeContract.emit(contract);
  }

  getAddresses(): Observable<string> {
    return from(this.blockchainService.getSigner().getAddress()).pipe(
      switchMap(address => {
        return from(this.contractAccessor.getContractAddressesForOwner(address));
      })
    );
  }

  getContracts(): Observable<ContractModel> {
    return this.getAddresses().pipe(
      mergeMap(address => this.blockchainService.fromAddress(address)),
      mergeMap(contract =>
        forkJoin({
          contract: of(contract),
          owner: contract.owner(),
          recipient: contract.recipient(),
          balance: this.blockchainService.getBalance(contract.address),
          metadata: contract.metadata()
        })
      ),
      map(({contract, owner, recipient, balance, metadata}) =>
        new ContractModel(
          contract.address,
          owner,
          recipient,
          UtilityService.getEtherAmount(utils.formatEther(balance)),
          metadata.title,
          metadata.description
        )
      )
    );
  }
}

// getContracts() {
//   return this.getAddresses().pipe(
//     filter((value: string | null): value is string => value !== null),
//
//     switchMap((address: string) => {
//       return this.blockchainService.fromAddress(address);
//     }),
//
//     switchMap((contract) => {
//       return forkJoin({
//         owner: contract.owner(),
//         recipient: contract.recipient(),
//         metadata: contract.metadata()
//       }).pipe(
//         map(({owner, recipient, metadata}) => {
//           return new ContractModel(contract.address, owner, recipient, metadata.title, metadata.description);
//         })
//       );
//     }),
//
//     catchError((error) => {
//       console.error('An error occurred:', error);
//       return of(null);  // Emit null or some error handling value
//     }),
//
//     filter((contractModel: ContractModel | null): contractModel is ContractModel => contractModel !== null),
//   );
// }

