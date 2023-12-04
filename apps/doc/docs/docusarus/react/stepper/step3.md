# Nomenclatura

## teminologia inglese

Cerchiamo di usare i nomi in inglese senza la pretesa che il lettore consoca tale lingua, molti termini sono molto simili al italiano , seno viene spiegato il suo significato, ma dobbiamo abituarci alla terminologia inglese, in quanto il codice anche come esempio parla in inglese e gli stessi manuali in italiano come questo, non a caso li usano molto.

### non ripetere il termine del contenitore padre

Se ho una cartella musica, non chiamo le sue sottocartelle musica rock, musica classica, musica folck ecc, semplicemente rock, classica ecc, ma se ho una cartella cultura ha senso chiamare una cartella musica classica e un altra letteratura classica o storia classica, anche se questo è già un suggerimento nel creare cartelle come musica, letteratura, storia ecc dove dentro musica troverò la cartella rock, classica ecc.

facciamo un classico brutto esempio che non difficilmente troviamo in giro per il codice :

```javascript
const user = {
  userName: "",
  userMail: "",
  userCity: "",
};
```

è chiaro come sia ridondante nei membri iniziare come user, e poi chiamo :
`user.userName`, invece che `user.name` dove il padre da la desinenza.

### il jsx è un linguaggio dichiarativo

In questa guida cercheremo di dare quanto più senso ai nomi utilizzati, nella programmazione i nomi sono molto importanti, il jsx come l' html sono linguaggi dichiarativi, e l uso dei componenti serve ad aumentare la semantica.

Abbiamo dato il nome ai nostri componeti come RenderHead, RendereFooter ecc, questo perchè li abbiamo inzialmente definiti dentro al componente Page, e dentro quel livello avevano, ma il componente con il suo return di fatto da render del jsx, chiamare un compoente che unizia con render è come chiamare `user.username`

Quindi andiamo a rinominare i nostri componenti che inziano con render come :
Header, MenuLeft, Content, Footer

### SideBar e NavBar.

MenuLeft lo usa come barra a lato rispetto al contenuto, e potrei voler inserire non solo la navigazione ma altro contenuto, quindi potrei chiamarlo a lato sinistro in inglese `SideLeft`, ma se poi voglio far scegliere al utente se posizionarlo a destra o sinistra ? diventa quindi `Side` che però è troppo generico, ma essendo una barra laterale, gli diamo il nome `<SideBar>`.

In questo modo il Menu mi chiedo che tipo di menu è ?? il menu per scegliere un tipo di automezzo o un menu per la navigazione ?? precisiamo quindi il nome e lo chiamiamo `<NavBar>`, Nav come navigazione e Bar perchè è una barra, nel nostro caso inserita sia nel header che nella SideBar.

ora il mio layout si presenta come :

```javascript
 return (
        <div className="App">
            <Header title="Motor" Menu={Menu} />
            <SideBars />
            <Content />
            <Footer />
        </div>
    );
```

E cosi abbiamo aggiustato la Nomenclatura.

### Single Source of Truth

Single Source of Truth significa unica fonte di verità.
Rivediamo il menu ora chiamato `NavBar`, con il parametro flexClaas gli passiamo flex-col o flex-row per decidere se il menu è orrizontale o verticale.

NavBar potrei averlo utilizzato in molti componenti o pagine nel mio codice, ma se poi voglio cambiare il nome alla classe css ?? non sarebbe grave mantenere tale nome, ma se camabiamo logica e non usiamo più flex o usiamo altro ?

Devo cosi poi andare a modificare in giro per il codice tutte le volte che uso NavBar, immaginate se fosse un pulsante che usiamo molto, ma molto in giro.

A noi ci interessa sapere non la classe css ma se deve ordinarsi per row o per column come usa fare nel css flex con la proprietà `flex-direction: column`, possiamo prendere esempio e quindi chiamare la proprietà direction che può essere row o column quindi modifichiamo come :

```js
const NavBar = ({ flexClass }) => (
    <div className={`box right flex-box ${flexClass} menu`}>
```

usiamo direction come paramentro

