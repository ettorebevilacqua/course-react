# I compoenti di react

Andiamo ora a rendere le nostre funzioni di render come componenti.

## Le funzioni che diventano componenti

Prendiamo la funzione renderHead vista precedentemente e riscriviamola come componente :

```javascript
  const renderHead = () => (
        <div key="HEADER" className="box s100 firsBg">
            <div className="box s30">First React</div>
            <div className="box s50 right textWhite">
                <a href="home" className="button textWhite">
                    home
                </a>
                <a href="prodotti" className="button textWhite">
                    prodotti
                </a>
                <a href="contatti " className="button textWhite">
                    contatti
                </a>
            </div>
        </div>
    );
```

Questa è la sua versione come componente :

```javascript
  const RenderHead = () => (
        <div key="HEADER" className="box s100 firsBg">
            <div className="box s30">First React</div>
            <div className="box s50 right textWhite">
                <a href="home" className="button textWhite">
                    home
                </a>
                <a href="prodotti" className="button textWhite">
                    prodotti
                </a>
                <a href="contatti " className="button textWhite">
                    contatti
                </a>
            </div>
        </div>
    );
```

Avete notato la differenza ? penso che si noti molto poco 😅

La differenza sta tutta nel nome, il primo carattere R è scritto in MAIUSCOLO.

Se ora RenderHead è un componente significa che posso scriverla come fosse un tag HTML, proviamo quindi a sostituirla nel nostro return :

```javascript
   return (
        <div className="App">
            <RenderHead />
            {renderMenuLeft()}
            {renderContent()}
            {renderFooter()}
        </div>
    );
```

Come possiamo vedere continia a visualizzare l header, è stato difficile ??

Precisiamo, in realtà **non è un compoenente** anche se ora la definizione può essere discutibile se lo vogliamo vedere solo come nuovo tag HTML, il motivo è che il mio **quasi componente** (chiamamolo cosi) si trova dentro un componente, e non è quindi indipendente.

## La definizione di componente software

Un componente software è un'unità modulare e riutilizzabile di un sistema software più grande. Questa è una delle idee chiave nella progettazione orientata agli oggetti e nella programmazione modulare. Ecco una breve descrizione del concetto di componente software:

- **Unità Funzionale o singola resposabilità**: Un componente software è un'unità funzionale e logica del software che svolge una specifica funzione o fornisce un servizio ben definito. Può essere progettato per eseguire un'operazione specifica o rappresentare un *elemento di interfaccia utente*.

- **Riutilizzabilità**: Uno degli obiettivi principali dei componenti software è la riutilizzabilità. Un componente ben progettato può *essere utilizzato in diversi contesti* o progetti senza la necessità di riscrivere il codice. Ciò porta a una maggiore efficienza nello sviluppo e manutenzione del software.

- **Incapsulamento**: I componenti sono progettati per implementare l'incapsulamento, ovvero la capacità di *nascondere i dettagli interni* di implementazione e fornire un'interfaccia chiara e ben definita. Questo consente di gestire la complessità del software e di isolare il funzionamento interno da altre parti del sistema.

- **Comunicazione**: I componenti possono comunicare tra loro attraverso interfacce e contratti ben definiti. Possono invocare le funzionalità di altri componenti e scambiare dati, fornendo così una struttura organizzata per la collaborazione tra le parti del sistema.

- **Indipendenza**: I componenti dovrebbero essere progettati in modo da essere *il più possibile indipendenti* l'uno dall'altro. Questo favorisce la manutenzione e l'evoluzione del software, poiché modifiche apportate a un componente non dovrebbero avere impatti significativi su altri componenti.

- **Scalabilità**: Il concetto di componente è fondamentale per la scalabilità del software. Un sistema complesso *può essere suddiviso in componenti più gestibili*, semplificando così lo sviluppo e la manutenzione a lungo termine.

Esempi: Nei contesti di sviluppo di interfacce utente, un componente può rappresentare una parte specifica della UI, come una barra di navigazione o un modulo di login. Nei contesti di backend, un componente può essere un modulo che gestisce la connessione al database o la logica di business per una funzionalità specifica.

In breve, i componenti software sono blocchi costruttivi fondamentali per la progettazione e l'implementazione di sistemi software, contribuendo alla **modularità**, alla **riutilizzabilità** e alla **manutenibilità del codice**.

