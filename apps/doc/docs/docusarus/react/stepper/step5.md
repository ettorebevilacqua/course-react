# I dati dello stato

Siamo rimasto con questo codice non proprio bello, dove devo ripetere `newFlexDirection === "row" ? '>>>>' : '<<<<';`

```js
    const handleBarMove = () => {
        const newFlexDirection = flexDirection === "row"
            ? "row-reverse" : "rowD";

        setFlexDirection(newFlexDirection);

        // qui devo fare la stessa codizioe precedente leggendo flexDirection
        const newLabel =  newLabe=== "row" ? '>>>>' : '<<<<';
        setLabel(newLabel);
    };
```

Meglio non ripetere e quindi facilmente risolvo con una if :

```js
    const handleBarMove = () => {
        let newFlexDirection = flexDirection;
        let newLabelDirection = labelDirection;

        if (flexDirection === "row") {
            newFlexDirection = "row-reverse";
            newLabelDirection = '<<<<';
        } else {
            newFlexDirection = "rowd"; // qui cè un errore di digitazione
            newLabelDirection = '>>>>';
        }

        setFlexDirection(newFlexDirection);
        setLabel(newLabel);
    };
```

Ma devo usare variabili let, andrebbe bene come codice, ma se provo forzarmi a usare solo costanti è meglio, ho già spiegato il vantaggio, ma uno è che mi forza a scrivere meglio il codice, come era scritta prima però non aveva bisogno di scrivere let.

## Mettere ordine al codice consiglia nuove soluzioni

Se seguo le regole di scrivere buon codice, le stringhe isolate nel codice vanno definite con varibili globali, quindi scritti in testa del file  con nome tutto maisocole, diciamo che gli diamo un alias, un nome :

```js
    const DIR_LEFT_FLEX= "row";
    const DIR_RIGHT_FLEX = "row-reverse";
    const DIR_LEFT_LABEL = ">>>>";
    const DIR_RIGHT_LABEL = "<<<<";

    ......

    const handleBarMove = () => {
        let newFlexDirection = flexDirection;
        let newLabelDirection = labelDirection;

        if (flexDirection === DIR_LEFT_FLEX) {
            newFlexDirection = DIR_RIGHT_FLEX;
            newLabelDirection = DIR_RIGHT_LABEL
        } else {
            newFlexDirection = DIR_LEFT_FLEX;
            newLabelDirection = DIR_LEFT_LABEL;
        }

        setFlexDirection(newFlexDirection);
        setLabel(newLabel);
    };
`
```

Prima di definire il conponente page, abbiamo messo le varie DIR_LEFT_FLEX, DIR_LEFT_LABEL, che impostao le strinhe fisse che ho usato.

I vantaggi :

- unica fonte di verità : una sola modifica in un punto.
- codice più dichiarativo con la giusta nomenclatura.

### Le strighe come risorse

Le stringhe sono protette da un nome detto alias, se guardate le if scritte e i valoro globali si vede che non dipendono dal testo contenuto, ripeto , abbiamo ora una unica fonte di verità : se modifico una stringa, la logica delle if continua a funzionare, la stringa la modifico solo una volta.

Queste variabili che abbiamo creato sono le risorse del applicazione, cioè i dati fissi che utilizzati, in genere sono definiti al inizio del codice.

I nomi usati sono DIR_LEFT_FLEX e DIR_RIGHT_FLEX,  e DIR_LEFT_LABEL DIR_RIGHT_LABE indicano quale direzone e quale elemento per una certa direzione.

### I parametri dello stato

Posso abbandonare quello che ho scritto prima, che era valido se rimangono come stringe isolate, diversamente posso metterle dentro a un contenitore che fa da dizionario :

```js
   const DIR_FLEX = ["row": "row-reverse"] ;
   const DIR_LABELS = [">>>>","<<<<"];
