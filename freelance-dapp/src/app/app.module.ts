import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ContractListComponent} from './contract-list/contract-list.component';
import {ContractCardComponent} from './contract-card/contract-card.component';
import {ContractDetailComponent} from './contract-detail/contract-detail.component';
import {HeaderComponent} from './header/header.component';
import {ContractCreateComponent} from './dialogs/contract-create/contract-create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {VerifyComponent} from './buttons/verify/verify.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CreateComponent} from './buttons/create/create.component';
import {FormsModule} from '@angular/forms';
import {AddComponent} from './buttons/add/add.component';
import {ContractAddComponent} from './dialogs/contract-add/contract-add.component';
import {SignComponent} from './buttons/sign/sign.component';
import {SignMessageComponent} from './dialogs/sign-message/sign-message.component';
import {RedeemFormComponent} from './redeem-form/redeem-form.component';
import {MatIconModule} from '@angular/material/icon';
import {ContractEventListComponent} from './contract-event-list/contract-event-list.component';
import {ContractEventCardComponent} from './contract-event-card/contract-event-card.component';
import {TimestampToDatePipe} from './timestamp-to-date.pipe';
import {CloseComponent} from './buttons/close/close.component';

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    ContractCardComponent,
    ContractDetailComponent,
    HeaderComponent,
    ContractCreateComponent,
    VerifyComponent,
    CreateComponent,
    AddComponent,
    ContractAddComponent,
    SignComponent,
    SignMessageComponent,
    RedeemFormComponent,
    ContractEventListComponent,
    ContractEventCardComponent,
    TimestampToDatePipe,
    CloseComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