Questi concetti non proprio facili in prima battuta da comprendere dovuto anche alla terminologia tecnica, li abbiamo già visti in piccola parte semplicemente separando il codice HTML in funzioni di rendering.

### Manutenibilità

Il primo aspetto visto è la **manutenibilità** del codice dove risulta più agevole modificare il nostro codice HTML rispetto a rimanere annidato dentro ad altre strutture.

### Indipendenza

In piccola parte abbiamo visto l' *indipendenza* già solo perchè non dipendendo nello specifico da un div padre.

### Incapsulamento

come esmpio di *Incapsulamento* ben chiaro lo abbiamo nel return del componente Page :

```javascript
        <div className="App">
            <RenderHead />
            {renderMenuLeft()}
            {renderContent()}
            {renderFooter()}
        </div>
```

Quando leggiamo questo pezzi du codice, nascondiamo i dettagli implementativi, quando lavoro in questa parte di codice, non mi interessa come sia fatto di preciso `RenderHead` ,k interessa vederlo nel contesto degli altri alementi che lo accompagnano, i quali determina il layout della pagina, cosi sappiamo che da destra a sinistra prima viene l' Header, poi il MenuLeft e cosi il Content e il Footer

### Scalabilità

si dice che per scalabilità significa che *può essere suddiviso in componenti più gestibili*, penso che viene da solo l esempio solo per aver diviso il codice in funzioni ben visibili nel return finale come evidenziato poco sopra con l Incapsulamento.

### Unità Funzionale

Header, MenuLeft, Content, Footer rappresentano singolarmenti le sezioni del nostro layout, ecco che `Header` ha una funzionalità ben diversa dal Content per esempio, `Header` può cambiare nel titolo quando cambia il Content e cosi acceniamo anche alla **Comunicazione tra componenti**, ma tende a differenza del Content a rimanere fisso.

Il suo scopo è permetterci di navigare e controllare lo stato della applicazione nel nostro caso con il titolo, che rimane indipendente anche se si direbbe dipende dal `Content`, ma in realtà comunica con il `Content` aggiornadosi su una aspetto preciso della sua **interfaccia** che chiamiamo titolo.

Non dobbiamo qui fare un trattato di Archittetura del software, questi concetti qui descritti non hanno confini netti o se preferite sono legati tra loro ma penso che il senso di base sia chiaro con il solo esempio del layout e le funzioni che abbiamo definito.

## Incapsulamento e l' interfaccia

Interfaccia, che parolone.... andiamo a fare l esempio come abbiamo accenato al titolo del Header per ora fisso con il testo `First React`:

```javascript
const RenderHead = () => (
    <div key="HEADER" className="box s100 firsBg">
        <div className="box s30">First React</div>
        <div className="box s50 right textWhite">
            <a href="home" className="button textWhite">
                home
            </a>
            <a href="prodotti" className="button textWhite">
                prodotti
            </a>
            <a href="contatti " className="button textWhite">
                contatti
            </a>
        </div>
    </div>
);
```

```javascript
const RenderHead = (title, Menu) => (
    <div key="HEADER" className="box s100 firsBg">
        <div className="box s30">{title}</div>
        <Menu />
    </div>
```

Basta passare alla funzione il titolo come title e metterlo dentro le parentesi graffe `{title}` che servono per interpretare il codice come javascript e non JSX **(precisiamo... JSX non è HTML, il JSX lo simula e appare uguale)**

Già che ci siamo passiamo il `<Menu />` in questo caso come componente che andiamo a definire :

```javascript
const Menu = ()=>(
    <div className="box s50 right textWhite">
            <a href="home" className="button textWhite">
                home
            </a>
            <a href="prodotti" className="button textWhite">
                prodotti
            </a>
            <a href="contatti " className="button textWhite">
                contatti
            </a>
        </div>
    )
```

A questo punto sembra facile, chiamo:
`RenderHead('nuovo titolo', Menu)`
e il gioco è fatto ? NO !  😮‍💨... Huston abbiamo un problema !

`RenderHead` ora lo abbiamo definito come compomente solo perchè abbiamo messo il primo carattere in maiuscolo... intendiamoci è sempre una funzione e i compoenti sono sempre una funzione visto che cambia solo un carattere, ma quello che cambia è come utilizziamo questa funzione, ora la utiliziamo direttamente come tag JSX in questo modo (di nuovo...)