```

In questo modo abbiamo anche definito gli stati possibili che può avere la flex e la label da visualizzare. in base al indice alla posizione 0 ho la coppia `row, >>>>` alla posizione 1 invece :  `row-reverse, <<<<`

Con un indice su questi array, posso estrapolare uno dei miei stati possibili,  mentre prima lo generavo con una if :

```js
        // non scrivo più :

        if (flexDirection === DIR_LEFT_FLEX) {
            newFlexDirection = DIR_RIGHT_FLEX;
            newLabelDirection = DIR_RIGHT_LABEL
        }
        // la if non è più necessaria con un indice

            pos = 1;
            newFlexDirection = DIR_FLEX[1];
            newLabelDirection = DIR_LABELS[1]
```

nel nostro codice quindi posso fare a meno della if e il suo else, e le variabili temporanee da passare a setFlexDirection e setLabel, ma devo usare un nuovo stato posNav :

```js
    const newFlexDirection = flexDirection === "row"

export default function Page() {
    const [posNav, setPosNav] = useState(1);
    const [flexDirection, setFlexDirection] = useState("row");
    const [label, setLabel] = useState(">>>>")

    const handleBarMove = () => {
        const newPosNav= !posNav;

        setPosNav(newPosNav);
        setFlexDirection(DIR_FLEX[newPosNav]);
        setLabel(DIR_LABELS[newPosNav]);
    }
```

Ora uso posNav e nel handleBarMove lo vario ad ogni click con  `newPosNav= !posNav` che lo vega quindi da 0 diventa 1 e vicerversa alternandosi.

Non uso più le variabili intermedie ma scrivo direttamente `setLabel(DIR_LABELS[newPosNav]);`
Ma gli stati `flexDirection` e `label` non mi servono più, andiamo a vedere dove li uso :

```js
   <div key="MAIN-CONTENT"  className="content-main"
         style={flexDirection).}>

     <SideBar onBarMove={handleBarMove} label={label} />
```

Gli stati flexDirection e label si derivano rispettivamente come DIR_FLEX[posNav] e DIR_LABELS[posNav]

Vediamo come esce ora il codice con uno solo stato `posNav`

```js
export default function Page() {
    const [posNav, setPosNav] = useState(0);
    const handleBarMove = () => setPos(Number(!posNav));
   return (
        <div className="App">
            <Header title="Motor " Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection: DIR_FLEX[posNav] }}
                className="content-main"
            >
                <SideBar onBarMove={handleBarMove} label={DIR_LABEL[posNav]} />
                <Content />
            </div>
            <Footer />
        </div>
    );
}
```

`handleBarMove = () =>setPos(!posNav);` ora è svuotata in quanto deve solo aggiornare `poNav`, non ho più altra logica da gestire, che viene ridotta in quanto ora è spostata nel concetto di semplice indice nel array.

### Posso scrivere meglio ?

I miei stati possibili sono le coppie :

- 0:  `"row", ">>>>"`
- 1: `"row-reverse", "<<<<"`

Potrei quindi riscrivere gli array come :

```js
const divBarNav=[
    ["row", ">>>>"],
    ["row-reverse", "<<<<"]
]
```

Adesso `divBarNav[0]` e `divBarNav[1]` rappresentano destra e sinistra.
i valori vengono quindi letti come `divBarNav[0][0]` per il flex e `divBarNav[0][1]` per la label

Ma meglio scrivere `divBarNav[0].flex` per il flex e `divBarNav[0].label` per la label.

```js
const navBarDir = [
    {flex:'row', label:'>>>>'},
    {flex:'row-reverse', label:'<<<<'}
];

