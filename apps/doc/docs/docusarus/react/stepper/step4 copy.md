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

Abbiamo visto che pur modificando la variabile nulla cambia in quanto dobbiamo eseguire nuovamente il compnenente Page.

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

Possiamo notare che Page viene chiamato 3 volte con n++ dentro a alert, la prima volta siamo stati noi con `Page()`, le due successive è react dietro le quinte.

React però dovrebbe chiamarla una sola volta per le prestazioni, ma capisce che siamo in sviluppo quindi non abbiamo creato il build del progetto, in questo modo chiama 2 volte i componenti per eseguire dei controlli che ci servono in questa fase di sviluppo.

proviamp ora invece in questo modo :

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

### Il loop infinito

Questo è il **peggiore dei casi** che vi può, se non vi da quel errore, vedete che il browser si blocca, il computer stesso rallenta molto e delle volte l unico modo è riavviare il pc perchè non riesco nemmeno a chiudere la pagina o il browser.

Potrei mettere l ' alert prima di page() in modo che almeno devo confermare prima, ma se chiudo l 'alert subito mi appare il prossimo al infinito, devo chiudere il browser senza schede precendenti aperte, se no riapre quella pagina e ricomincia il ciclo infinito.

Mi spiace se qualcuno si è incasinato, ma lavorando con React e non solo capitano questi scherzi, per lo meno le aveta almeno 1 volta affrontato il problema, se succede non vi perdete e capite cosa accadere.

Detto questo non posso usare questa metodologia dove poi devo creare variabili globali di quel genere che sono la grande bestemmia della programmaziome e anche girarci intorno non risolve.

Se fate caso, n non può che rimanere sempre a 1, perchè ogni volta che viene eseguita la funzione n prende di nuovo il valore 1.

### Ho bisogno di uno stato

Quello che mi serve è che in qualche modo react possa assegnare un valore iniziale a flexDirection, se provo a modificare questo valore, deve eseguire Page() come abbiamo visto, ma alla chiamata successiva ricordare il nuovo valore. Questa esigenza la chiamiamo **gestione dello stato**.

## Gestiamo lo stato con useState

React mette a disposizione la funzione chiamata hook `useState`, la quale restituisce una array con due valori:

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

Ricordiamo i distruttori di js che permettono di leggere in modo più coinciso i valori, l' esperessione sopra a sinistra della assegnazione troviamo un array con 2 elementi, questo permette di leggere i primi due valori del array restituito, diversamente avrei dovuto scrivere :

```js
const flexState = useState("row");
const flexDirection = flexState[0];
const setFlexDirection =  flexState[0];
```

React usa molto le nuove caratteristiche di javascript chiamato ES6, abituiamoi ad usarle, fosse solo per comprendere il codice di esempio, dimentichiamoci il codice qui sopra più *verboso* (lungo).

flexDirection non è più definito come let `flexDirection = "row"`, il valore iniziale lo prende tramite il valore passato da `useState(row)`

La funzion del parametro onClickBarMove ora esegue `setFlexDirection`

```js
    onClickBarMove={(valore) => {
        setFlexDirection(valore);
    }}
```

Quello che è cambiato è che per cambiare il valore flexDirection devo usare la funzione setFlexDirection letto come secondo valore nel array di `useState`.

setFlexDirection dietro le quinte chiama per noi come avevamo visto `Page()` e aggiorna la variabile flexDirection senza che essa viene reimpostata al valore inziale `row`.

### Manteniamo lo stato

Precisiamo che richiamando `Page()` rieseguendo lo stesso codice, esegue di nuovo : `const [flexDirection, setFlexDirection] = useState("row");`  ma assegna il valore iniziale solo la prima volta che viene eseguito Page(), succesivamente conosce che ha già un valore lo conserva, quindi diciamo in questo modo **MANTIENE LO STATO**.

La mia `SideBar` ora si posiziona a destra, ma se faccio di nuovo click non succede più nulla, il motivo è chiaro se guardo dentro a SideBar :

```js
const SideBar = ({ onClickBarMove }) => (
    <div key="MENULEFT" className="sideBar">
        <button onClick={() => {
                onClickBarMove("row-reverse");
            }}
```

### Attenzione ai paramentri delle funzioni delle call back

`SideBar` chiama onClickBarMove dentro a Page passando sempre lo stesso valore, dobbiamo creare un valore toggle cioè che inverte il valore, nel nostro caso se il valore è `row` deve diventare `row-reverse`, se invece è `row-reverse` deve diventare `row`, potremo scrivere qualcosa come  :

