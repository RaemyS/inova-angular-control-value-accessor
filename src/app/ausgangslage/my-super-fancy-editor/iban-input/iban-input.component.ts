import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AccountInfoService} from "../../../shared/account-info.service";
import {AsyncPipe} from "@angular/common";
import {IbanModel} from "../../../shared/models";

@Component({
  selector: 'app-iban-input',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './iban-input.component.html',
  styleUrl: './iban-input.component.css',
})
export class IbanInputComponent {

  @Input()
  set iban(iban: IbanModel) {
    this.currentIbanModel = iban;
  }

  @Output()
  ibanChanged = new EventEmitter<IbanModel>();

  currentIbanModel: IbanModel = {
    countryCode: '',
    account: '',
    isChecksumOk: false
  }

  private readonly accountInfoService = inject(AccountInfoService);

  onCountryCodeChange(countryCode: string) {
    const isChecksumOk = this.accountInfoService.validateIban([countryCode, this.currentIbanModel.account].join(''))
    this.currentIbanModel = {...this.currentIbanModel, countryCode, isChecksumOk};
    this.ibanChanged.emit(this.currentIbanModel);
  }

  onAccountChange(account: string) {
    const isChecksumOk = this.accountInfoService.validateIban([this.currentIbanModel.countryCode, account].join(''))
    this.currentIbanModel = {...this.currentIbanModel, account, isChecksumOk};
    this.ibanChanged.emit(this.currentIbanModel);
  }
}