```js
const NavBar = ({ direction }) => (
     <div className={`box right flex-box ${direction==='col' ? 'flex-col' : 'flex-row'} menu`}>
```

Ora NavBar è unica fonte di verità, mi basta solo specificare col nel paramentro per farla diventare verticale, se ommetto la proprietà di default è orrizontale.

### il paraametro vero/false nel jsx se presente o meno

Ancora meglio, con un valore booleano, dove se presente il parametro col, allora applica il flex-col :

```js
const NavBar = ( props ) => (
     <div className={`box right flex-box ${'col' in props ? 'flex-col' : 'flex-row'} menu`}>
```

Verifichiamo come 'col' in props solo se è presente la proprietà senza dover leggere il valore true o false, la presenza o meno determina true o false.

In questo caso posso chiamare NavBar come `<Menu col />`
piuttosto che `<Menu direction="col" />`

### Sitemiamo meglio la pagina

Creiamo il compomente about us, spostiamo copyright 2022 dentro al footer, e aggiustiamo i nomi delle classi agli elementi creando più correttamente il file css. Il content in particolare deve occupare tutta l 'area verticale disponibile.

### Posizone della NavBar a destra o sinistra

Facciamo scegliere l utente la posizione della NavBar se a destra o sinisitra.

Per fare questo cambiamo il layot della pagina :

```js
    return (
        <div className="App">
            <Header title="Motor" Menu={Menu} />
            <div key="MAIN-CONTENT" className="content-main">
                <SideBar />
                <Content />
            </div>
            <Footer />
        </div>
    );
```

Inseriamo un div MAIN-CONTENT per contenere SideBars e Content, con il seguente css :

```css
.content-main {
    flex: 1 1 auto; // deve occupare tutto lo spazio verticale
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row; // gli elementi devono posizionarsi sulla riga
}
```

Abbiamo aggiuto flex: 1 1 auto; in modo che il contenuto occupi tutto lo spazio verticale, ma attenzione che il div principale della pagina deve avere heigh:100% inserito nella class css App, se no diversamente non avrebbe spazio per distendersi.

Se proviamo a cambiare in `flex-direction: row;` in :
`flex-direction: row-reverse` la disposione sulla riga come oridine di inverte, quindi la SideBar si sposta a destra del Content, il dispaly flex permette di avere più controllo su come devono essere disposti gli elementi.

A questo punto piuttosto che aggiungere una nuova classe css, utilizziamo style per manipolare direttamente le singole voci.

```js
<div key="MAIN-CONTENT"
   style={{ flex-direction: row-reverse }}
   className="content-main">
```

Vediamo subito le doppie parentesi graffe dentro a style, le prime per inserire come sappiamo codice js, le seconde sono un oggetto js :

`{ flex-direction: row-reverse }`

il primo errore una volta capito che è un oggetto js, è che row-reverse è una stringa non una parola chiave js, va quindi inserita tra gli apici, il secondo problema è che non capisce flex-direction pur essendo una proprietà più che leggitima dei css, infatti dentro al file css non da errore. Ma fcciamoci una domanda :

### perchè usiamo className e no class per gli stili ?

Il motivo è che la parola class in js è una parola riservata per creare le classi js, jsx ancora una volta lo ripetiamo, non è HTML lo simula, in realtà è sempre javascript, nella configurazione di un progetto react usiamo un plugin babel che traduce il jsx in javascript, quindi se scriviamo class viene confusa con la parola riservata.

Per lo stesso motivo, style prende in oggetto js, motivo per le doppie parentesi graffe, riordiamo che quando dentro a JSX apriamo parentesi graffe, diciamo in altre parole di non tradurre e leggere il contenuto come javascript.

### I nomi degli stili in formato camel case

per far leggere `flex-directiom` dentro a style, dobbiamo scriverlo nel formato camel case in questo modo :

`style={{ flexDirection: 'row-reverse' }}`

Camel case significa che anzchè gli spazi per mantenere intatta la parola, ma non sacrificare la lettura scrivo tutto in piccolo e il primo carattere in grande, nei css gli spazi sono sostititi con il carattere `-` quindi dentro a style in react elminiamo il caarattere `-`, e la parola che segue la scriviamo con il primo carattere grande, esempio :

