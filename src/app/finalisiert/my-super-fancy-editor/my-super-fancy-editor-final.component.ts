import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IbanInputFinalComponent} from "./iban-input/iban-input-final.component";
import {FormsModule} from "@angular/forms";
import {AccountInfoService} from "../../shared/account-info.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {DEFAULT_PAYMENT_MODEL, IbanModel, PaymentModel} from "../../shared/models";

@Component({
  selector: 'app-my-super-fancy-editor',
  standalone: true,
  imports: [
    IbanInputFinalComponent,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './my-super-fancy-editor-final.component.html',
  styleUrl: './my-super-fancy-editor-final.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySuperFancyEditorFinalComponent implements OnInit {

  currentPaymentModel$ = new BehaviorSubject<PaymentModel>({...DEFAULT_PAYMENT_MODEL});
  currentTargetAccountInfo$!:  Observable<string>;

  private readonly accountInfoService = inject(AccountInfoService)

  ngOnInit(): void {
    this.currentTargetAccountInfo$ = this.currentPaymentModel$
      .pipe(
        map((currentPaymentModel) => {
          const targetIban = [currentPaymentModel.targetIban.countryCode, currentPaymentModel.targetIban.account].join('');
          return this.accountInfoService.provideAccountInfo(targetIban);
        }))
  }

  onSubmit() {
    const currentPaymentModel = this.currentPaymentModel$.value;

    const sourceIban = [currentPaymentModel.sourceIban.countryCode, currentPaymentModel.sourceIban.account].join('');
    const targetIban = [currentPaymentModel.targetIban.countryCode, currentPaymentModel.targetIban.account].join('');
    alert(`Zahlung von CHF ${currentPaymentModel.amount}.- (${sourceIban}) erstellt! An ${currentPaymentModel.name} (${targetIban})`);
    this.onResetForm();
  }

  onResetForm() {
    this.currentPaymentModel$.next({...DEFAULT_PAYMENT_MODEL});
  }

  onNameChange(name: string) {
    this.currentPaymentModel$.next({...this.currentPaymentModel$.value, name});
  }

  onAmountChange(amount: number) {
    this.currentPaymentModel$.next({...this.currentPaymentModel$.value, amount});
  }

  onSourceIbanChange(sourceIban: IbanModel) {
    this.currentPaymentModel$.next({...this.currentPaymentModel$.value, sourceIban});
  }

  onTargetIbanChange(targetIban: IbanModel) {
    this.currentPaymentModel$.next({...this.currentPaymentModel$.value, targetIban});
  }
}
