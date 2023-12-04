/*
Siamo partiti con il mettere ordine al html, e poi abbiamo continuato fondamentalmente a mettere ordine alle cose, 
sopratutto concentrandomi alla duplicazione del codice e riutilizzo, che è anche il motivo per cui si usa react.

Abbiamo visto per esempio che ci è comodo mettere i menu su degli array a passarli a un componente 
che con map definiamo il suo html una volta sola, e i nuovi meni li faccio sul array che sul codice html
dove non toccarlo è meglio che ci evita le sue tipiche difficoltà nel manipolarlo,

 */

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles.css";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppFooter from "./components/appFooter";

import {
  PageHome,
  PageContatti,
  PageProdotti,
  PageCounter,
  PageAltro
} from "./pages";

const menuHeader = [
  { label: "Home", url: "home" },
  { label: "Prodotti", url: "prodotti" },
  { label: "Contatti", url: "contact" },
  { label: "Counter", url: "counter" }, // aggiungo nel menu pure counter
  { label: "Layout", url: "layout" }
];

/* 
EVITIAMO LA RIPETIZIONE DEL CODICE : 
ora vediamo questo : 

            <Routes>
              <Route path={"home"} element={<PageHome />} />
              <Route path={"prodotti"} element={<PageProdotti />} />
              <Route path={"contact"} element={<PageContatti />} />
              <Route path={"counter"} element={<PageCounter />} />
            </Routes>

e se faccio come con il menu, dove anzichè essere link con label sono le rotte che vado a definire ??
e poi , se il mio sito cresce di tante pagine, 30, 50, o 100, avrei una grossa lista. 
*/

const appRouteList = [
  { path: "home", element: <PageHome /> },
  { path: "prodotti", element: <PageProdotti /> },
  { path: "contact", element: <PageContatti /> },
  { path: "counter", element: <PageCounter /> }
];

/*   quindi ci basta fare il map :
    
    const renderRouters = item => <Route path={item.path} element={item.element} />
    appRouteList.map(renderRouter);

    ma posso anche scrivere rederRouters cosi :
      
    const renderRouters = item => <Route { ...item } />

    PASSIAMO QUALSIASI PARAMETRO CHE POSSO DEFINIRE IN UNA RIGA DI appRouteList

      i parametri li  messi con le graffe come nuovo oggetto clonato :
      { ...item }, questa espressione aggiunge a un oggetto vuoto le chiavi del oggetto item, 
      in poche parole lo clona, creando un duplicato indipendente dalle modifiche 
      
      in questo modo su un item del array, posso mettere liberamente tutti i paramentri del tag router, 
      a noi qui ci servono solo path e element, di cui path è essenziale, quindi come se lavorassimo a piacimento direttamente su router.

      
*/

/* fatto questo, provato che funziona posso continuare a mettere in ordine, 
  quindi metto via gli array sopra che definiscono i menu e le rotte, i menu li metto in una cartella di config,
  e la lista dei routers, in un file routers.js , e dentro routers facciamo l'importazione delle pagine, 
  quindi svuotiamo di nuovo il codice dentro App, 
  
  che è RESPONSABILE del layot e il posizionamento degli elementi
  nello step successivo vediamo il risultato 
*/

const renderRouter = (item) => <Route {...item} />;

export default function App() {
  const [PageCorrent, setPageCorrent] = useState("prodotti");

  const handlerChangePage = (nomePage) => setPageCorrent(nomePage);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="box s100 firsBg">
            <AppHeader lista={menuHeader} onChangePage={handlerChangePage} />
          </div>
          <div className="box s30 ">
            <AppMenuLeft />
          </div>
          <div id="content" className="box s60 ">
            {/* qui continuo a leggere il layout e non il dettaglio di navigazione
            mappando appRouters in componenti routes 
            */}
            <Routes>{appRouteList.map(renderRouter)}</Routes>
          </div>
          <div className="box s100 ">
            <AppFooter />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}