`border-color` diventa `borderColor`, cosi `flex-direction` in `flexDirection`

possiamo ora provare e vedere come la NavBar si sposta a destra.

### rendiamo dinamico `flexDirection: 'row-reverse'`

Come abbiamo già visto possiamo esprimere la proprietà con una variabile,per il momento la creiamo dentro al componente Page :

```js
export default function Page() {
    const flexDirection = 'row-reverse';
    return (
        <div className="App">
            <Header title="Motor" Menu={Menu} />
            <div key="MAIN-CONTENT" style={{ flexDirection }} className="content-main">
```

A questo punto ci serve un pulsante per cambiare la proprietà, dove lo mettiamo ??
possiamo metterlo in testa alla SideBar

```js
const SideBar = () => (
  <div key="MENULEFT" className="sideBar">
    <button className="btNavBarPos secondBg">{">>>"}</button>
    <NavBar col />
  </div>
);
```

Inserito il pulsanto al suo click non fa nulla, per fargli fare delle azioni ho bisogno di impostare la proprietà `onClick` in questo modo :

`<button onClick={()=>alert('click')} className="btNavBarPos secondBg" >`

questo visualizza un alert per provare se funziona il nostro click
Quello che mi interessa però è al click cambiare il valore dentro a funciont page

```js
export default function Page() {
    const flexDirection = 'row-reverse';
```

Ma trovandomi dentro a `SideBar` non vedo tale variabile quindi dovrei dire a Page : _"guarda che mi hanno cliccato, cambiami la tua variabile flexDirection"_

## Le funzioni di evento e callBack

Devo quindi notificare a Page l' azione di click eseguita dentro un suo compoente figlio, daro che SideBar è usata dentro a Page.

Per fare questo posso definire una proprietà di SideBar che chiamiamo `onClickBarMove` dove gli passiamo il valore `row-reverse` come qui sotto :

```js
const SideBar = ({ onClickBarMove }) => (
  <div key="MENULEFT" className="sideBar">
    <button
      onClick={() => {
        onClickBarMove("row-reverse");
      }}
      className="btNavBarPos secondBg"
    >
      {">>>"}
    </button>
    <NavBar col />
  </div>
);
```

Dentro a Page posso provare a scrivere :

```js
export default function Page() {
   let flexDirection = 'row'
   return (
       <div className="App">
           <Header title="Motor" Menu={NavBar} />

           <div key="MAIN-CONTENT" style={{ flexDirection }} className="content-main">

               <SideBar onClickBarMove={(valore)=>{
                    alert(valore);
                }} />

        ....
```

In questo modo ora è Page che visualizza l alert con il valore impostato.
Cosa abbiamo fatto ?

- Abbiamo definto una nuova proprietà di tipo evento con nome onClickBarMove a `SideBar`
- dentro a page abbiamo impostato la proprietà `onClickBarMove` come avevamo fatto dentro a `SideBar` con l evento onClick.

### la call back

Nei componenti non definisco solo paramentri di valori ma anche funzioni da passare, e cosi che funziona su `button` il suo `onClick`, noi a questa proprietà dobbiamo assegnare una funzione per utilizzarla.

Allo stesso modo definisco la proprietà `onClickBarMove` in `SideBar` e la sua funzione dentro a `Page`, la quale funzione viene evocata come call back da SideBar.

```js
<SideBar onClickBarMoveXXX={(valore)=>{
                    alert(valore);
                }} />
```

Facciamo questa prova, dentro a page cambiamo `onClickBarMove` con nClickBarMoveXXX quindi SideBar non legge di certo questa proprietà e quindi non è stata assegnata, se aprite gli strumenti per gli sviluppatori, che ricordo con il tasto destro chiamiamo ispezione, vediamo che nella console è presente un errore :

`Uncaught TypeError: onClickBarMove is not a function at onClick`

L' errore avviene dentro a SideBar nella funzione associata a onClick di button, la quale prova a eseguire la funzione onClickBarMove dei suoi parametri, ma non essendo definita quindi ha valore undefined, mi genera questo errore, in quanto undefined non è una funzione.

