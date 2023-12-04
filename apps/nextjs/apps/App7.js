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

import { useState, useEffect } from "react";
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
  contact: <PageContatti />
};

export default function App() {
  /*
    quando viene eseguita questa funzione, modifica il dom della pagina, 
    cioè per noi, ridisegna la pagina nel browser.
    
    se uso una variabile, e dentro una funzione per esempio di click 
    modifico il suo valore tipicamente valore = 'nuovo valore'
    
    Non viene aggiornata la pagina con il  nuovo valore. 

    La variabile, è cambiata, ma dovrei dirgli di ridiscegnare , cioè in pratica
    richiamare la funzione componente, che una volta rieseguira mi visualizza i nuovi valori

    perchè uso nelle classi set e get ?? sia per proteggere da accidentali modigiche della variabile
    ma anche perchè rispetto a una diretta assegnazione, quando voglio cambiare il valore
    posso renderlo REATTIVO cioè dentro la funzione set che cambia realmente il valore, posso dirgli di fare altre cose

   let a = 4;
    a = 5; 
    la variabile cambia, ma no ho modo di segnare che sia cambiata, 

    Se invece faccio 

  let a=4;
const changeA =  val => {
  a=val>10 ? 10 : val; 
  
  cosole.log('sono cambiato')
}

  */

  // Le varibiali in react, che devono aggiorna il template, quindi voglio vedere
  // nella pagina html un valore che cambia, devo usare useState
  // UseState , ci da un array, con 2 elementi , uno è la variale e l0altra
  // è la funzione per cambiare il valore, e quindi rieseguire la funzione dove si trova
  // useState quando chiamo la funzione che modifica il valore

  const [PageCorrent, setPageCorrent] = useState("prodotti");

  const handlerChangePage = (nomePage) => {
    setPageCorrent(nomePage);
    // PageCorrent = pages[nomePage]; // SE FACCIO COSI NON AGGIORNA LA PAGINA CON IL NUOVO VALORE

    console.log("pagina cambiata", nomePage, pages[nomePage]);
  };

  return (
    <div className="App">
      {/* qui metto i div del layout*/}
      <div className="box s100 firsBg">
        {/*  
        AppHeader : 
        lista: passo la lista dei menu da visualizzare
        onChangePage : passo come CALLBACK la funzione handlerChange
        */}
        <AppHeader lista={menuHeader} onChangePage={handlerChangePage} />
      </div>
      <div className="box s30 ">
        <AppMenuLeft />
      </div>
      <div className="box s60 ">{pages[PageCorrent]}</div>
      <div className="box s100 ">
        <AppFooter />
      </div>
      {/* questo era un esempio per vedere se il meccanismo funziona 
        ma questi pulsanti di navigazione si trovano dentro al componente header
        questa parte qui la devo eliminare ora la commento :
      
      <div className="box s100 firsBg">
        <button onClick={() => handlerChangePage("home")}>home</button>
        <button onClick={() => handlerChangePage("prodotti")}>prodotti</button>
        <button onClick={() => handlerChangePage("contatti")}>contatti</button>
      </div>
      */}
    </div>
  );
}
