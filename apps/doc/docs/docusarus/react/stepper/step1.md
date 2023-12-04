# 1 Separare il codice html

## Inziamo con del codice HTML i esempio

Partiamo con un esempio che dobbiamo sistemare una bozza di sito male progettata, ma che rende l' idea di cosa vogliamo.

Abbiamo un componente di react che rappresenta la nostra pagina di solo HTML il quale è per ipotesi stato inserito con un copia e incolla da un altro sito :

```javascript
export default function Page() {
    return (
        <div className="App">

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

            <div key="MENULEFT" className="box s20 ">
                <ul>
                    <li>
                        <a href="somepage.html" className="button">
                            Camion
                        </a>
                    </li>
                    <li>
                        <a href="somepage.html" className="button">
                            Vetture
                        </a>
                    </li>
                    <li>
                        <a href="somepage.html" className="button">
                            Moto
                        </a>
                    </li>
                </ul>
            </div>

            <div key="CONTENT" className="box s66 ">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas sit amet pretium urna. Vivamus venenatis velit nec
                    neque ultricies, eget elementum magna tristique. Quisque
                    vehicula, risus eget aliquam placerat, purus leo tincidunt
                    eros, eget luctus quam orci in velit. Praesent scelerisque
                    tortor sed accumsan convallis.
                </p>
            </div>

            <div key="FOOTER" className="box s100 ">
                    <div className="boxs30 box">copyright 2022</div>
                    <div className="box s30 textCenter">  </div>
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

        </div>
    );
}
```

Se analizziamo meglio il file, vediamo che è diviso nei suoi div sul parametro key in :

HEADER, MENULEFT, CONTENT, FOOTER

Proviamo quindi a separare i suoi elementi, dividendo il codice dentro a funzioni

```javascript

 export default function Page() {
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

    const renderMenuLeft = () => (
        <div key="MENULEFT" className="box s20 ">
            <ul>
                <li>
                    <a href="somepage.html" className="button">
                        Camion
                    </a>
                </li>
                <li>
                    <a href="somepage.html" className="button">
                        Vetture
                    </a>
                </li>
                <li>
                    <a href="somepage.html" className="button">
                        Moto
                    </a>
                </li>
            </ul>
        </div>
    );

    const renderContent = () => (
        <div key="CONTENT" className="box s66 ">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas sit amet pretium urna. Vivamus venenatis velit nec
                neque ultricies, eget elementum magna tristique. Quisque
                vehicula, risus eget aliquam placerat, purus leo tincidunt eros,
                eget luctus quam orci in velit. Praesent scelerisque tortor sed
                accumsan convallis.
            </p>
        </div>
    );

    const renderFooter = () => ( // qui viene generato un errore
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
    );
    return (
        <div className="App">
            {renderHead()}
            {renderMenuLeft()}
            {renderContent()}
            {renderFooter()}
        </div>
    );
}
```

renderFooter genera un errore :
`JSX expressions must have one parent element.`

```javascript
    const renderFooter = () => ( // qui viene generato un errore
        <div className="boxs30 box">copyright 2022</div>
        <div key="FOOTER" className="box s100 ">
        .....
```

I due div iniziali si trovano nello stesso livello, in altre parole la mia funzione non inizia con un unico elemento che racchiude il resto, e questo genera un errore.

Non è possibile creare il nostro jsx con elemneti principali dello stesso livello, la regola vuole che ci sia un unico elemento padre iniziale.

Il problema lo risolvo racchiudendo i due div iniziali dentro a un div padre :

```javascript
    const renderFooter = () => (
        <div>
            <div className="boxs30 box">copyright 2022</div>
            <div key="FOOTER" className="box s100 ">
            ......
        </div>
    );
```

### Il tag vuoto Fragment

Ma cosi facendo introduciamo ulteriori elementi dom, per evitare questo React mette a disposizione il tag vuoto chiamato fragment, quindi un tag che si presenta senza nome :

```javascript
<>
    <div>A</div>
    <div>B</div>
</>
```

