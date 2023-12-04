/*

*/

import "./styles.css";
import AppHeader from "./components/appHeader";
import AppMenuLeft from "./components/appMenuLeft";
import AppContent from "./components/appContent";
import AppFooter from "./components/appFooter";

export default function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppMenuLeft />
      <AppContent />
      <AppFooter />
    </div>
  );
}