```javascript
return
    <div className="App">
            <RenderHead />
            {renderMenuLeft()}
            {renderContent()}
            {renderFooter()}
        </div>

```

### Dove passiamo i paramentri della *"funzione"* a `<RenderHead />` ?

`RenderHead` la utiliziamo come `<RenderHead />` non è più una funzione con le parentesi per poter passare parametri, se invece fosse `{renderFooter()}`
scriveromo facilmente `{fosse renderFooter('nuovo titolo', Menu)}`, ripetiamo che dentro le parentesi graffe il codice è interpretato come javascript, ma come componente o tag JSX non ci sono pià le parentesi, è sempre una funzione ma dentro a JSX non funziona più per tale !

Dovrei se proprio non so come fare scrivere :

```javascript
return
    <div className="App">
            {RenderHead('nuovo titolo', Menu)}
```

tornando indietro e tanti saluti a trattarla come TAG JSX, ma i TAG hanno i parametri, nel nostro codice per esempio i div hanno `className`, quindi come nel html ora li passiamo in questo modo :

`<RenderHead title="nuovo titolo" menu={Menu} />`

In partocolare, per title sono sufficenti i doppi apici, come richiesto nel HTML, ma menu lo dobbiamo passare dentro le parantesi graffe in quanto a tutti gli effetti è una variabile di tipo funzione e per tale va trattato come javascript e non JSX/HTML diversamente dovrebbe essere chiaro che se lo mettiamo dentro i doppi apici è una stringa come lo è `"nuovo titolo"` per maggiore chiarezza, proviamo a passare `menu` come titolo :

`<RenderHead title="Menu" menu={Menu} />` con questo esempio dovrebbe essere ben chiara la differenza nel primo caso è una stringa, nel secondo un componente react (che sempre è una funzione !).

### come cambiano i parametri della funzione ora componente ?

```javascript
const RenderHead = (props) => {
    const Menu = props.Menu;
    console.log(props);

    return <div key="HEADER" className="box s100 firsBg">
        <div className="box s30">{props.title}</div>
        <Menu />
    </div>
    }
```

I parametri del compomente jsx RenderHead vengono quindi passati dietro le quinte nella sua funzione che lo definisce, come un unico parametro oggetto che racchiuse le sue voci

quindi se proviamo a visualizzare con console log props visualizza il seguento oggetto :

```javascript
props = {title: 'nuovo titolo', Menu: Menu}
```

