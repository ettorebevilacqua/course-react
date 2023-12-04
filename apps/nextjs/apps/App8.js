/*
 */

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";

import "./styles.css";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppContent from "./components/appContent";
import AppFooter from "./components/appFooter";

/* 
  creo un file dentro alla cartella pages, chiamato counter per fare un contatore
  dentro alla cartella pages nel file index,js, lo importo e lo riesporto 

  quindi posso aggiugerlo come ultereriore componente dal import qui sotto :
*/

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

const pages = {
  home: <PageHome />,
  prodotti: <PageProdotti />,
  contact: <PageContatti />,
  counter: <PageCounter />, // aggiungo nel command decision counter
  altro: <PageAltro />
};

// non ho più toccato nulla qui sotto per aggiungere pagine !!!
// questo è sempre meglio perchè non rischio errori e malfunzionamenti qui sotto !!

export default function App() {
  const [PageCorrent, setPageCorrent] = useState("prodotti");

  const handlerChangePage = (nomePage) => setPageCorrent(nomePage);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"home"} element={<PageHome />} />
          <Route path={"prodotti"} element={<PageProdotti />} />
          <Route path={"contact"} element={<PageContatti />} />
          <Route path={"counter"} element={<PageCounter />} />
        </Routes>
      </BrowserRouter>

      <div className="App">
        <div className="box s100 firsBg">
          <AppHeader lista={menuHeader} onChangePage={handlerChangePage} />
        </div>
        <div className="box s30 ">
          <AppMenuLeft />
        </div>
        <div className="box s60 ">{pages[PageCorrent]}</div>
        <div className="box s100 ">
          <AppFooter />
        </div>
      </div>
    </>
  );
}
