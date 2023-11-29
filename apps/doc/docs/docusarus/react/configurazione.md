# Configurazione di Reactjs

La configurazione di un progetto in ReactJS è un passo essenziale per iniziare a sviluppare applicazioni web basate su React. Ecco alcune ragioni per le quali la configurazione è necessaria:

- **Creazione di un Ambiente di Sviluppo :** La configurazione consente di creare un ambiente di sviluppo in cui è possibile scrivere, testare e eseguire il codice React. Ciò include la configurazione di strumenti come Webpack, Babel e altri, che sono essenziali per la trasformazione del codice React in un formato che il browser può comprendere.

- **Gestione delle Dipendenze :** React spesso viene utilizzato insieme ad altre librerie e framework, come Redux per la gestione dello stato. La configurazione aiuta a gestire queste dipendenze e a integrarle nel progetto in modo che possano funzionare insieme senza problemi.

- **Supporto per il Moderno Sviluppo Frontend :** La configurazione di uno strumento di bundling come Webpack consente di gestire i moduli, le immagini, lo stile e altre risorse nel progetto React. Questo è fondamentale per affrontare le esigenze moderne dello sviluppo frontend.

- **Compatibilità con i Browser :** La configurazione include spesso l'uso di Babel per compilare il codice React in una forma comprensibile per i browser più vecchi e garantire la massima compatibilità.

- **Ambiente di Produzione Ottimizzato :** La configurazione non è solo per lo sviluppo; è anche importante ottimizzare il progetto per l'ambiente di produzione. Ciò potrebbe includere la minimizzazione del codice, l'eliminazione di risorse non utilizzate e altre ottimizzazioni per migliorare le prestazioni dell'applicazione.

- **Gestione dello Stato e del Routing :** In molte applicazioni React, è necessario gestire lo stato globale dell'applicazione e gestire la navigazione tra diverse pagine. Strumenti come Redux per la gestione dello stato e React Router per la navigazione richiedono una configurazione adeguata.

- **Test Unitari e Integrazione :** La configurazione del progetto può includere anche la preparazione per test unitari e di integrazione. L'uso di strumenti come Jest e Enzyme per testare il codice React è un passo importante per garantire la qualità del software.

In sintesi, la configurazione di un progetto Reactjs è un passo critico per creare un ambiente di sviluppo robusto, gestire dipendenze, garantire la compatibilità con i browser e ottimizzare l'applicazione per la produzione. Facendo ciò, si crea una base solida per lo sviluppo di applicazioni web moderne e scalabili.

## Le dipendenze di javascript

In JavaScript, il termine "dipendenze" si riferisce a librerie o moduli esterni che un progetto utilizza per svolgere determinate funzioni o gestire specifiche funzionalità. Le dipendenze possono essere di diversi tipi, e la loro inclusione nel progetto è necessaria per garantire che il codice funzioni correttamente.

Ecco alcuni tipi comuni di dipendenze in JavaScript:

- **Librerie Esterne :** Sono insiemi di funzionalità predefinite scritte da altri sviluppatori. Ad esempio, jQuery è una libreria esterna che semplifica la manipolazione del DOM e le chiamate AJAX.

- **Framework :** Sono insiemi più ampi di librerie che forniscono una struttura o un modello per lo sviluppo. Ad esempio, Angular, React e Vue sono framework che semplificano lo sviluppo di interfacce utente complesse.

- **Moduli npm (Node Package Manager) :** In ambiente Node.js, le dipendenze vengono spesso gestite attraverso npm. Questi moduli possono essere librerie o strumenti che facilitano varie attività, come la gestione dello stato (Redux), la gestione delle rotte (Express), o qualsiasi altra funzionalità necessaria.

- **Plugin o Estensioni :** Alcuni progetti richiedono funzionalità aggiuntive che possono essere fornite da plugin o estensioni. Ad esempio, in un contesto di sviluppo web, si potrebbero utilizzare plugin per la gestione delle animazioni o per l'interazione con API esterne.

Quando sviluppi un progetto JavaScript, è importante dichiarare e gestire correttamente le dipendenze. Questo è spesso fatto attraverso file di configurazione specifici del progetto, come package.json in progetti Node.js. Questi file contengono un elenco delle dipendenze necessarie, insieme alle rispettive versioni. Quando si avvia un nuovo progetto o si lavora su di esso su un nuovo ambiente, le dipendenze possono essere installate utilizzando uno strumento come npm o Yarn. Questi strumenti scaricano e installano automaticamente le dipendenze elencate nel file di configurazione.