```js
value === 'row' ? 'row-reverse' : 'row`
```

Ma non abbiamo la variabile value ! si potrebbe pensare di passarla dentro a onClick ma onClick di button passa il valore event che non abbiamo usato perchè non ci serve, per test potrei visualizzarla in console :

```js
  <button onClick={(event) => {
                onClickBarMove("row-reverse");
                console.log(event)
            }}
```

Se proprio volessi usare value dovrei passarla come parametro del componente :

```js
const SideBar = ({ onClickBarMove, value }) => (
    <div key="MENULEFT" className="sideBar">
        <button onClick={() => {
                const newValue = value === 'row' ? 'row-reverse' : 'row`
                onClickBarMove(newValue);
            }}
```

Ricordandomi che dentro a Page devo passare a `<SideBar>`il valore flexDirection
Questo funzionerebbe ma in modo un po perverso per fare qualcosa di più banale.

### la singola responsabilità

Vi ricordate quando abbiamo parlato di singola responsabilità, motivo per cui abbiamo creato più compoenenti specializzati ?

L' errore come approccio in questo codice, anche se tutto funziona, sta proprio nella responsabilità, dobbiamo domandarci chi è che decide e come fare a
posizionare la SideBar ?

Qui abbiamo deciso che è la SideBar a decidere i dettagli implementativi del layout, mentre la sua resposabilità è visualizzare il menu ed eventuali comandi. Il layout della pagina è un mondo suo esterno, dove se dovessi usare altrove la SideBar, potrebbe avere una altra logica, in questo modo perdiamo la possibilità del suo riutilizzo.

### Riutilizzare il codice

SideBar deve solo limitarsi a dire che è stato fatto click nel suo pulsante, se parlasse direbbe : *"io non ***so nulla di row-reverse***, dentro di me non l'ho mai incontrato, da dove esce questa stringa ?? ad ogni modo faccio come chiedi e te la passo."*

Quindi scriviamo :

```js
const SideBar = ({ onClickBarMove }) => (
    <div key="MENULEFT" className="sideBar">
        <button onClick={(event) => {
               onClickBarMove(event);
            }}
```

A questo punto passiamo il valore event generato da `<button>` che è una buona regola, in quanto in altri scenari rispetto al nostro, potrebbe servire e cosi SideBar diventa più riutilizzabile.

Dentro a Page quando uso `SideBar` definisco la callBack

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

Possiamo vedere che viene passato event che non appartiene a SideBar ma al onclick di `<button>` dentro a SideBar. Ho aggiunto `console.log(event.target)` che visualizza l 'elemento *"target"* a cui è stato fatto click, guarda caso visualizza : `<button class="btNavBarPos secondBg">` ma a noi di questa informazione non ci importa quindi posso anche lasciare i paramentri della funzione vuota.

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

Come cambia la lettura dentro Il JSX portando fuori le funzioni ?

Per esempio ora è di nuovo più leggibile a colpo d' occhio il layout della pagina, quello che più ci interessa vedere di Page, diciamo che abbiamo tolto "rumore".

### la bussines logic e la visualizzazione

Portando fuori le funzioni, lavoro in modo più separato tra js e jsx, cioè tra il codice logico e la sua visualizzazione, di cui react e strumenti come lui permettono di fare questa separazione tra i loro principali scopi.

Ma non abbiamo finito di sistemare, va quasi tutto bene se non fose per un piccolo particolare, che fa cascare l asino.....

Dentro a SideBar visualizzo `>>>>` come descrizione del bottone, come direzione di movimento, ma una volta che si trova a destra deve cambiare come `<<<<`. Parlavo di *asini che cascano* perchè abbiamo tolto a SideBar la responsabilità di decire `row`, piutttosto che `row-reverse`, con questa informazione potevo gestire la direzione della freccia, ora non ho modo di farlo per mancanza di informazione.

### ancora problemi con la singola resposabilità

Abbiamo portato fuori la responsabilità di quale parametro css utilizzare, row o row-inverse, che gestisce chi usa SideBar nel nostro caso Page, ed è chiaro che è meglio che sia Page a gestire questo.

Allo stesso modo voglio che SideNav non deve avere la responsibilità di quale `label` cioè descrizione mettere nei pulsanti.

Come faccio ? come mi muovo ? meglio cosi o in altro modo se mi viene in mente qualcosa ? queste sono le domande che devono venire in mente.

### Lo stato e il suo effetto visivo

Generalmente quando abbiamo uno stato, nel nostro caso posizione destra o sinistra, abbiamo bisogno di una descrizione o immagine icona che lo rappresenti.

### Lo stato in genere si presenta come azione e label

Proviamo a fare lo `schemino` azione css, e label,

```js
const posSideNav = {
    left : {css: 'row', label : '>>>>'},
    right: {css: 'row-reverse', label: '<<<<'}
}
```

Possiamo leggere l'oggetto come :

- left (sinistra) è `row` con la sua label `>>>>`
- right (destra) invece `row-reverse` con la sua label `<<<<`

### Una fonte di verità

Non ho ancora preso decisioni, ma già solo con questo oggetto js, **ho creato una unica fonte di verità**, le scrivo da qualche parte, e non importa il resto, le modifiche dentro l'oggetto devono riflettersi per il resto del codice. on altre parole hio creato una **CONFIGURAZIONE**

Dentro a Page dove uso `row` o `row-reverse` ?

```js
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection }}
                className="content-main"
            >
                <SideBar onBarMove={handleBarMove} />
                <Content />
            </div>
