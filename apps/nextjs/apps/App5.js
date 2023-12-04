/*

Il componente, essendo come un tag html, i paramentri vengono passati con un nome davanti: 
esempio: 
<AppHeader
          lista={menuHeader}
          pippo={"ciao ciao"}
          pluto={"arrivederci"}
        /> 
Il componente che definisco come funzione con il primo carattere maiuscolo nel nome,
quando passo i parametri come faccio con i tipici tag html, vengono poi passati nella funzione componente 
come oggetto avente come attributi (le chiavi del oggetto) il nome del parametro e come valori quello assegnato nel html. 

Nell'esempio sopra dentro la funzione che definis(ma ovviamente posso dare il nome a picare) ce il componente mi trovo un unico parametro, 
popolato da react, che chiamiamo param  :

export default (param) => (
  param.lista ----> cosi posso accedere al parametro lista passato nel html 

param dicevamo è un oggetto che contine i parametri del tag html, 

quindi param è uguale a : {lista, pippo, pluto}

Posso quindi leggere direttamente i valori 
export default ({lista, pippo, pluto}) => (
  
*/

import "./styles.css";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppContent from "./components/appContent";
import AppFooter from "./components/appFooter";

/* import PageHome from "./pages/home";
import PageContatti from "./pages/contatti";
import PageProdotti from "./pages/prodotti";
*/

// const { PageHome, PageContatti, PageProdotti } = a;

import { PageHome, PageContatti, PageProdotti } from "./pages";

const menuHeader = [
  { label: "Home", url: "home" },
  { label: "Prodotti", url: "prodotti" },
  { label: "Contatti", url: "contact" }
];

const pages = {
  home: <PageHome />,
  prodotti: <PageProdotti />,
  contatti: <PageContatti />
};

export default function App() {
  let PageCorrent = "contatti";

  const handlerChangePage = (nomePage) => {
    // PageCorrent = pages[nomePage];
    console.log("pagina cambiata", nomePage, pages[nomePage]);
  };

  return (
    <div className="App">
      {/* qui metto i div del layout*/}
      <div className="box s100 firsBg">
        <AppHeader lista={menuHeader} pippo={"ciao ciao"} />
      </div>
      <AppMenuLeft />
      <AppContent />
      <AppFooter />

      <div className="box s100 firsBg">
        <button onClick={() => handlerChangePage("home")}>home</button>
        <button onClick={() => handlerChangePage("prodotti")}>prodotti</button>
        <button onClick={() => handlerChangePage("contatti")}>contatti</button>
      </div>

      <div className="box s100 firsBg">{pages[PageCorrent]}</div>
    </div>
  );
}
