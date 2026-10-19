# Modulo Prenotazione AG Studio

Versione di sviluppo della card interattiva per Squarespace 7.1.

## Installazione consigliata: una riga

Nel blocco Codice HTML di Squarespace usa **solo** questo richiamo (rimuovendo il precedente blocco completo):

```html
<script src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@feature/prenotazione-modulo/prenotazione/prenotazione-loader.js"></script>
```

Questo script inserisce HTML, CSS e comportamento dinamico in pagina. Verificare sul sito pubblicato: nell'editor Squarespace gli script esterni possono essere inibiti. La CDN jsDelivr può mantenere in cache i file di branch fino a circa 12 ore. Il file `prenotazione-loader.js` è una versione distribuibile derivata da `prenotazione-modulo.html`: **se modifichi l'HTML originale devi rigenerare e aggiornare anche il loader**. Evitare copie divergenti tra i due file.

## Installazione manuale alternativa

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
- Il pulsante **Acquista ora** nel riepilogo usa il collegamento Stripe corrispondente al servizio selezionato; si apre in una nuova scheda.
- L'acquisto non crea una prenotazione su Acuity. Se il cliente paga senza avere prenotato, è necessario concordare e inserire separatamente l'appuntamento.
- Stripe e Acuity non sono sincronizzati automaticamente: controllare l'abbinamento fra pagamento e appuntamento.

## Prove prima del rilascio

- Prova tutte le tre selezioni e il cambio di prezzo/benefici.
- Controlla che l'ancoraggio sia presente e funzioni in pagina.
- Controlla mobile a 375px e desktop largo; verifica il contrasto e la navigazione da tastiera.
- Verifica eventuali differenze tra editor Squarespace e sito pubblicato.