```

con la funzione collagata al evento click :

```js
    const handleBarMove = () => {
        const value = flexDirection === "row" ? "row-reverse" : "row";
        setFlexDirection(value);
    };
```

**la nostra logica** è racchiusa in : `flexDirection === "row"`

### esprimiamoci come : isLeft ?

la dicitura `left o right` dentro l'oggetto la posso cambiare in vero o false se *"mi chiedo"* : **isLeft**

riscriviamo quindi `posSideNav in funzione di isLeft :

```js
const posSideNav = {
    true : {css: 'row', label : '>>>>'},
    false: {css: 'row-reverse', label: '<<<<'}
}
```

in questo chiedo : a cosa saranno mai uguali queste seguenti espressioni ?

```js
posSideNav[true].css // row
posSideNav[false].css // row-reverse

posSideNav[true].label // >>>>
posSideNav[false].label // <<<<
```

posso scrivere dove poi manipolo lo style vero e proprio quindi dentro al div MAIN-CONTENT

```js
  <div
    key="MAIN-CONTENT"
    style={{ flexDirection: posSideNav[isLeft].css }}
    className="content-main"
            >
```

Lo stato non lo definisco più come `flexDirection` ma come `isLeft` :

```js
export default function Page() {
    const [isLeft, setIsLeft] = useState(true);
```

Il nostro handleBarMove la funzione da chiamare se viene fatto click diventa più semplicemente :

```js
    const handleBarMove = () => {
        setIsLeft(!isLeft);
    };
```

### setIsLeft(!isLeft)

Lo stato ora è un valore più semplice booleano, quando viene fatto click deve negarsi con `!` l operatore che nega i valori booleani, quindi se isLeft è vero diventa false, se falso diventa vero, **questa operazione si chiama TOGGLE dello stato cioè invertirlo**-

Ora il mio codice diventa :

```js
export default function Page() {
    const [isLeft, setIsLeft] = useState(true);
    const handleBarMove = () => setIsLeft(!isLeft);
s    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection: posSideNav[isLeft].css }}
                className="content-main"
            >
                <SideBar onBarMove={handleBarMove} labelNavPos={ posSideNav[isLeft].label } />
                <Content />
            </div>
            <Footer />
        </div>
    );
}

const SideBar = ({ onBarMove, labelNavPos }) => {
    const handleBarMove = ()=> onBarMove(event);
    return (
        <div key="MENULEFT" className="sideBar">
        <button
            onClick={handleBarMove}
            className="btNavBarPos secondBg"
        >
            {labelNavPos}
        </button>
            <NavBar col />
        </div>
    );
};
```

SideBar ora non ha nessuna responsabilità di decidere quale css applicare e quale testo, ma scritto questo codice, cosa poi andate a vedere ?? se tutto funziona cosa modificate ?? quanti errori di codice posso generare cambiando questi valori che mi blocca il programma ??

```js
const posSideNav = {
    true : {css: 'row', label : '>>>>'},
    false: {css: 'row-reverse', label: '<<<<'}
}
```

## SI NOTA BENE CHE QUI SI VEDE A COLPO DOCCHIO TUTTA LA LOGICA DA CAPIRE

### ToggleButton

Possimo fare meglio dentro a sideBar ?

```js
const SideBar = ({ onBarMove, labelNavPos }) => {
    return (
        <div key="MENULEFT" className="sideBar">
        <button
            onClick={handleBarMove}
            className="btNavBarPos secondBg"
        >
            {labelNavPos}
        </button>
            <NavBar col />
        </div>
    );
};
```

Abbiamo un candidato di un nuovo componente chiamato ToogleButton, che in generale deve rappresentare uno stato vero o falso con 2 simboli o testi uno per lo stato vero e uno per lo stato falso.

```js
const ToggleButton = ({ onChange, checked, onLabel, offLabel })=>{
    const handleClick = ()=>onChange(!checked)

    return (
        <button
            onClick={handleClick}
            className="btNavBarPos secondBg"
        >
            {value ? onLabel || 'true' : offLabel || 'false' }
        </button>
    )
}
```
