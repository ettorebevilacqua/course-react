/*

Abbiamo quindi spostato , la lista dei menu e dei router sui file appositi, routers sulla cartella route, 
e config, su una cartella in modo che la popolaremo con ulteriori files del genere, 
abbiamo tolto handlerChangePage non ci serve più facedo pulizia. 

le modifiche che qui andrà ad apportare, solo solo inerenti alla impaginazione, eventualmente la comunicazione tra 
i vari compoenenti del layout,  per esempio il content potrebbe voler scrivere qualcosa su header, 

in questo caso e tipicamente il titolo della pagina di un componente Page , anzichè come abbiamo fatto dentro la pagina

Dagli import noto la singola responsabilità, importo i componenti di layout (che è meglio raggrupparli in yba cartella layout)
e i valori da passare a essi, oltte che generare tutti i router che si comportano come content che è elemento di layout.

Ma se volessimo che una pagina prende un diverso layout ?? 
Per esempio una spash screen cioè una pagina senza header , footer ecc ?? 
o un diverso incolonamento ?? 

 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";

import { appRouteList } from "./routers";
import { menuHeader } from "./config/menu";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppFooter from "./components/appFooter";

const renderRouter = (item) => <Route {...item} />;

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
