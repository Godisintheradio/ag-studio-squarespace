# Offerta reel per le imprese

Componente autonomo per la sezione “Scegli il punto di partenza” del sito di Antonio Giardiello. Versione 1.0.0.

## Contenuto

- Due schede di produzione: quattro montaggi a 200 € oppure riprese e quattro montaggi a 350 €.
- Singolo montaggio a 60 €.
- Consulenza opzionale di 100 € per il progetto di quattro contenuti.
- Aggiornamento dei totali a 300 € e 450 € quando si attiva la consulenza.
- Link di richiesta aggiornati in base al servizio selezionato. Il singolo montaggio rimane a 60 € e non include la consulenza.
- HTML, CSS, icone SVG e logica contenuti nel solo file `ag-reel-offerta.js`.

Gli importi sono prima dell'eventuale IVA e degli oneri applicabili, da chiarire nel preventivo. Nessun pagamento o invio di messaggi viene eseguito dal componente.

## Installazione in Squarespace

Inserire un blocco Codice a tutta larghezza, in modalità HTML con Mostra sorgente disattivato:

```html
<script
  src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@main/reel/ag-reel-offerta.js"
  defer
></script>
```

Lo script va collocato nel blocco Codice del contenuto, non nell'iniezione globale dell'header. Non serve incollare separatamente HTML o CSS. Installare una sola istanza per pagina. Per una versione immutabile sostituire `main` con lo SHA del commit verificato.

## Collegamento delle richieste

Se nella pagina esiste un elemento con `id="contatto"`, i pulsanti portano a quella sezione. Se contiene una select `name="servizio"` o `id="servizio"`, il valore viene impostato quando esiste l'opzione corrispondente: `editing`, `riprese`, `editing-b`, `riprese-b` oppure `singolo`.

Se la sezione non esiste, i pulsanti aprono una bozza email a `info@antoniogiardiello.it`, con servizio e compenso selezionati; è il visitatore a completarla e inviarla.

Per un altro destinatario o un'altra ancora:

```html
<script
  src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@main/reel/ag-reel-offerta.js"
  data-email="info@antoniogiardiello.it"
  data-contact="#contatto"
  defer
></script>
```

Se viene trovata la sezione contatti, lo script emette anche l'evento DOM `ag-reel:select` con `detail.service`, `detail.consultancy` e `detail.price`. Non raccoglie dati personali, non usa storage e non aggiunge analytics o servizi di terze parti oltre al caricamento del file da CDN.

## Isolamento e manutenzione

Gli stili sono limitati al contenitore `#ag-reel-offerta`. Non modifica font, bottoni o form nel resto del sito. Non dipende da altre icone, librerie, file del mockup o script globali. Il font viene ereditato dal sito.

La fonte eseguibile è `ag-reel-offerta.js`: mantiene markup, CSS e logica nello stesso file, come gli altri loader del repository. `squarespace-code-block.html` contiene lo snippet di installazione.

## Verifiche prima del rilascio

- Sintassi JavaScript valida.
- Collaudo in una pagina di prova con script dentro il contenuto HTML.
- Importi 200/350 e 300/450, attivazione e disattivazione anche da tastiera.
- Link email con servizio e prezzo coerenti; singolo a 60 € anche quando la consulenza è selezionata.
- Layout desktop, tablet e mobile e controllo dello scorrimento orizzontale.

Il collaudo avviene in una pagina isolata. La resa nel tema Squarespace e il collegamento al modulo reale vanno controllati dopo l'inserimento nel sito.

## Rimozione

Rimuovere il blocco Codice dalla pagina. Nessuna impostazione globale viene modificata.