### Creazione del file package.json

Creiamo prima la cartella del progetto :

`$ mkdir <YOUR_APP_DIRECTORY>`
`$ cd <YOUR_APP_DIRECTORY>`

`<YOUR_APP_DIRECTORY>` lo sostiamo con my-project o un nome a piacere per il vostro progetto.

Dentro la cartella creata diamo il seguente comando per generare il file package.json :

`npm init -y`

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Aprendo il file generato troviamo questi voci :

- name : il nome del progetto
- versione : la versione che cambia in base alle nuove funzionalità
- description : la descrizione del progetto
- main : il file principale del progetto
- scripts : i comandi da eseguire per fare le diverse operazioni di gestione del progetto
- keywords : le parole chiavi che rappresentano il nostro progetto
- author : il nome del autore del progetto, in genere seguito dal indirizzo email
- license : il tipo di licenza che può essere per esempio proprietaria o open source.

### Installiamo react e react-dom

Dal terminale dove abbiamo creato il file package.json diamo il seguente comando :

`npm install react react-dom`

Il nostro file package.json ora presenta la voce dependencies (dipendenze) con elencate le due librerie di react appena installate con npm, dopo il nome troviamo il numero di versione :

```json
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

### Prepariamo la struttura della cartella del progetto

```txt
my-project
│   README.md
|   package.json
│
└───public
│    index.html
│
└───src
|    index.js
|    app.js
|
└───node_modules
│   └───react
│   └───react-dom
```

Dentro a my-project troviamo i seguenti file preceduti dal nome cartella rispetto a my-project

- **package.json** : visto in precedenza
- **README.md** qui nel formato Markdown presentiamo il progetto e descriviamo i comando, le impostazioni o altro per poterlo gestire.
- **public** :  la cartella public è la cartella che viene vista dal browser, qui inseriamo oltre al file HTML le immagini e le altre risorse.
- **public/index.html** : questo è l' unico file HTML necessario.
- **src** : in questa cartella inseriamo il nostro codice del progetto, my-project che contiene src serve per raccogliere i file di configurazione e il README.md
- **src/index.js** è il file che permette di lanciare Reactjs e il suo componente padre *src/app.js* dove definiamo la struttura del nostro progetto.
- **node_modules** raccoglie le librerie installate con npm, nel nostro caso react e react-dom

Creiamo il contenuto dei files principali :

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>React Minimal</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

Quello che ci interessa è :

*`<div id="app"></div>`* qui è dove viene inserito il rendering di react
 *`<script type="module" src="./index.js"></script>`* qui includiamo il nostro file *index.js* che fa partire Reactjs.

`src/index.js`

```javascript
import { createRoot } from "react-dom/client";
import App from "./components/App";
const root = createRoot(document.getElementById("app"));
root.render(<App />);
```

Con creareRoot includiamo react nel div visto prima, e lanciamo il render del componente App importato. Questi due file generalmente non vengono più modificati.

`src/components/App.jsx`

```javascript
export default function App() {
  return <div>Hello!</div>;
}
```

Qui definiamo il nostro componente principale generalmente la home page o il layout della applicazione o deve definiamo i dati globali e la navigazione.

Quello che ci manca è mettere insieme il codice tramite un bundler.

## Il bundler del progetto

In Reactjs, un bundler è uno strumento software che raggruppa e organizza tutti i file sorgente di un'applicazione in un unico pacchetto ottimizzato per la distribuzione. Il bundling è un processo fondamentale nello sviluppo di applicazioni web moderne, in quanto consente di gestire in modo efficiente la complessità di progetti che possono essere composti da molti file JavaScript, CSS, immagini e altri asset.

Ecco alcune caratteristiche chiave di un bundler in Reactjs:

- **Raggruppamento di Moduli** : Reactjs utilizza il concetto di moduli per organizzare il codice in componenti riutilizzabili. Un bundler consente di utilizzare il sistema di moduli di JavaScript (come CommonJS, ES6 Modules) e di raggruppare tutti i moduli in un unico file o in più file, a seconda della configurazione.

- **Risoluzione delle Dipendenze** : Un bundler risolve automaticamente le dipendenze tra i moduli. Ciò significa che, se il tuo progetto React utilizza diverse librerie o moduli di terze parti, il bundler si occupa di organizzare il caricamento di tali moduli in modo che tutto funzioni correttamente.

- **Ottimizzazione del Codice** : Durante il processo di bundling, il codice sorgente può essere ottimizzato per migliorare le prestazioni. Ciò include attività come la minificazione (riduzione delle dimensioni del codice), l'eliminazione di codice morto e l'organizzazione delle risorse in modo più efficiente.

- **Gestione delle Risorse Statiche** : Oltre ai file JavaScript, un bundler può gestire anche altri tipi di risorse come fogli di stile CSS, immagini, font, ecc. Queste risorse vengono solitamente trattate come moduli e incluse nel bundle finale.

- **Hot Module Replacement (HMR)** : Alcuni bundler, come Webpack, supportano l'Hot Module Replacement, una funzionalità che consente agli sviluppatori di vedere le modifiche apportate al codice in tempo reale senza ricaricare l'intera pagina. Questo è particolarmente utile durante lo sviluppo per velocizzare il ciclo di feedback.

Uno dei bundler più comuni utilizzati in progetti React è Webpack. Tuttavia, ci sono anche altri bundler come Parcel e Rollup che vengono utilizzati in diversi contesti. L'uso di un bundler è essenziale per gestire la complessità crescente delle applicazioni React e per preparare il codice per la produzione in modo efficiente.

### Parcel, il metodo più veloce per iniziare subito

Il metodo più veloce e più semplice è l' utilizzo di Parcel in quanto ci permette di non dover configurare nulla, consigliato per chi è alle prime armi o non si hanno particolari esigenze di configurazione .

installiamo Parcel :

`npm install parcel -D`

Aggiungiamo queste righe al nostro file package.json

```json
{
  "type": "module",
  "source": "public/index.html",
  "scripts": {
    "dev": "parcel",
    "build": "parcel build"
  },
}
```

Ora il nostro file package.json si presente nel modo seguente :

```json
{
  "name": "prj_startup",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "source": "public/index.html",
  "scripts": {
    "dev": "parcel",
    "build": "parcel build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "parcel": "^2.10.3"
  }
}
```

**source** sarebbe la chiave **"main"** che Specifica il punto di ingresso principale per il tuo modulo o applicazione Node.js. Ad esempio, "main": "index.js" indica che il file principale è index.js, in questo caso viene utilizzata in modo specifico source piuttosto che main da Parcel per indicare il file html della pagina che non è codice javascript lasciando cosi se serve libera la chiave main.

**"scripts"** contiene comandi che possono essere eseguiti tramite npm. Ad esempio, `"scripts": { "start": "node server.js" }` consente di eseguire npm start per avviare il server utilizzando node server.js.

Qui usiamo **dev** e **build**, rispettivamente, dev non crea il bundle ma fa partire un server web per usare la nostra applicazione. Dove serve compila il codice se ad esempio usiamo typescript, build tuttavia crea il bundle ottimizzato e pronto pronto per la distribuzione su altri server che non siano di dev cioè di sviluppo per lo sviluppatore. I nomi dev e buid sono a piacimento ma questi sono quelli convenzionali cosi altri sviluppatori comprendono a cosa servono questi comandi elencati.

**"dependencies"** qui vengono elencate le dipendenze nel nostro caso i files di react che abbiamo incluso con `npm install`

**"devDependencies"** dentro a questa chiave troviamo "parcel": "^2.10.3", parcel è stato quindi distinto rispetto a react, infatti abbiamo aggiunto parcel con il comando :

`npm install parcel -D`

abbiamo aggiunto un -D finale che indica di inserire le dipendenze nella voce devDependencies rispetto a dependencies, senza questo comando `-D` avremo trovato parcel dentro a `dependencies` e il progetto si avvia senza problemi ugualmente.
Quindi come mai questa distinzione ?

Il motivo è che quando creiamo il bundle del applicazione pronto per essere servito da un server node qualsiasi, non dobbiamo includere parcel del bundle o pacchetto finale, esso è utile solo per lo sviluppo.

### Creiamo il bundle del progetto

`npm run buld` questo comando crea il nostro bundle.
Una volta lanciato crea la cartella dist dentro nella cartella principale, con i seguenti file :

index.c7b8da5f.js, index.c7b8da5f,js.map e index.html

il codice c7b8da5f è una stringa casuale per distinguerli da eventuali file con lo stesso nome, i vostri file si troverrano con questa parte di nome/codice diverso.

proviamo ad aprire index.html e index.c7b8da5f.js, e vediamo che l html che avevamo scritto ora si trova tutto su una riga dove bisogna scorrere di lato per vedere la sua fine, questo è appunto l 'ottomizazione dei files che vengono ridotti quanto possibile eliminando spazi e ritorni a capo.

**I files .map**
E a cosa server quindi il file index.c7b8da5f,js.map o in generale con estensione finale .map ?

Qsuesto file raccoglie il codice originale se ci dovesse servire di vederlo per eventuali bug nella versione detta in PRODUZIONE quella ottimizzata, che viene caricato se si aprono gli strumenti di sviluppo, come vediamo è molto più grande per il motivo che il codice non è compresso, ma per le perfomance della applicazione e il consumo della sua banda, non deve essere caricato se non richiesto.

## I moduli e la chiave "type":"module"

la voce `"type":"module"` contempla il concetto di moduli che andiamo meglio ad analizzare :

I moduli sono i nostri file di codice dove presentano le voci *import* per importare librerie esterne come ad esempio react nel nostro caso, e *export* che andiamo a vedere.

La chiave "type": "module" all'interno del file package.json in un progetto Node.js indica che il progetto utilizza il modulo ES (ECMAScript) nell'ambito di Node.js. Questa impostazione è stata introdotta con l'introduzione di ECMAScript Modules in Node.js a partire dalla versione 13.2.0.

Prima di questa introduzione, in Node.js, il sistema di moduli comune era basato su CommonJS, e il file principale del tuo progetto solitamente aveva l'estensione .js. Con l'introduzione dei moduli ES in Node.js, puoi ora utilizzare il formato di modulo standard di ECMAScript con l'estensione .mjs o senza estensione se "type": "module" è specificato nel package.json.

***ECMAScript*** questo termine può portare a confusione, per noi è un altro nome dato a javascript, la sua distinzione è che cè un ente che gestisce l' evoluzione della sua sintasse che deve essere indipendente, ricordiamo che javascript è stato scelto come nome per motivi commerciali che ricorda il lingiaggio java anche se è decisamente molto diverso, da qui il nome ES5, ES6 con numero per distinguere le versioni, ma che abbrevia il termine ECMAScript.

### Alcune considerazioni sui moduli

Estensione del File: Con "type": "module", i file di modulo possono utilizzare l'estensione .mjs o possono essere senza estensione. Ad esempio, puoi avere un file chiamato main.mjs come file principale dell'applicazione.

Importazione e Esportazione: Quando "type": "module" è attivo, i moduli utilizzano la sintassi di import/export di ES6. Ad esempio:

```javascript
Copy code
// Import
import { funzione } from './modulo';

