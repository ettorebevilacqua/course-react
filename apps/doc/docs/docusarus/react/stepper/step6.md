# Il routing

Andiamo a vedere cosa sia e a cosa serve il routing di react.
La nostra App presenta degli elementi fissi che sono le varie barre con i menu, ma dentro a Contenet ci aspettiamo che il contenuto cambi a seconda del menù.

## Le nostre Pagine

Creaimo dei contenuti con nuovi componenti per la home, i prodotti e contatti.

```js

const home = ()=>{
    return
    <div> Benvenuti al nostro sito</div>
}

const Prodotti = ()=>{
    return
    <div> I nostri prodotti</div>
}

const Contatti = ()=>{
    return
    <div> Contattaci alla seguente Mail : info@mail.com</div>
}
```

I contenuti non li completiamo, qui facciamo delle prove non un sito reale, ma se fosse reale, non andiamo a perdere tempo in questa fase a completare pagina pagina, lo facciamo in una fase successiva, qui definiamo la struttura del sito.

A questo punto questi componenti piuttosto come facevamo prima metterli in testa nel file Page.js, li mettiamo direttamente in una cartella chiamata Pages, questa cartella differisce da component perchè su component prendimo "i pezzettini" riutilizzabili, il contenuto quello che chiamiamo la nostra pagina, p sepcifico per ogni pagina, che se serve può utilizzare i componenti definiti dentro a components

### Il menu variam il contenuto

Ora dobbiamo far cambiare il contenuto secondo il menu, quindi dobbiamo definire le funzioni di click dentro al componente nella cartella component NavBar

```js
import Contatti from "./pages/Contatti";
import Home from "./pages/Home";
import Prodotti from "./pages/Prodotti";

const NavBar = ({ onChangePage, col }) => {
    const handleChangePage = () => (page) => onChangePage(page);

    return (
        <div className={`menuFlex ${col ? "flex-col" : "flex-row"}`}>
            <a href="home" onClick={handleChangePage(Home)}>
                Home
            </a>
            <a href="prodotti" onClick={handleChangePage(Prodotti)}>
                Prodotti
            </a>
            <a href="contatti" onClick={handleChangePage(Contatti)}>
                Contatti
            </a>
        </div>
    );
};

```

Nelle props del componente ho aggiunto onChangePage in quanto page deve ricevere l evento e cosi cambiare pagina, ho cambiato però le props di NavBar.

`(props) =>` in `({ onChangePage, col }) =` quindi `"col" in props` non è più valido non avendo più la variabile props, questo comando chiede se esiste una  key `col` dentro alle pros, in realtà se presente ci restituisce true se assente undefined, NavBar la chiamo dentro a Header e SideBar in questo modo :

`<NavBar col />` oppure `<NavBar />`, con col presente o no, ma non gli assegnamo nessun valore tipo `col="col"` o `col="row"`, ci interessa sapere solo se preente o meno, e in questo modo come sempre evitiamo eventuali errori se scrivo male col o row tra gli apici.

Detto questo ora ci basta leggere solo se col è preente, che se messo tra i paramentri senza valori react lo imposta a true in automatico, diversamente sarebbe undefined e non distinguo se presente o meno-

Ora prepariamo Page per fargli cambiare il contenuto :

```js
export default function Page() {
    const [posNav, setPosNav] = useState(0);
    const [contentPage, setContentPage] = useState(0);

    const handleBarMove = () => setPosNav(Number(!posNav));
    const handleChangePage = ()=>setContentPage()

    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} onChangePage={handleChangePage} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection: getNavState(posNav).flex }}
                className="content-main"
            >
                <SideBar
                    onBarMove={handleBarMove}
                    label={getNavState(posNav).label}
                    c={handleChangePage}
                />
               {contentPage}
            </div>
            <Footer />
        </div>
    );
};
```

Abbiamo aggiunto lo stato `contentPage` e al posto del componente Content ora abbiamo `{contentPage}`
ho poi dovuto inserire `onChangePage={handleChangePage}` sia su `Header` che su `SideBar` perchè tutti e due usano NavBar con i nostri link, ma ATTENZIONE :

 onChangePage non lo abbiamo definito dentro a Header e Sidebar ma dentro a NavBar utilizzato da questi due componenti ma non su Page che non è presente.

 A noi interessa far arrivare questo evento a Page diversamente posso al massimo leggerolo dentro a `Header` o `SideBar`, non ci resta che scrivere dentro a questi due compoenti :



```js

const Header = ({ title, Menu, onChangePage }) => (
    <div key="HEADER" className="header firsBg">
        <div className="title">{title}</div>
        <Menu onChangePage={onChangePage} />
    </div>
);

const SideBar = ({ onBarMove, label, onChangePage }) => {
    const handleBarMove = () => onBarMove();

    return (
        <div key="MENULEFT" className="sideBar">
            <button onClick={handleBarMove} className="btNavBarPos secondBg">
                {label}
            </button>
            <NavBar col onChangePage={onChangePage} />
        </div>
    );
};

```

Nei fatti questi due componenti non usano OnChangePage, lo  passiamo solo per essere passato al figlio `<NavBar >`, non ho modo di dire a `NavBar` di passare l'evento direttamente a Page, quindi chi usa `NavBar` deve fare da byPass. un problema che potremo avere. è se il componente si trova annidato dentro ad altri, a catena devo passare a tutti questa proprietà che potrebbe essere antipatico, ma eiste il modo per evitarlo che andremo a vedere.

Deve essere tutto apposto, salvo che non funziona ! Se faccio click sui menu mi esce una pagina non trovata, e se guardate l 'indirezzo nella barra degli indirizzi del browser, vedete che è cambiato da  `http://localhost:3000/step/6` a `http://localhost:3000/step/prodotti`

Il problema si trova dentro a NavBar e i suoi link del tag `<a>`, essendo un link non sente il nostro click ma che deve cambiare indirizzo, in pratica legge `href` e si comporta giustamente da link, per risolvere o cambiamo il tag `<a>` con un bottone, oppure se voglio continuare ad 

```js


```