```js
const SideBar = ({ onClickBarMove }) => (
  <div key="MENULEFT" className="sideBar">
    <button
      onClick={() => {(
    // se onClickBarMove non è definita genera errore
        onClickBarMove("row-reverse");
      }}
      className="btNavBarPos secondBg"
    >
```

La stessa cose avviene se assegno un numero o una stringa, qualsiasi cosa che non è una funzione a onClickBarMove.

```js
<SideBar onClickBarMove={5}} />
```

SideBar proverà a eseguire 5() come fosse una funzione, ma non essendo tale genere quel errore.

Quindi quando proviamo ad eseguire la chiamata di call back dobbiamo prima verificare se esiste :

```js
const SideBar = ({ onClickBarMove }) => (
  <div key="MENULEFT" className="sideBar">
    <button
      onClick={() => {
    // chiama onClickBarMove solo se esiste
       onClickBarMove && onClickBarMove("row-reverse");
      }}
      className="btNavBarPos secondBg"
    >
```
Se ancora non è chiaro proviamo a mettere il bottone direttamente dentro a page : 


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
            </div>s
           <div key="MAIN-CONTENT" style={{ flexDirection }} className="content-main">

               <SideBar onClickBarMove={(valore)=>{
                  alert(valore)
                }} />

        ....
```

Cosa cambia tra onClick del bottone e onClickBarMove di SideBar è il nome e che a differenza di button, siamo noi che abbiamo definito come gestire l evento dietro quinte nel nostro casi dentro a SideBar.

ora possiamo provare a cambiare il valore di flexDirection detro Page :

```js
export default function Page() {
    let flexDirection = 'row'
    return (
    ....
        <SideBar onClickBarMove={(valore)=>{
            flexDirection = valore
            alert(valore)
        }} />
```

alert mi visualizza il nuovo valore di flexDirection, ma non succede nulla !

Il motivo è che in realtà `function Page` deve essere di nuovo eseguita, per funzionare. Dietro le quinte React esegue per noi Page come `Page()` in quanto i componento sono funzioni.

Per funzionare dovrei dire a react di rieseguire la funzione Page richiamandola di nuovo come `Page()`, che a tutti gli effett restituisce codice jsx, se non viene eseguita la pagina rimane aggiornata al ultima volta che ha fatto il suo render.

Quello che manca è quindi come dire a react di aggiornare un componente, in particolare quando viene modificato uno dei suoi valori, per fare questo dobbiamo usare lo stato di react che permette di aggiornare il compoenente quando varia uno dei suoi valori.

Questo aspetto lo andremo a vedere nel prossimo argomento : La gestione dello stato. La cosa importante è aver compreso la callback traumite componente padre e figlio che la evoca.

Questo il codice finale fino ad ora visto :

```js
import "./styles.css";

const AboutUs = ()=>  (
<div className="footerAbout">
<ul>
    <li>Chi siamo</li>
    <li>La nostra storia</li>
    <li>Contatti</li>
</ul>
</div>
)

const NavBar = (props) => (
    <div
        className={`menuFlex ${
            "col" in props ? "flex-col" : "flex-row"
        }`}
    >
        <a href="home">home</a>
        <a href="prodotti" >prodotti</a>
        <a href="contatti "> contatti</a>
    </div>
);

const Header = ({ title, Menu }) => (
    <div key="HEADER" className="header firsBg">
        <div className="title">{title}</div>
        <Menu />
    </div>
);

const SideBar = ({ onClickBarMove }) => (
    <div key="MENULEFT" className="sideBar">
      <button
        onClick={() => {
          onClickBarMove("row-reverse");
        }}
        className="btNavBarPos secondBg"
      >
        {">>>"}
      </button>
      <NavBar col />
    </div>
  );

const Footer = () => (
        <div key="FOOTER" className="footer firsBg">
            <div className="textCenter">
                <div className="">copyright 2022</div>
            </div>
            <div className="secondBg">
            <AboutUs />
            </div>
        </div>
);

const Content = () => (
    <div key="CONTENT" className="content">
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
    let flexDirection = "row";
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
                        alert(valore);
                    }}
                />
                <Content />
            </div>

            <Footer />
        </div>
    );
}
```