con i distruttori di es6 (se non si conoscono andare a vedere l' argomento ) posso più semplicemente scrivere come è solito usare nei compomenti di react :

```javascript
const RenderHead = ({title, Menu}) => (
    <div key="HEADER" className="box s100 firsBg">
        <div className="box s30">{title}</div>
        <Menu />
    </div>
    )
```

In questo modo estrapolo dal oggetto passato passato direttamente i parametri con i loro nomi originali, tanto per capirci, quando ho scritto :

```javascript
const RenderHead = (props) => {
    const Menu = props.Menu;
    ....
```

potevo cosi anche liberamente scrivere :

```javascript
const RenderHead = (props) => {
    const pippo = props.Menu;
    .....
```

Ma non posso poi usarlo come tag `<pippo />` sempre per la banale regola del primo carattere maiuscolo, ma se lo definisco come `const Pippo = props.Menu;` posso poi chiamarlo con il nuovo nome che abbiamo definito `<Pippo />`, questo per dire che i nomi non sono fissi, posso assegnarli a piacimento specie se dovessero entrare in collisione con altri già presenti, ma salvo i casi particolari, meglio usare i nomi originali di norma sensati per cosa rappresentano, Menu è indicativo, Pippo per nulla.

### Interfaccia

Riassumendo questa spiegazione dei paramentri dei componenti un po prolissa in quanto il concetto è semplice, con il concetto di Interfaccia diciamo che l intergaccia di renderHead è :

```javascript
props = {title: 'nuovo titolo', Menu: Menu}
```

La **Comunicazione** del nostro componente come diceva la definizione tramite contratti ben definiti, avviene tramite un oggetto con i membri title di tipo stringa e Menu di tipo componente, facendo un giro di parole diciamo anche che

***RenderHead si INTERFACCIA con il suo mondo esterno COMUNICANDO tramite il contratto definito nel oggetto `{title: <stringa>, Menu: <componente}`***

Per concludere, typescript qui non utilizzato, definisce le interfaccie, se dovessimo scrivere il nostro componente con typeScript, siamo obbligati a scrivere i tipi in questo modo :

```javascript
interface PropsHead {
    title: string;
    Menu: React.Component
}
d
const RenderHead = ({title, Menu}: PropsHead) => (
    .....
```

Nei paramentri della funzione scriviamo `:PropsHead` in questo modo posso leggere le variabili solo con quel nome e solo dei tipi definiti nel interfaccia, Menu è appunto definto come  Menu: React.Component, diversamente viene generato un errore, come richiesto dal concetto di ***contratto ben definito***.

## Riutilizzabilità

Per vedere meglio questo concetto andiamo a questo a finire di definire le nostre funzioni come componenti, quindi li portiamo fuori dal compomente Page, com il componente Menu che abbiamo prima definito :

```javascript
const Menu = () => (
    <div className={`box right textWhite`}>
        <a href="home" className="button textWhite">
            home
        </a>
        <a href="prodotti" className="button textWhite">
            prodotti
        </a>
        <a href="contatti " className="button textWhite">
            contatti
        </a>
    </div>
);

const RenderHead = ({ title, Menu }) => (
    <div key="HEADER" className="box s100 firsBg">
        <div className="box s30">{title}</div>
        <Menu />
    </div>
);

const RenderMenuLeft = () => (
    <div key="MENULEFT" className="box s20 ">
        <Menu />
    </div>
);

const RenderFooter = () => (
    <>
        <div className="boxs30 box">copyright 2022</div>
        <div key="FOOTER" className="box s100 ">
            <div className="box s30 textCenter"> </div>
            <div className="box s100 secondBg">
                <div className="box s30 textCenter">
                    <ul>
                        <li>Chi siamo</li>
                        <li>La nostra storia</li>
                        <li>Contatti</li>
                    </ul>
                </div>
            </div>
        </div>
    </>
);

const RenderContent = () => (
    <div key="CONTENT" className="box s66 ">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet pretium urna. Vivamus venenatis velit nec neque ultricies,
            eget elementum magna tristique. Quisque vehicula, risus eget aliquam
            placerat, purus leo tincidunt eros, eget luctus quam orci in velit.
            Praesent scelerisque tortor sed accumsan convallis.
        </p>
    </div>
);

export default function Page() {
    return (
        <div className="App">
            <RenderHead title="Motor" Menu={Menu} />
            <RenderMenuLeft />
            <RenderContent />
            <RenderFooter />
        </div>
    );
}
```

RenderHead e RenderMenuLeft presentano lo stesso menu, quindi perchè non **riutilizzarlo** e condividerlo nei 2 componenti ?

```javascript
const RenderHead = ({ title, Menu }) => (
    <div key="HEADER" className="box s100 firsBg">
        <div className="box s30">{title}</div>
        <Menu />
    </div>
);

const RenderMenuLeft = () => (
    <div key="MENULEFT" className="box s20 ">
        <Menu />
    </div>
);
```

Se provato ora il codice, renderMenuLeft si incasina, i caratteri non si leggono, quasi non si vede. Il problema è che Menu è orizzontale, mentre RenderMenuLeft vuole un menu verticale.

Per risolvere il problema devo dare una proprietà a Menu di visualizzarsi in orizzontale o verticale. Per fare questo utilizziamo i css e la proprietà flex quindi definiamo nel file dei css queste classi css :

```css
.flex-box {
    display: flex;
    flex-wrap: nowrap;
    background-color: DodgerBlue;
}

.flex-col {
    flex-direction: column;
}

.flex-row {
    flex-direction: row;
}

.menu > a {
    color: darkred;
    background-color: #f1f1f1;
    width: 100px;
    margin: 4px;
    text-align: center;
    line-height: 22px;
    font-size: 14px;
}
```

Flex è la proprietà css per distribuire gli elementi adiacenti, dove possiamo decidere con `flex-direction` se in verticale o orizzontale, definiamo anche .menu > a che imposta tutti i tag a che si trovano dentro l' elemento con classe menu.

Aggiungiamo la proprietà flexClass a Menu dove la inseriamo nel elenco delle classi, tra cui flex-box che dice che deve dispore gli elementi.

```javascript

const Menu = ({ flexClass }) => (
    <div className={`box right flex-box ${flexClass} menu`}>
);

const RenderHead = ({ title, Menu }) => (
    <div key="HEADER" className="box s100 firsBg">
        <div flexClass="box s30">{title}</div>
        <Menu flexClass="flex-row" />
    </div>
);

const RenderMenuLeft = () => (
    <div key="MENULEFT" className="box s20">
        <Menu flexClass="flex-col" />
    </div>
);

```

Menu ora lo chiamo con il paramentro direzione, nei css ho impostato i colori blu scuro per il `<div>` che contine i link `<a>` , e i link con sfondo bianco e caratteri scuri, a questo punto se cambio qualosa dentro a Menu si riflette sia sul header che sul left.

### Singola resposabilità e Riutilizzabilità

Dividendo in componenti dal punto di vista di tutta la pagina, ho creato la singola responsabilità rispetto alla "zona" della pagine, la nostra pagina `Page` ora ha la sola responsabilità di mettere in ordine il layout e non i dettagli per ogni elemento come ben visibile dal suo return , oltre il fatto se prima era pieno di codice, ora è quasi vuoto e perfettamente leggibile di cosa esso si occupa, che abbiamo chiamato delle sue responsabilità.

Allo stesso modo renderHeader lo abbiamo liberato dalla responsabilità di quali voci del menu deve visualizzare, e quale titolo visualizzare, in questo modo come per `Page` ha la sola responsabilità del suo layout interno, e cosi pure i vari componenti che iniziano con la parola render tipo renderFooter, la parola stessa contempla il concetto di visualizzare.

Menu diversamente è solo responsabile di quali voci di menu visualizzare, come disporre queste voci lo abbiamo delegato esternamente, non a caso nei componenti responsabili del layout o se preferite l'ordine di visualizzazione, che **comunicano** a menu come ordinare i suoi elementi interni, liberandolo da tale **responsabilità** che non permette cosi la sua **riutilizzabilità**.

La frase che ho appena scritto sopra, contempla da sola 3 principi dei componenti, questo per dire che tali principi sono dipendenti tra di loro, la posso generalizzare dicendo che :

**Per avere la riutilizzabilità ho bisogno della singola responsbilità dove i compoenti comunicano al componente che utilizza la sua resposabilità.**

## Conclusioni finali

Abbiamo visto cosa sono i componenti, potevamo trattare l argomento in modo meno prolisso ma quello che ho voluto qui mettere bene in luce, è la metodologia che si porta dietro il concetto più in generale di componente.

React come altre librerie, sono condensati di metodologie, di "aggiustamenti di tiro", posso diventare molto bravo in React dal punto di vista che conosco bene tutti i suoi "comandi", ma  utilizzarli male come spesso si vede anche da chi con esperienza. Allo stesso modo, posso conoscere bene tutte le parole della mia lingua e la sua grammatica, ma se non metto ordine alle parole è tutto inutile perchè scrivero che si fa fatica a comprendere il senso.

Più in generale, se usate React siete programmatori, se avete un po di esperienza sapete bene le difficoltà di mettere ordine alle cose o come meglio fare e rendere più chiaro il codice, e come velocemente ci incasiniamo.

l' argomento qui esposto **ha la pretesa di essere valido anche se non si è interessati al uso di React** ma React ci permette di essere un gran esempio, diversamente potete trovare l argomento trattato in pagine e pagine senza essere cosi efficaci come invece react mette subito ben in evidenza, in quanto già solo dividere come visto il codice html in componenti applichiamo subito i concetti di archittetura del software senza essere cosi astratti.

Il motto sarà sempre come siamo partiti, mettiamo ordine alle cose, separiamo il codice, domandiamoci se si può fare meglio, e con il prossimo argomento parliamo della **NOMENCLATURA**, diamo un nome appropriato alle cose.

## APPENDICE : il componente react im breve

- Il compomente react è una funzione con il primo carattere maiuscolo nel nome, in questo modo con tale nome lo posso inserire nel jsx tipo : `<MyComponent />`

- I suoi paramentri sono usati come un comune elemento HTML `<Head title="my app">`

- La sua funzione prende un unico valore che chiamiamo in genere le props, esso è un oggetto javascript con i nomi dei paramentri come chiavi : `{title:'my app', Menu:{Menu}}`

- I parametri li chiamiamo interfaccia del componente e determinano quali possiamo usare come tag jsx.
