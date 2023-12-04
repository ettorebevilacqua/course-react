/*

facciamo ora delle prove per fare impaginazioni diverse, creiamo una pagina layout dove 
facciamo queste prove, ora abbiamo abbastanza le cose pronte per poter lavorare sulle pagine, 
e non fare più qui le nostre prove, se non per cambiare la struttura di App, 
la quale aggiusteremo dopo  che abbiamo provato il layout nella sua pagina apposta.

quindi creiamo la PageLayout dentro una cartella, come dovrebbero essere questo tipo di files, 
in modo che mettiamo li i suoi vari eventuali sotto componenti, file di stile personale ecc

e lo importiamo sul file index della cartella di page, e lo aggungiamo : 

ATTENZIONE abbiamo cambiato la struttura, e non tocchiamo per questo App !! 

al menu.js che si trova ora dentro alla cartella confing,
a router.js  come nuova rotta importando PageLayout 


 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";

import { appRouteList } from "./routers";
import { menuHeader } from "./config/menu";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppFooter from "./components/appFooter";

const renderRouter = (item, i) => <Route key={i} {...item} />; // potrei spostarlo dento a routers.js e li importo sopra

/* App component  
  Gestisce l'impaginazione e i componenti di layout 
  e prepara genere i routes dalla lista del file routers
*/

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="box s100 firsBg">
            <AppHeader lista={menuHeader} />
          </div>
          <div className="box s30 ">
            <AppMenuLeft />
          </div>
          <div id="content" className="box s60 ">
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
