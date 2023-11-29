# ​Reactjs

## ​Perchè Reactjs

ReactJS, sviluppato e mantenuto da Facebook, è una libreria open-source di JavaScript progettata per la creazione di interfacce utente interattive ed efficienti. Utilizzato da numerose aziende e sviluppatori in tutto il mondo, React si è affermato come uno strumento fondamentale nello sviluppo delle moderne applicazioni web.

Ciò che contraddistingue React è il suo approccio dichiarativo alla costruzione di componenti riutilizzabili. Piuttosto che lavorare direttamente con il DOM, React consente agli sviluppatori di descrivere l'interfaccia utente come un insieme di componenti, ognuno con il proprio stato e comportamento. Questo facilita la manutenzione del codice, la modularità e la comprensione del flusso dei dati nell'applicazione.

L'efficienza di React emerge grazie al suo algoritmo di conciliazione del virtual DOM, che ottimizza gli aggiornamenti dell'interfaccia utente minimizzando la manipolazione diretta del DOM. Ciò si traduce in un'esperienza utente più veloce e fluida, soprattutto nelle applicazioni con un'intensa interattività.

React si integra anche bene con altri framework e librerie, consentendo agli sviluppatori di incorporare facilmente le loro funzionalità in progetti esistenti. Inoltre, la comunità attiva e l'ecosistema di strumenti che circondano React offrono risorse abbondanti per apprendere e migliorare le competenze di sviluppo.

In sintesi, ReactJS ha rivoluzionato il modo in cui vengono costruite le applicazioni web, fornendo un'architettura robusta, un approccio dichiarativo e prestazioni efficienti, rendendolo una scelta popolare per gli sviluppatori che desiderano creare interfacce utente dinamiche e accattivanti.

### ​Il Document Object Model (DOM)

Il Document Object Model, abbreviato come DOM, rappresenta una struttura gerarchica e strutturata di un documento web. Questo modello permette ai programmatori di manipolare dinamicamente il contenuto, la struttura e lo stile di una pagina web attraverso l'uso di linguaggi di scripting come JavaScript.

In sostanza, il DOM rappresenta ogni elemento della pagina web come un "nodo" in un albero, dove ogni nodo corrisponde a un elemento, come tag HTML, attributi o testo. Attraverso il DOM, gli sviluppatori possono accedere e modificare questi nodi in modo dinamico, consentendo l'aggiornamento e la manipolazione degli elementi della pagina senza la necessità di ricaricare l'intera pagina.

Grazie al DOM, è possibile creare interattività nelle pagine web, rispondere agli eventi degli utenti e aggiornare dinamicamente il contenuto senza dover ricaricare completamente la pagina. Questa capacità di manipolare il DOM è fondamentale per la creazione di esperienze utente più ricche e dinamiche sul web.

Come esempio prendiamo un div html identificato come myDiv :

`<div id="myDiv" >`
`document.getElementById("myDiv").innerHTML="hello word";`

In questo esempio manipoliamo il dom accedendo a myDiv tramite getElemetById e cambiamo la proprietà innerHTML che rappresenta il contenuto in html inserendo un testo, o altro codice html.

In questo modo rendiamo dinam`i`che le nostre pagine html, ma questo tipo di manipolazione è oco flessibile, motivo per cui sono nate librerie per la sua manipolazione quali reactjs agevolando molto il lavoro dello sviluppatore.

### ​La console del Browser

Prendiamo subito confidenza con gli strumenti per lo sviluppo del browser, questo esempio è valido per Google Chrome, con il tasto destro sulla pagina visualizzata, dal menu scegliere ispeziona, e si apre la seguente schermata :

![ispeziona](/img/react/ispeziona.png)

Possiamo cosi analizzare il codice html della pagina , e nel fondo abbiamo lo strumento console (se non visualizzato premere esc), da qui possiamo scrivere codice javascript, in particolare il comando visto precedentemente, se presente un elemento con id="myId" eventualmente creare un file html con un div visto prima, e cosi manipolarlo.

Questo strumento offerto dal browser, è il nostro primo e più importante strumento per lo sviluppo, sopratutto per controllare eventuali errori, o per fare il debug del codice, consiglio di documentarsi se ancora non lo si conosce.

### ​Il virtual DOM