a questo punto renderFooter diventa :

```javascript
  const renderFooter = () => (
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
```

## I Vanatggi di questa seperazione

Andiamo a vedere quali vantaggi abbiamo raggiunto separando il codice :

### Evitiamo le annidazioni

Il nostro codice ora è meno annidato  In questo modo dentro a ogni funzione è più facile manipolare il codice senza che mi perdo in annidazioni sempre più profonde e posso cosi concentrarmi sulla singola sezione dove la sua manipolazione è più agevole.

### La singola resposabilità

Nella programmazione esiste il concetto di singola resposablità, cioè racchiudiamo il codice dentro a funzioni dedicate a controllare un signolo aspetto, questo concetto non sempre facile da afferare qui è molto evidente.

Le nostre funzioni sono responsabili di una singola sezione del layout della pagina, succesivamente complicheremo le cose e vedremo che questo torna di grande aiuto.

### Leggiamo chiaramente il layout della Pagina

```javascript
    return (
        <div className="App">
            {renderHead()}
            {renderMenuLeft()}
            {renderContent()}
            {renderFooter()}
        </div>
    )
```

La cosa che voglio mettere bene il luce, è la parte finale del nostro codice, il suo return, letto in questo modo rappresenta molto chiaramente la struttura della pagina che chiamiamo layout, se devo aggiungere nuove sezioni le aggiungo in questo livello dove risulta tutto chiaro e non mi perdo in antipatici tag chiusi male.

### Cotrollare eventali condizioni in modo agevole

Se dovessi visualizzare o meno il menuLeft per ampliare la sezione del contenuto, potrei scrivere :

```javascript
    return (
        <div className="App">
            {renderHead()}
            {
                if (showMenu) {
                    renderMenuLeft()
                }
            }
            {renderContent()}
            {renderFooter()}
        </div>
    )
```

Diversamente avrei dovuto fare questo nel mezzo del codice HTML rendendo l' if meno visibile con un uteriore livello di annidazione.

Se dovessi poi inserire altre if interne, potete immaginare che cosi dopo poco il codice rimane difficile da maneggiare, con le chisure delle parentesi graffe sperdute nel fondo da qualche parte con la fatica a capire a quela if corrsiponde.

Allo stesso modo anche con i div annidati mi trovo con lo stesso problema, mi trovo cosi una serie di molti div di chiusura che è difficile capire a quale loro appartura appartengono.

Molti lettori che presumo già conoscono l HTML capiscono cosa intendo, e possono immaginare se aggiungiamo pure un ulteriore livello delle if.

### LE IF DENTRO A JSX NON FUNZIONANO (!!!)

Se avete provato il codice precedente che ho scritto magari un un valore fisso true o false di test piuttosto che una variabile, vi accorgete che viene generato un errore,

## Non sono ammessi in jsx

### if, while/loop, for, switch

i seguenti costrutti detti statements non sono possbili il loro sostituzione usiamo

- **operatori ternari** esempio : seQualcosaVero ? faiQuesto : faiAltro
- **map, filter , reduce ecc**  degli array rispetto al for
- **funzioni** con al loro interno gli statements non possibili che chiamano le diverse funzioni di rendering come abbiamo definito.
- **oggetti** in sostituzione dello switch che andremo a vedere.

```javascript
    return (
        <div className="App">
            {renderHead()}
            { showMenu ? renderMenuLeft() : ''}
            {renderContent()}
            {renderFooter()}
        </div>
    )
```

L operatore ternario restituisce una stringa vuota per dire di non visualizzare nulla, il suo costrutto è inoltre più elegante di una eventuale  if il quale può rientrare dentro una riga.

Con questi esempio penso sia molto chiaro i molteplici vantaggi che porta separare il codice dentro a funzioni specializzate.

Queste funzioni che abbiamo creato "al volo" come prima fase ci possono tornare utile per mettere ordine e chiarirci le idee, anche se non sempre è necessario, lo scopo è di promuoverle in componenti che nello step successivo andiamo a vedere.
