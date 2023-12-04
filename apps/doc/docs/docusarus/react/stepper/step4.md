# La gestione dello stato

Abbiamo provato a modificare a modificare una variabile dentro a page, ma abbiamo visto che pur cambiando il valore non viene aggiornata :

Rivediamo il codice con il bottone di prova e da eliminare inserito subito dopo Header

```js
export default function Page() {
   let flexDirection = 'row'
   return (
       <div className="App">
           <Header title="Motor" Menu={NavBar} />
            <div>
                <button onClick={() => {
                    flexDirection = 'row-reverse'
                    alert(flexDirection)
                }} > my click XXX </button>
            </div>
           <div key="MAIN-CONTENT" zzzzstyle={{ flexDirection }} className="content-main">

               <SideBar onClickBarMove={(valore)=>{
                  alert(valore)
                }} />

        ....
```

Abbiamo visto che pur modificando la variabile nulla cambia in quanto dobbiamo eseguire nuovamente il componente Page.

facciamo una altra prova proviamo questo :

```js
let n=1
Page()
export default function Page() {
    let flexDirection = "row";
    alert('page ' + n++)
    return (
```

## come vengono chiamati i componenti dietro le quinte

Possiamo notare che Page viene chiamato 3 volte contando grazie a n++ dentro al alert che lo aumenta di 1. La prima volta siamo stati noi con `Page()`, le due successive le chiama react dietro le quinte.

Una cosa che **al inizio confonde** è che react chiama il componente 2 volte, succede solo in fase di sviluppo detta dev, per maggiori controlli, quindi se fate log dentro un componente lo fa 2 volte.

Proviamo a verificare e cosi capiamo come avvengono i caricamenti :

```js
let n=1
Page()
let flexDirection = "row";
export default function Page() {
    if (n===3) {
        flexDirection = 'row-reverse'
    }
    alert('page ' + n++)
    return (
```

La terza volta quando n===3,  la barra si sposta a destra !

e se provo a mettere le variabili dentro  a Page ?

```js
export default function Page() {
    let n=1
    Page()
    let flexDirection = "row";
    if (n===3) {
        flexDirection = 'row-reverse'
    }
    alert('page ' + n++)
    return (
```

Abbiamo il seguente errore :

`RangeError: Maximum call stack size exceeded`

Il motivo ?? che dentro a Page sto chiamando Page() che è se stesso, quindi ogni volta che viene eseguito Page, esegue di nuovo Page che dice di eseguire Page che a sua volta dice di eseguire Page e cosi via al infinito.

### Attenzione al loop infinito

Questo è il **peggiore dei casi** che vi capitare, dove può rallentare molto o **bloccare il browser**..

Mi spiace se qualcuno si è incasinato, ma lavorando con React e non solo capitano questi scherzi, per lo meno le aveta almeno 1 volta affrontato il problema.

Cercate di capire cosa succede in generale a una funzione che chiama se stessa al suo interno senza condizione fatte bene, vedremo che troveremo il problema gestendo gli stati del componenit,se non stiamo attenti potremo scrivere involontariamente codice che genera :

- modfiche che fanno ricaricare,
- ricarinado trova il codice che modifica
- e fa richiamare il codice che modifica a sua volta
- che fa ricaricare fin che morte non ci separi (chiudo il browser, o riavvio).

Per farvi fare la prova, ho usato alert, che però ve lo fa chiedere al infinito, il browser dovrebbe bloccare con un errore di infiniti loop da solo, ma se non succede chiudete il browser. 

### console.log

Diversamente avrei scritto in un console.log e se non sapete a cosa serve o come vedere dove scrive,  andate a vedere **la gestione degli strumenti di sviluppo del browser e la sua console**, per il momento vi basta quella.

### le variabili dentro i componenti si azzeramo

let n = 1 ora è dentro il componente, alert ci da sempre lo stesso valore,
Se fate caso, n non può che rimanere sempre a 1, perchè ogni volta che viene eseguita la funzione n prende di nuovo il valore 1, è banale, ma tenete a mente quando vedete che le ose non vi funzionano, qui escono gli errori più ostici da vedere in react.