Il Virtual DOM, o DOM virtuale, è un concetto chiave nel contesto di librerie e framework come ReactJS. In italiano, si traduce come "DOM virtuale" ed è una tecnica utilizzata per ottimizzare le operazioni di aggiornamento dell'interfaccia utente nelle applicazioni web.

In breve, il Virtual DOM funziona creando una rappresentazione leggera della struttura del DOM esistente. Quando viene effettuato un aggiornamento nell'applicazione, anziché manipolare direttamente il DOM del browser, React crea una copia virtuale della struttura esistente, nota come Virtual DOM.

Successivamente, React confronta il Virtual DOM appena creato con il Virtual DOM precedente per identificare le differenze (o "diff"). Solo queste differenze vengono poi applicate al vero DOM del browser. Questo processo riduce al minimo la manipolazione diretta del DOM, migliorando l'efficienza dell'aggiornamento dell'interfaccia utente.

In conclusione, il Virtual DOM è una strategia efficace per ottimizzare le prestazioni delle applicazioni web, consentendo aggiornamenti efficienti e minimizzando le operazioni dirette sul DOM del browser, il che si traduce in una migliore esperienza utente e una maggiore efficienza nell'utilizzo delle risorse.

Primi passi con react :

Proviamo a salvare un file .html e aprirlo con il browser :

```javascript
<!DOCTYPE html>
<html>
 <head>
   <meta charset="utf-8">
   <title>Basic Example with JSX</title>
 </head>
   <body>
    <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>

    <div id="container"></div>

    <script type="text/babel">

        const ExampleApplication = ()=>{
            const message = 'React has been successfully running'
            return <p>{message}</p>;
        }
        const rootNode = document.getElementById('container')
        ReactDOM.render( <ExampleApplication />, rootNode );

    </script>
 </body>
</html>
```

- Importiamo la libreria react e react-dom necessaria per manipolare il dom e definizamo un div con id="container" definizamo.
- Creiamo una funzione ExampleApplication che restituisce un tag html p, con message tra le parentesi graffe : `<p>{message}</p>`
- Come visto in precendenza prendiamo il nostro id="container" tramite il DOM con `document.getElementById('container')` dentro a `rootNode`.

A questo punto entra in gioco react tramite
ReactDOM.render, tramite questa funzione diciamo a react di fare il rendering cioè visualizzare `<ExampleApplication />` dentro a rootNode che è il nostro `<div id="container"></div>`, dietro le quinte reactDom inserisce il contenuto nel div.

### JSX e l' html non standard

Ma **attenzione, esiste il tag HTML `<ExampleApplication />` ??**

Non esiste nel html tale tag, siamo noi ad aver creato una funzione chiamata ExampleApplication, dove gli possiamo dare un nome a piacimento salvo che non sia uguale a un tag HTML vero.

Inoltre abbiamo scritto dentro a ExampleApplication ` <p>{message}</p>`, normalemente dovremo vedere visualizzato : `{message}` come normalmente si comporterebbe l' HTML.

Quello che abbiamo fatto è scrivere non più in html ma in jsx diciamo cosi un suo sostituto utilizzato da React per ampliare l' HTML stesso tramite funzione `ExampleApplication` .

Questo è possibile tramite la **libreria babel**, che abbiamo importato dopo react, essa si occupa di risolvere il nome di questi tag definiti tramite una funzione, oltre poter scrivere `<p>{message}</p>` dentro alla funzione `ExampleApplication` dove dentro le parentesi graffe mi permette di scrivere codice javascript, nel nostro caso la variabile message.

### I componenti di reactjs

Quello che abbiamo visto fino ad ora è come lavora react e i suoi strumenti quali jsx.

In particolare abbiamo creato un **compoente** di react  `<ExampleApplication />`  tramite una semplice funzione  `ExampleApplication`, chiaramente il nuovo tag chiamato componente prende il nome della funzione, la cosa importante da notare è che **il nome della funzione deve inziare con una lettera MAIUSCOLA.***

Non è difficile creare un componente React, dobbiamo solo ricordare poche regole, lettera grande e graffe per inserire codice javascript dentro l HTML che in realtà non è più HTML ma JSX tradotto da babel.

Da ora in poi ci dimenticheremo di ReactDOM.render che viene definito una volta sola dentro l HTML che fa partire l' applicazione, l importante è che siano chiari i concetti vissto che non ci sono particolari magie dietro le quinte.
