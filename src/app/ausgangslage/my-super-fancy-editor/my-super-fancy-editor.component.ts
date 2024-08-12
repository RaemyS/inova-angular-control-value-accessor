import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {IbanInputComponent} from "./iban-input/iban-input.component";
import {FormsModule} from "@angular/forms";
import {AccountInfoService} from "../../shared/account-info.service";
import {DEFAULT_PAYMENT_MODEL, PaymentModel} from "../../shared/models";

@Component({
  selector: 'app-my-super-fancy-editor',
  standalone: true,
  imports: [
    IbanInputComponent,
    FormsModule,
  ],
  templateUrl: './my-super-fancy-editor.component.html',
  styleUrl: './my-super-fancy-editor.component.css',
})
export class MySuperFancyEditorComponent {

  currentPaymentModel: PaymentModel = {...DEFAULT_PAYMENT_MODEL};

  private readonly accountInfoService = inject(AccountInfoService)
  private readonly cdr = inject(ChangeDetectorRef)

  onSubmit() {
    const sourceIban = [this.currentPaymentModel.sourceIban.countryCode, this.currentPaymentModel.sourceIban.account].join('');
    const targetIban = [this.currentPaymentModel.targetIban.countryCode, this.currentPaymentModel.targetIban.account].join('');
    alert(`Zahlung von CHF ${this.currentPaymentModel.amount}.- (${sourceIban}) erstellt! An ${this.currentPaymentModel.name} (${targetIban})`);
    this.onResetForm();
  }

  onResetForm() {
    this.currentPaymentModel = {...DEFAULT_PAYMENT_MODEL};
    this.cdr.markForCheck();
  }

  getTargetAccountInformation() {
    return this.accountInfoService.provideAccountInfo([this.currentPaymentModel.targetIban.countryCode, this.currentPaymentModel.targetIban.account].join(''));
  }
}
