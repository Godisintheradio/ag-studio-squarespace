# AG Studio — Day / Night

Questa cartella raccoglie gli interventi CSS di compatibilità del sistema Giorno/Notte di AG Studio su Squarespace 7.1. La versione commerciale standalone sarà sviluppata separatamente, senza modificare il comportamento già collaudato del sito.

## File presenti

- `ag-section-backgrounds.css` — nasconde in modalità notte immagini e video di sfondo delle sezioni standard e Full Bleed; ripristina la normale resa passando alla modalità giorno.
- `ag-services-reviews-bridge.css` — adattamento cromatico dei componenti Servizi e Testimonianze al tema scuro.

## Selettore condiviso

Tutti i correttivi qui presenti fanno riferimento a `html[data-ag-theme="dark"]`, impostato dal sistema Giorno/Notte principale.

## Installazione del correttivo sfondi

Inserire nella **Code Injection → HEADER** di Squarespace:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@fe6cfdc65fcfeac7e18f5776a931a4f524f02e21/ag-day-night/ag-section-backgrounds.css">
```

Rimuovere dal CSS personalizzato di Squarespace **soltanto** i due blocchi precedenti per gli sfondi delle sezioni e le Hero Full Bleed, per evitare duplicati.

## Limiti e test

- Non nasconde immagini e video inseriti come normali blocchi di contenuto.
- Nascondere un video con CSS non garantisce l'interruzione del download o della riproduzione.
- Verificare con attenzione anche eventuali background implementati da Code Block personalizzati.
- Testare sezioni standard e Full Bleed in modalità giorno e notte, sia desktop sia mobile.
- Per i siti clienti futuri preferire riferimenti versionati rispetto a `@main`.
