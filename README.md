# InovaAngularControlValueAccessor

Dieses Projekt dient als kleine Lernaufgabe, um:
1. Den Umbau einer bestehenden Komponente auf das reaktive Paradigma und OnPush Change-Detection zu üben
2. Eigene Form-Elemente mit ControlValueAccessor-Interface (https://angular.dev/api/forms/ControlValueAccessor) umsetzen zu können
3. Benutzerdefinierte Validierung mit Validator-Interface (https://angular.dev/api/forms/Validator) der Form umzusetzen

Der Teil unter `ausganglage` soll so refactored werden, dass der Auftrag unten erfüllt ist. 

## Fachliche Ausgabgslage

Die Applikation enthält einen Dummy-Editor für eine E-Banking Zahlung.
Der Benutzer kann folgende Daten eingeben:
- Name
- IBAN des Zahlungskontos
- IBAN des Zahlungsempfängers
- Betrag

Die Checksumme einer eingegebenen IBAN wird validiert.

Wird ein valider Zahlungsempfänger definiert, dann werden Pseudo-Infos zu diesem Konto geladen und angezeigt.

Es kann entweder eine Zahlung ausgelöst werden (alert erscheint im Browser) oder die Form zurückgesetzt werden.

Die Werte werden noch nicht validiert, dies ist der dritte und letzte Teil des Auftrags.

## Aufteilung der App

Unter `ausgangslage` liegt der ursprüngliche Code, mit dem gearbeitet werden kann.
Bitte Änderungen nicht committen.

Unter `finalisiert` liegt ein fix-fertiger Vorschlag, welcher als Vorlage genutzt werden kann, wenn man irgendwo ansteht.
Bitte nicht verändern.

Im Menü kann zwischen den beiden Varianten für einen Vergleich umgeschaltet werden.

## Tipps fürs Testen

Valide IBANs lassen sich z.B. unter http://www.randomiban.com/?country=Switzerland generieren.

## Auftrag

Der Editor und der IBAN-Input sollen beide reaktiv mit OnPush Change-Detection gestaltet werden.
Daneben soll der IBAN-Editor mit ngModel und ngModelChange funktionieren können. Dafür ist das Implementieren des ControlValueAccessor-Interface nötig.
Zum Schluss soll die verwendete ngForm in der Lage sein, den IBAN-Editor bei Änderungen der Daten zu validieren. Dazu muss das Validator-Interface implementiert werden.

Die Nachfolgenden aufzählungen dienen als optionaler Leitfaden für die Erreichung der Ziele.

**Reaktiver Ansatz:**
1. Umstellen der Komponenten auf OnPush Change-Detection
2. Entfernen aller manueller Change-Detection Triggers und Injects von ChangeDetectionRef (sauberer reaktiver Ansatz braucht das später nicht mehr)
3. Datenhaltung mit BehaviorSubjects
4. Account-Info reaktiv lesen und async Pipe im Template verwenden
5. In den Templates alle `[(ngModel)]` durch getrennte Inputs und Outputs ersetzen und onChange-Funktionen einführen und async Pipe verwenden
6. Funktionalität testen

**IBAN-Input als ControlValueAccessor:**
1. Implementieren des ControlValueAccessor-Interface auf dem IBAN-Input (setDisabledState kann weggelassen werden)
2. Datenhaltung umbenennen zu value$ (optional)
3. setValue-Funktion implementieren mit gesteuertem Triggern von onChange und onTouched nach Bedarf
4. setValue-Funktion verwenden, anstatt value$.next(...)
4. Neuer ControlValueAccessor providen
5. Löschen des Inputs und des Outputs des IBAN-Inputs und im Template ersetzen durch ngModel und ngModelChange
6. name-Attribut auf IBAN-Input definieren, damit ngModel Funktioniert
7. Funktionalität testen

**Validierung umsetzen**
1. Implementieren des Validator-Interfaces auf dem IBAN-Input
2. Neuer Validator providen
3. Validierung implementieren: wenn countryCode oder account leer, dann required. Wenn Checksumme nicht valide, dann invalid.
4. Name und Betrag im Editor als Required flaggen
5. Betrag Minimum auf 1 setzen im Template
5. Submit-Button disablen, wenn Form invalid 
6. Funktionalität testen

Viel Erfolg! :)
