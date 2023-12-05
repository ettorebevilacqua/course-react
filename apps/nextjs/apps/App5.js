/*

*/

import "./styles.css";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppContent from "./components/appContent";
import AppFooter from "./components/appFooter";

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