// Esporta
export function funzione() {
    // ...
}
```

Scope dei Moduli: I moduli ES hanno uno scope dichiarato. Ciò significa che le variabili all'interno di un modulo non sono automaticamente accessibili da altri moduli a meno che non siano esportate esplicitamente.

Compatibilità: Se stai utilizzando "type": "module", assicurati che le librerie e i moduli di terze parti che stai utilizzando siano compatibili con i moduli ES. Alcuni pacchetti potrebbero richiedere aggiustamenti o potrebbero richiedere l'uso del formato CommonJS.

In sintesi, "type": "module" è una dichiarazione nel package.json che indica che il progetto Node.js utilizza il sistema di moduli ECMAScript. Questa impostazione è particolarmente utile se stai scrivendo nuovo codice utilizzando la sintassi di moduli ES o se stai migrando un progetto esistente a questa nuova convenzione.

### usare Create React App (CRA)  invece di Parcel

Molto utilizzato è il create react app che semplifica notevolmente il processo di avvio di un nuovo progetto React, fornendo una configurazione predefinita e uno schema di progetto preconfigurato. Ecco una breve descrizione di Create React App:

- **Bootstrap Rapido di Progetti React:** Create React App è progettato per permettere agli sviluppatori di avviare rapidamente progetti React senza dover affrontare la complessità della configurazione iniziale. Consente di iniziare a scrivere codice React in pochi minuti.

- **Configurazione Senza Sforzo:** CRA gestisce automaticamente la configurazione di webpack, Babel e altri strumenti necessari per lo sviluppo React. Gli sviluppatori non devono preoccuparsi di impostare manualmente tutte le configurazioni iniziali.

- **Struttura del Progetto Standardizzata:** Create React App definisce una struttura del progetto standardizzata con directory predefinite, come src per il codice sorgente, public per i file statici pubblici, e node_modules per le dipendenze.

- **Script npm Pronti all'Uso:** CRA fornisce uno script npm preconfigurato per azioni comuni come start per avviare il server di sviluppo, build per la creazione di un pacchetto ottimizzato per la produzione e test per l'esecuzione dei test.

- **Supporto per TypeScript e Sass:** Create React App supporta nativamente TypeScript e Sass, consentendo agli sviluppatori di utilizzare queste tecnologie senza dover configurare nulla manualmente.

- **Hot Module Replacement (HMR):** Integra l'Hot Module Replacement, che permette di vedere le modifiche al codice in tempo reale senza ricaricare l'intera pagina durante lo sviluppo.

- **Aggiornamenti Semplificati:** CRA offre uno script per la gestione semplificata degli aggiornamenti. Gli sviluppatori possono facilmente mantenere aggiornate le versioni degli strumenti utilizzati nel progetto.

## I diversi gestori di pacchetto

NPM è il gestore principale di node, ma altri sono stati con il tempo sviluppati.
Qui una breve descrizione dei tre gestori di pacchetti più comuni in ambiente Node.js: npm, Yarn e pnpm.

**npm (Node Package Manager) :**

Descrizione: npm è il gestore di pacchetti predefinito per Node.js e viene installato automaticamente con Node.js. Gestisce le dipendenze del progetto e consente di installare, aggiornare e rimuovere pacchetti Node.js. Caratteristiche principali :

- Ampia adozione e comunità attiva.
- Interfaccia da riga di comando ricca di funzionalità.
- Utilizza il file package.json per tenere traccia delle dipendenze.

**Yarn :**

Descrizione: Yarn è un gestore di pacchetti sviluppato da Facebook. È progettato per migliorare le prestazioni e l'affidabilità rispetto a npm. Yarn utilizza il file yarn.lock per garantire la riproducibilità delle versioni dei pacchetti. Caratteristiche principali:

- Maggior velocità e determinismo nell'installazione dei pacchetti.
- Capacità di installare pacchetti offline.
- Sicurezza migliorata con l'implementazione di Yarn Plug'n'Play.

**pnpm :**

Descrizione: pnpm è un gestore di pacchetti alternativo che adotta un'approcciato leggermente diverso rispetto a npm e Yarn. pnpm condivide le dipendenze tra i progetti, risparmiando spazio su disco e riducendo il tempo di installazione. Caratteristiche principali:

- Condivide le dipendenze tra progetti, risparmiando spazio su disco.
- Installazione più veloce grazie alla condivisione delle dipendenze.
- Utilizza uno spazio globale condiviso per i pacchetti.

***Cosa scegliere ??***

Scegliere tra npm, Yarn e pnpm dipende dalle esigenze del progetto e dalle preferenze personali. Mentre npm è il gestore di pacchetti predefinito e ampiamente utilizzato, Yarn e pnpm offrono alcune caratteristiche uniche che possono essere vantaggiose in determinati scenari. La scelta dipende spesso dalle esigenze specifiche del progetto, dalla familiarità del team e dalle funzionalità desiderate.

## Considerazioni finali e WEBPACK

Qui abbiamo esplorato tutto quello che serve prima di iniziare un progetto Reactjs o in molti aspetto in generale il codice javascript, abbiamo preso confidenza con le terminologie utilizzate per non rimanere confusi quando inevitabilmente le incontriamo.

CRA e Parcel sono strumenti che permettendo agli sviluppatori di concentrarsi sulla scrittura del codice piuttosto che sulla configurazione iniziale, ma non abbiamo parlato del più famoso e utilizzato WEBPACK, in particolare CRA ci configura la più onerosa configurazione di WEBPACK che come con Parcel non vediamo altri files e librerie a sua volta da configurare necessarie per i nostri progetti Reactjs.
