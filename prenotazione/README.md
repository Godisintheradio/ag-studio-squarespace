# Modulo Prenotazione AG Studio

Versione di sviluppo della card interattiva per Squarespace 7.1.

## Installazione

1. Crea la Hero con gli strumenti nativi Squarespace (non è inclusa nel codice).
2. Aggiungi un **blocco Codice** nella sezione delle consulenze.
3. Incolla integralmente il contenuto di `prenotazione-modulo.html` e assicurati che il piano supporti JavaScript personalizzato.
4. Alla sezione contenente il blocco nativo **Squarespace Scheduling / Acuity** assegna l'ID HTML `ag-calendario` (o inserisci un elemento ancoraggio con lo stesso ID immediatamente prima). Il pulsante unico punta a `#ag-calendario`.
5. Verifica la resa da desktop/mobile e il funzionamento della selezione prima della pubblicazione.

## Comportamento e limiti

- Selezionare un servizio aggiorna il preventivo; **non** seleziona automaticamente la tipologia corrispondente nel calendario Acuity.
- L'ancoraggio porta al calendario, senza prenotare né pagare.
- Non ci sono raccolta dati, coupon, calendari fittizi o checkout nel modulo.
- I nomi dei provider di pagamento sono etichette testuali, **non loghi ufficiali**.
- WhatsApp è inteso soltanto per comunicazioni organizzative e domande semplici che non richiedono operatività al PC fuori dalle lezioni.
- Le condizioni della rateizzazione sono stabilite dal provider al checkout.
- Non caricare link di pagamento Stripe fino alla relativa fase di integrazione.

## Prove prima del rilascio

- Prova tutte le tre selezioni e il cambio di prezzo/benefici.
- Controlla che l'ancoraggio sia presente e funzioni in pagina.
- Controlla mobile a 375px e desktop largo; verifica il contrasto e la navigazione da tastiera.
- Verifica eventuali differenze tra editor Squarespace e sito pubblicato.