export default function Page() {
    const [posNav, setPosNav] = useState(0);
    const handleBarMove = () => setPos(!posNav);

return   <div className="App">
            <Header title="Motor" Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={( flexDirection: NavBarDir[posNav].flex )}
                className="content-main"
            >
            <SideBar onBarMove={handleBarMove} label={navBarDir[navPos].label} />
```

### Gli stati possibili

La considerazione da fare è che

```js
const navBarDir = [
    {flex:'row', label:'>>>>'},
    {flex:'row-reverse', label:'<<<<'}
];
```

Questo rappresenta tutti gli stati possibili, potrei aggiungere un terzo stato "non visibile" aggiungendo solo una riga :

```js
const navBarDir = [
    {flex:'row', label:'>>>>'},
    {flex:'row-reverse', label:'<<<<'}
    {flex:'none', label:''}
];
```

ma anche aggiungere una icona

```js
const navBarDir = [
    {flex:'row', label:'>>>>', icon: 'arrow-r'},
    {flex:'row-reverse', label:'<<<<', icon: 'arrow-l'}
    {flex:'none', label:'', icon : 'eye'}
];
```

Con la struttura Il mio codice continua a funzionare, anche se non ho ancora implementato l' icona, la gestione dello stato non la modifico più,

se non usavo questa struttura ma gli array avrei dovuto scrivere :

```js
   const DIR_FLEX = ["row": "row-reverse", "none"] ;
   const DIR_LABELS = [">>>>","<<<<", ""];
   const DIR_ICONS = ["arrow-r","arrow-l", "eye"];
```

Un nuovo array per ogni eventuale nuova proprietà, riempiendo il codice di queste variabili piuttosto che mantenere una base navBarDir[navPos] e accedere a `flex`,`label`,`icon`.

### Codice poco gestibile

Senza array con le sole definizioni delle stringhe usate, come siamo partiti al inizio
che usavamo le if, il codice solo per aggiungere una icona diventava :

```js
 export default function Page() {
    const [flexDirection, setFlexDirection] = useState("row");
    const [label, setLabel] = useState(">>>>")
    const [icon, setIcon] = useState("arrow-l")

    ....
    const handleBarMove = () => {
        .....
        if (flexDirection === DIR_NONE_FLEX){
                newFlexDirection = DIR_NONE_FLEX;
                newLabelDirection = DIR_NONE_LABEL;
                newIconDirection = DIR_NONE_ICON;

            } else if (flexDirection === DIR_LEFT_FLEX) {
                newFlexDirection = DIR_RIGHT_FLEX;
                newLabelDirection = DIR_RIGHT_LABEL;
                newIconDirection = DIR_RIGHT_ICON;
            } else {
                newFlexDirection = DIR_LEFT_FLEX;
                newLabelDirection = DIR_LEFT_LABEL;
                newIconDirection = DIR_LEFT_ICON;
            }

            setFlexDirection(newFlexDirection);
            setLabel(newLabelDirection);
            setIcon(newIconDirection)
```

Devo aggiungere una ulteriore if, oltre ad avere 3 stati diversi da gestire, e se aggiungo altre proprietà le cose si complicani, stesso discorso se poi devo togliere uno stato.

Con la mia struttura invece è come dire, prendi questo stato piuttosto che l'altro.

### Quando faccio bussines logic ? cosa significa ?

In modo più generico è quando cambiamo stato come qui visto com `setPos`, oppure faccio una condizione tipo `qualcosa === 2 ? 'si' : 'no'` o operazioni `prezzo * qta * sconto` le quali azioni modificano il comportamento del programma.

### Evitare bussine logic nel Componente

Siamo partiti dalla sidenar che controllava la logica perchè li abbiamo definito la funzione di cosa fare al click, e in prima battuta viene da inserire il codice logico

```js
const SideBar = ({ onClickBarMove, value }) => (
    <div key="MENULEFT" className="sideBar">
        <button onClick={() => {
                const newValue = value === 'row' ? 'row-reverse' : 'row`
                onClickBarMove(newValue);
            }}
```

Poi abbiamo spostato la logica più in alto di un livello nel componente Padre Page, in quanto è lui che poi gestisce i valori logici, questo dentro una funzoone definita nel jsx

```js
export default function Page() {
    .....
    <SideBar
        onClickBarMove={(event) => {
            const newflexDirection = FlexDirection === 'row'
                ? 'row-reverse' : 'row'
            setFlexDirection(newflexDirection)
        }}
    />
```

Da qui abbiamo creato una funzione apposita che gestisce l evento :

```js
export default function Page() {
    const [flexDirection, setFlexDirection] = useState("row");
    const handleBarMove = () => {
        const value = flexDirection === "row"
            ? "row-reverse" : "row";

        setFlexDirection(value);
    };

    ....
     <SideBar onBarMove={handleBarMove} />

```

E cosi SideBar si limita ad assegnare la funzione alla prop  e dopo qualche prova su come gestire i nostri valori, abbiamo spostato fuori dal componente la gestione della logica.

```js
const navBarDir = [
    {flex:'row', label:'>>>>'},
    {flex:'row-reverse', label:'<<<<'}
];

export default function Page() {
    const [posNav, setPosNav] = useState(0);
    const handleBarMove = () => setPos(!posNav);
```

E questo ha svuotato il nostro componente, portando fuori la logica.

### Puliamo, separiamo PORTIAMO FUORI

A questo punto, visto che mi sono concetrato con il concetto, porta il codice fuori verso chi lo contiene,
il nostro file Page contiene sia il nostro componente Page, che i vari sotto componenti.

Se dicessi di portare fuori i componenti ? Fuori dove che stanno già fuori dal componente App ?
fuori fal nostro file, ognuno di essi definito in un file a parte.

### La cartella component

Creiamo una cartella component dove mettere i nostri componenti, il nome del file è il nome del componente e spostiamo da page nel file la definizione del componente.
Il risultato finale Page.js è il seguente :

```js
import { useState } from "react";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Content from "./component/Content";
import Footer from "./component/Footer";

import "./styles.css";

const navBarDir = [
    { flex: "row", label: ">>>>" },
    { flex: "row-reverse", label: "<<<<" },
];

const getNavState = (pos)=> navBarDir[pos];

export default function Page() {
    const [posNav, setPosNav] = useState(0);
    const handleBarMove = () => setPosNav(!posNav);

    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection: getNavState(posNav).flex }}
                className="content-main"
            >
                <SideBar
                    onBarMove={handleBarMove}
                    label={getNavState(posNav).label}
                />
                <Content />
            </div>
            <Footer />
        </div>
    );
}
```

il file si è svuotato molto, importo i componenti divisi ora in files dentro la cartella components.

La logica è chiara grazie a NavBarDir, ho aggiunto la funzione getNavState che nasconde l' accesso diretto a `NavBarDir`, se cambio la logica di accesso il codice sotto che si ripete non camnbia.

 `const handleBarMove = () => setPosNav(!posNav)`

 Anche qui, non faccio usare al jsx setPosNav, ora cè solo  setPosNav, e se dobbiamo aggiungere altro ? dovrei se usato setPosNav modificae in firo il jsx dove lo usa, mentre cosi succesivamente non ne risente.

### Unica fonte di verità

Con questo esempio finale, di `getBarDir`, o costanti che prendono i valori stringa e il codice sotto accede con le constanti e non la stringa, se la stringa cambia non devo aggiornare in giro chi utilizza quella stringa.

Agli array oggetti ecc, cerchiamo di accedere con un funzione per nascondere o dettagli dietro. che possono cambiare.

### PARTIAMO CON IL PIEDE GIUSTO

Se seguite questi approcci avete poi molte meno difficoltà, vi abiatuate subito con un codice più attento. I problemi di React come nella programmazione in generale sono fortemente legati al codice non bene organizzato, impare tutto quello che cè da usare con React non basta, poi bisogna gestire bene il codice, qui facendo notare cosa comporta, la speranza è che poi continuiate avendo ben presente quello che qui abbiamo esposto.