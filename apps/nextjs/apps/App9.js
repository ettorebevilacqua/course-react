/*

Il routereria

importare la libreria react-router-dom
importarsi BrowserRouter, Route, Routes

inserire questo dentro al div con id="content"

          <BrowserRouter>
            <Routes>
              <Route path={"home"} element={<PageHome />} />
              <Route path={"prodotti"} element={<PageProdotti />} />

            </Routes>
          </BrowserRouter>

  aggiornare menuLeft con i vari  href="home", href="prodotti" ecc

  In pratica abbiamo creato la navigazione via url , dove con 

  <Route path={"prodotti"} element={<PageProdotti />} />

  su path definiamo la path del link quindi nel caso sopra ho creato un link a questo indirizzo (se locale)
 http://localhost:3000/prodotti 

 se quindi nel url trovo prodotti, si attiva il route con path prodotti, 
 e attivandosi renderizza il componente indicato su element

 provare a creare nuovi route con  path a contact  , counter
 e provare la navigazione 
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
  { label: "Altro", url: "altro" }
];

// non ho più toccato nulla qui sotto per aggiungere pagine !!!
// questo è sempre meglio perchè non rischio errori e malfunzionamenti qui sotto !!

export default function App() {
  const [PageCorrent, setPageCorrent] = useState("prodotti");

  const handlerChangePage = (nomePage) => setPageCorrent(nomePage);

  return (
    <>
      <BrowserRouter>
        {/* 
        se in qualche componente o nei suoi figli e sottofigli 
        trovo il compente <LINK > non funziona se si trova fuori a <BrowserRouter>
      */}
        <div className="App">
          <div className="box s100 firsBg">
            <AppHeader lista={menuHeader} onChangePage={handlerChangePage} />
          </div>
          <div className="box s30 ">
            <AppMenuLeft />
          </div>
          <div id="content" className="box s60 ">
            {/* 
              qui definisco tutti gli url di navigazione, 
              quando mi sposto "di pagina", 
              voglio che il browser mi aggiorna l'url con il link della pagina corrente : 

              quindi se vado su http://localhost:3000/prodotti 
              vado subito nella pagina prodotti senza passare per l'home 
              */}

            <Routes>
              <Route path={"home"} element={<PageHome />} />
              <Route path={"prodotti"} element={<PageProdotti />} />
              <Route path={"contact"} element={<PageContatti />} />
              <Route path={"counter"} element={<PageCounter />} />
            </Routes>
          </div>
          <div className="box s100 ">
            <AppFooter />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}
