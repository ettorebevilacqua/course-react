/*
 
aggiustiamo meglio con la logica dei componenti, 
spostando il div che determina il layout dal componente AppHeader
alla nostra pagina qui presente 
*/

import "./styles.css";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppContent from "./components/appContent";
import AppFooter from "./components/appFooter";

export default function App() {
  return (
    <div className="App">
      {/* qui metto i div del layout*/}
      <div class="box s100 firsBg">
        <AppHeader />
      </div>
      <AppMenuLeft />
      <AppContent />
      <AppFooter />
    </div>
  );
}