### Ho bisogno di uno stato

Quello che mi serve è che in qualche modo react possa assegnare un valore iniziale a flexDirection, se provo a modificare questo valore, deve eseguire Page() come abbiamo visto, ma alla chiamata successiva ricordare il nuovo valore. Questa esigenza la chiamiamo **gestione 
dello stato**.

## Gestiamo lo stato con useState

Dicevamo che tra una chiamata e l' altra di `Page()`, abbiamo bisogno che ricordi il valore modificato tra una chiamata e l'altra, ma che deve partire per una valore iniziale.

React mette a disposizione la funzione chiamata hook `useState`, questo permette di inserire valori che vengono ricordati nelle loro mmodiche, nelle chiamate di caricamento.
`useState ` restituisce una array con due valori:

- il primo una variabile di stato dove viene memorizzato il valore che ci interessa
- il secondo una funzione per modificare il valore della variabile di stato restituita come primo elemento

```js
export default function Page() {
    const [flexDirection, setFlexDirection] = useState("row");

    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection }}
                className="content-main"
            >
                <SideBar
                    onClickBarMove={(valore) => {
                        setFlexDirection(valore);
                    }}
                />
                <Content />
            </div>

            <Footer />
        </div>
    );
}
```

Vediamo subito come abbiao sostiito `let flexDirection = "row";` con :

```js
const [flexDirection, setFlexDirection] = useState("row");
```

Ricordiamo i distruttori di js. Permettono di leggere in modo più coinciso i valori, l' esperessione a sinistra della assegnazione sotto forma di array con 2 elementi, ci generano 2 variabili con i loro nomi dentro l array a sinistra senza che le assegno una per una, UseState restituisce un array con questi e valori

### la gestione dello stato di react.

Ora ho a dispozione le variabili `flexDirection`, `setFlexDirection`, **flexDirection non la modidico direttamente**, se no viene azzerata al prossimo caricamento, chiamo setFlexDirection** che lo fa per noi senza far azzerare il valore.

flexDirection non è più definito come let `flexDirection = "row"`, il valore iniziale lo prende tramite il valore passato da `useState(row)`

La funzion del parametro onClickBarMove ora esegue `setFlexDirection`

```js
    onClickBarMove={(valore) => {
        setFlexDirection(valore);
    }}
```

### flexDirection deve cambiare solo con la funzione setFlexDirection

setFlexDirection dietro le quinte chiama per noi come avevamo visto `Page()`, **dentro a `useState( valoreIniziale )` passiamo il valore inziale**, lo deve far solo una volta, si azzera se ricarico il browser.

La mia `SideBar` ora si posiziona a destra, ma se faccio di nuovo click non succede più nulla, il motivo è chiaro se guardo dentro a SideBar :

```js
const SideBar = ({ onClickBarMove }) => (
    <div key="MENULEFT" className="sideBar">
        <button onClick={() => {
                onClickBarMove("row-reverse");
            }}
```

### Attenzione ai paramentri delle funzioni callBack

`SideBar` chiama onClickBarMove dentro a Page passando sempre lo stesso valore, dobbiamo creare un **valore toggle** cioè che inverte il valore.

Nel nostro caso se il valore è `row` deve diventare `row-reverse`, se invece è `row-reverse` deve diventare `row`, uno inverte l' altro, e scriviamo :

```js
  <button onClick={() => {
            const newValue = value === row ? 'row-reverse' : 'row';
            onClickBarMove(value);
        }

```

Ma non abbiamo la variabile value se vero o falso !
Posso però passarla come parametro del componente :

```js
const SideBar = ({ onClickBarMove, value }) => (
    <div key="MENULEFT" className="sideBar">
        <button onClick={() => {
                const newValue = value === 'row' ? 'row-reverse' : 'row`
                onClickBarMove(newValue);
            }}
