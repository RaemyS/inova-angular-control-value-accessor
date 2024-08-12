import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {

  provideAccountInfo(iban: string) {
    if (this.validateIban(iban)) {
      return 'Hans Mustermann, Dödelstrasse 69, 1716 Plaffeien'
    }

    return '';
  }

  validateIban(iban: string) {
    // Entferne alle Leerzeichen und mache Großbuchstaben daraus
    iban = iban.replace(/\s+/g, '').toUpperCase();

    // IBAN muss zwischen 15 und 34 Zeichen lang sein
    if (iban.length < 15 || iban.length > 34) {
      return false;
    }

    // Verschiebe die ersten vier Zeichen (Länderkennung und Prüfziffer) ans Ende der IBAN
    const rearrangedIban = iban.slice(4) + iban.slice(0, 4);

    // Ersetze Buchstaben durch entsprechende Zahlen (A=10, B=11, ..., Z=35)
    const numericIban = rearrangedIban.replace(/[A-Z]/g, (match) => {
      return (match.charCodeAt(0) - 55).toString();
    });

    // Wandle die Zeichenkette in eine Zahl um und prüfe, ob die Modulo 97 Operation 1 ergibt
    const checksum = BigInt(numericIban) % 97n;

    return checksum === 1n;
  }
}
