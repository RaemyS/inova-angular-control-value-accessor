import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {AccountInfoService} from "../../../shared/account-info.service";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {IbanModel} from "../../../shared/models";

@Component({
  selector: 'app-iban-input',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IbanInputFinalComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IbanInputFinalComponent),
      multi: true,
    },
  ],
  templateUrl: './iban-input-final.component.html',
  styleUrl: './iban-input-final.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IbanInputFinalComponent implements ControlValueAccessor, Validator {
  value$ = new BehaviorSubject<IbanModel>({
    countryCode: '',
    account: '',
    isChecksumOk: false
  });

  protected onChange: (value: IbanModel) => void = () => {
    return;
  };

  protected onTouched: () => void = () => {
    return;
  };

  protected onValidatorChange: () => void = () => {
    return;
  };

  private readonly accountInfoService = inject(AccountInfoService);

  writeValue(value: IbanModel): void {
    if (!value) {
      return;
    }
    this.setValue(value, false);
  }

  registerOnChange(fn: (value: IbanModel) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  public validate(_: AbstractControl): ValidationErrors | null {
    if (!this.value$.value.countryCode || !this.value$.value.account) {
      return {
        required: true,
      };
    }

    if (!this.value$.value.isChecksumOk) {
      return {
        invalid: true,
      };
    }

    return null;
  }

  onCountryCodeChange(countryCode: string) {
    const isChecksumOk = this.accountInfoService.validateIban([countryCode, this.value$.value.account].join(''))
    this.setValue({...this.value$.value, countryCode, isChecksumOk}, true);
  }

  onAccountChange(account: string) {
    const isChecksumOk = this.accountInfoService.validateIban([this.value$.value.countryCode, account].join(''))
    this.setValue({...this.value$.value, account, isChecksumOk}, true);
  }

  protected setValue(value: IbanModel, emitEvent: boolean): void {
    this.value$.next(value);
    if (emitEvent && this.onChange && this.onTouched) {
      this.onChange(value);
      this.onTouched();
    }
  }
}