```

dentro a Page, visto che il nostro compoente ora prende un nuovo paramentro, dobbiamo aggiornare quando chiama SiadBar, che è quando lo legge come tag JSX `<SideBar>`
scritto con i paramentri diventa dentro a Page :

```js
// siamo dentro a Page quando chiama SideBar

<SideBar value={flexDirection} onClickBarMove={(valore) => {
                        setFlexDirection(valore);
                    }}
                />
```


### la singola responsabilità

Vi ricordate quando abbiamo parlato di singola responsabilità, motivo per cui abbiamo creato più compoenenti specializzati ?

il valore flexDirection di Page, viene modificata dentro a SideBar, potrei fare cosi per altri compoenti, ma poi vedere chi ha modificato e perchè `flexDirection`, devo andarlo a cercare in tutti i compomenti usati, e se cambio qualcosa di logica, devo modificare tutti gli altri.

E' questo che di solito generano bug più difficili da cercare.

SideBar nasce per visualizzare una lista verticale di element, evitiamo di inserire li la logica di una variabile di stato di Page che è padre, non è la sua responsabilià, e la logica la portiamo fuori, quindi il padre.

SideBar deve comunicate che è stato fatto click. Se la vede Il padre Page cosa fare per non disperdere la logica in giro e avere una unica **fonte di verità**.

### la variabile di stato

Ripetiamo ; **Sono variabile che tra una chiamata e l'altra di una funzione mantengono i valori modificati.**


SideBar deve solo limitarsi a dire che è stato fatto click nel suo pulsante, se parlasse direbbe : *"io non ***so nulla di row-reverse***, dentro di me non l'ho mai definito, da dove esce questa stringa ?? ad ogni modo faccio come chiedi e te la passo."*

limitiamoci a dire che è stato fatto click pensaci tu che mi chiami e scriviamo :

```js
const SideBar = ({ onClickBarMove }) => (
    <div key="MENULEFT" className="sideBar">
        <button onClick={(event) => {
               onClickBarMove(event);
            }}
```

SideBar passa ora a `onClickBarMove` la call back di Page `event`, che è l'evento del click su button, che non sa nulla della nostra logic, dentro event per esmpio troviamo con `event.target` quale elemento, tag JSX/HTML ha fatto quel evento, nel nostro caso click.

 onClickBarMove è definito dentro a Page, e event è passato dal suo child (figlio) SideBar :

```js
export default function Page() {
    .....
    <SideBar
        onClickBarMove={(event) => {
            const newflexDirection = FlexDirection === 'row'
                ? 'row-reverse' : 'row'
            console.log(event.target)
            setFlexDirection(newflexDirection)
        }}
    />
```

 console.log(event.target), visualizza : `<button class="btNavBarPos secondBg">` che è dove è stato fatto il click che si trova dentro a SideBar, ma noi non usiamo event, e quindi lo possiamo omettere tra i parametri passati   :  `onClickBarMove={() => {`

### Ordine al codice e attenzione alla nomenclatura

Nel occasione porto fuori la definizione della mia call back, e cambio il nome della proprietà  `onClickBarMove` in `onBarMove`, questo perchè non è detto che SideBar comunica con un pulsante la richiesta di muovere la bar, magari domani in base ad altre azioni deve muoverla senza che sia stato fatto un click

Page diventa :

```js
export default function Page() {
    const [flexDirection, setFlexDirection] = useState("row");
    const handleBarMove = () => {
        const value = flexDirection === "row"
            ? "row-reverse" : "row";

        setFlexDirection(value);
    };

    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection }}
                className="content-main"s
            >
                <SideBar onBarMove={handleBarMove} />
                <Content />
            </div>
            <Footer />
        </div>
    );
}
```

e SideBar diventa :

```js
const SideBar = ({ onBarMove }) => {
    const handleBarMove = ()=> onBarMove(event);

    return <div key="MENULEFT" className="sideBar">
        <button
            onClick={handleBarMove}
            className="btNavBarPos secondBg"
        >
            {">>>"}
        </button>
        <NavBar col />
    </div>
}
```

### separiamo la logica dalla visualizzaziome

Nel JSX passo funzioni definite dentro al componente, in modo che siano più immediate alla lettura grazie alla giusta nomenclatura, che faccio spesso notare è importante.

Il layout della pagina è più immediato ora da leggere, al volo vedo più come è la sua struttura, con meno codice nel mezzo che fa *"rumore"*, e lo modifichiamo meglio.

### Il problema del bottone in SideBar che deve cambiare il testo

Va quasi tutto bene se non fose per un piccolo particolare, che però comporta cambiare la logica.

Come direzione di movimento Dentro a SideBar visualizzo `>>>>` nel suo bottome, ma una volta che si trova a destra deve cambiare come `<<<<`.

A SideBar dobbiamo passare anche la label di descrizione del pulsante che rifletta la direzione verso cui viene spostato al suo click..

```js
const SideBar = ({ onBarMove, label }) => {
    const handleBarMove = () => onBarMove();

    return (
        <div key="MENULEFT" className="sideBar">
            <button onClick={handleBarMove} className="btNavBarPos secondBg">
                {label}
            </button>
            <NavBar col />
        </div>
    );
};
```

la label o testo del pulsante è ora `{label}` Ora Page deve passare a `SideBar`, la label che cambia a seconda dello stato.

```js
<SideBar onBarMove={handleBarMove} label={label} />
```

Ma label dove la prendiamo ? ci serve una variabile di stato ulteriore che visualizza uno delle due descrizioni `<<<<` e `>>>>` a seconda della posizione.

```js
export default function Page() {
    const [flexDirection, setFlexDirection] = useState("row");
    const [label, setLabel] = useState(">>>>")

    const handleBarMove = () => {
        const newFlexDirection = flexDirection === "row"
            ? "row-reverse" : "row";

        setFlexDirection(flexDnewFlexDirectionir);

        // qui devo fare la stessa codizioe precedente leggendo flexDirection
        const newLabel =  newFlexDirection === "row" ? '>>>>' : '<<<<';
        setLabel(newLabel)
    };

    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection }}
                className="content-main"s
            >
                <SideBar onBarMove={handleBarMove} label={label} />
                <Content />
            </div>
            <Footer />
        </div>
    );
}
```

Ora abbiamo `label` come stato da passare a SideBar come parametro.
Ma ho dovuto scrivere dentro ad `handleBarMove' 2 volte :

