import {Component, Input} from '@angular/core';
import {EventModel} from '../models/eventModel';

@Component({
  selector: 'app-contract-event-card',
  templateUrl: './contract-event-card.component.html',
  styleUrls: ['./contract-event-card.component.css']
})
export class ContractEventCardComponent {

  @Input() log?: EventModel;

}
