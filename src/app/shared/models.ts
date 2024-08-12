export interface PaymentModel {
  name: string;
  sourceIban: IbanModel;
  targetIban: IbanModel;
  amount: number;
}

export const DEFAULT_PAYMENT_MODEL = {
  name: '',
  sourceIban: {countryCode: '', account: '', isChecksumOk: false},
  targetIban: {countryCode: '', account: '', isChecksumOk: false},
  amount: 0,
} satisfies PaymentModel

export interface IbanModel {
  countryCode: string,
  account: string,
  isChecksumOk: boolean
}