`flexDirection === "row" ? '>>>>' : '<<<<';`

Posso solo capire da `newFlexDirection` in quale stato nuovo sono e ripetere la condizione usando newFlexDirection aggiornato,

### Quando cambiano i valori dopo setQulcosa come `setLabel` ?

I valori cambiano dopo che ho ricaricato, quindi se letti subito dopo non li trovo cambiati, motivo per cui li inserisco in varibili che iniziano con new come `newLabel` e uso questo nuovo valore da passare a setLabel.

Ora la barra si muove con la label gista, ma posso gestire questo  meglio questi due stati `label` e `flexDirection`, evitando ripetizioni di condizioni.

Possiamo portare fuori la logica di controllo di questi 2 stati, quindi al di fuori di Page che andiamo a vedere. Ma chiediamoci perchè uso sempre `const` per concludere meglio la natura di una variabile di stato.

### Perchè dichiaro sempre le variabili con `const` e non `let` ?

Dentro al compomente non ha senso una variabile definita con let, perchè come abbiamo visto al caricamento perde le modifiche, e l unico modo di usarle come variabili è con `useState`

```js
  const [label, setLabel] = useState('>>>>');
```

label e setLabel sono constanti, non devo mai fare qialcossa come `label='>>>>'`, lo fa per noi setLabel che mantiene il valore che andrei a perdere come già detto, ma da ripetere.
Quindi con const anche solo per errore di difitazione scrivo :

`if (label='>>>>')` con un solo = label cambia valore, che può portare a errori imprevisti, se succede vediamo subito l errore di svista, questi poi diventano i bug peggiori da trovare.W .

In generale cercate di usare il meno possibile let, se non in casi molto eccezionali, meno let ci sono meno variabili che cambiano come gli pare devo poi controllare.
