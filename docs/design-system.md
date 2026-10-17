# AG Studio — Design System Master

**Versione:** 0.1 — struttura preliminare  
**Piattaforma:** Squarespace 7.1  
**Repository:** `Godisintheradio/ag-studio-squarespace`  
**Stato:** pianificazione; nessuno stile ancora approvato per la produzione

## Obiettivo

Costruire un sito essenziale, autorevole, accessibile e orientato a contatti qualificati. Sviluppare un sistema condiviso di regole, componenti e comportamenti anziché personalizzazioni isolate per ciascuna pagina.

## Vincoli architetturali

- Conservare l'installazione Squarespace 7.1 attuale e l'archivio portfolio esistente.
- Non rimuovere integrazioni con servizi esterni, verifiche, impostazioni ecommerce o automazioni senza un audit.
- Separare codice sorgente su GitHub e pubblicazione/gestione dei contenuti su Squarespace.
- Non inserire segreti, password, token o backup contenenti dati riservati nel repository pubblico.
- Non modificare CSS e JavaScript globali della produzione prima del relativo collaudo.
- Rendere ogni componente identificabile, riutilizzabile e reversibile.

## Principi visivi

1. **Essenzialità:** eliminare decorazioni superflue.
2. **Gerarchia:** dare priorità a titolo, proposta di valore e azione primaria.
3. **Coerenza:** usare token condivisi per colori, tipografia, spaziature e layout.
4. **Accessibilità:** rispettare navigazione da tastiera, contrasto, focus visibile, semantica e movimento ridotto.
5. **Responsive:** progettare per mobile, tablet e desktop senza dipendere da valori fragili specifici di una sola schermata.
6. **Manutenibilità:** limitare override aggressivi e uso di `!important`.

## Moduli previsti

- `css/ag-tokens.css` — colori, caratteri, spaziature, misure e transizioni.
- `css/ag-base.css` — regole base e tipografia.
- `css/ag-components.css` — bottoni, cards, moduli e sezioni condivise.
- `css/ag-responsive.css` — adattamenti responsive.
- `js/ag-core.js` — comportamenti condivisi, se necessari.
- `js/ag-portfolio-filter.js` — filtro portfolio modulare, dopo audit struttura collezione.
- `docs/squarespace-installation.md` — posizioni e istruzioni di installazione.
- `docs/changelog.md` — registro delle modifiche.

Le cartelle e i file sopra elencati sono pianificati, non ancora creati.

## Componenti prioritari

1. Header e navigazione.
2. Pulsanti e link.
3. Hero e sezioni editoriali.
4. Card progetti e portfolio.
5. Form di contatto e CTA.
6. Footer.
7. Filtro portfolio riutilizzabile.

## Decisioni da finalizzare prima del CSS

- Palette esatta e varianti di contrasto.
- Font e scala tipografica.
- Larghezze massime, griglia, gutter, spacing.
- Radius, bordi e motion.
- Struttura reale del portfolio Squarespace.
- Comportamenti e classi CSS da isolare in Squarespace 7.1.

## Protocollo di rilascio

1. Documentare l'intervento.
2. Sviluppare codice isolato nel repository.
3. Verificare compatibilità con Squarespace 7.1.
4. Testare desktop, tablet, mobile, tastiera e moduli.
5. Installare sul sito protetto solo dopo verifica.
6. Registrare gli interventi nel changelog.

## Ambito del repository pubblico

Il repository contiene solo codice e documentazione che possono essere pubblicati. Eventuali prodotti commerciali dell'AG Code Shop avranno sorgenti separati e privati.

## Nota

Questo documento registra una base di lavoro, non equivale all'approvazione definitiva del sistema visivo. I valori dei design token saranno definiti dopo una revisione della direzione grafica.
