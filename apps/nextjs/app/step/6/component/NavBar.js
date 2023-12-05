import Contatti from "../pages/Contatti";
import Home from "../pages/Home";
import Prodotti from "../pages/Prodotti";

const NavBar = ({ onChangePage, col }) => {
    const handleChangePage =  (page) => (e) =>{
        e.preventDefault();
        onChangePage?.(page);
    }

    return (
        <div className={`menuFlex ${col ? "flex-col" : "flex-row"}`}>
            <a href="#" onClick={handleChangePage(Home)}>
                Home
            </a>
            <a href="#" onClick={handleChangePage(Prodotti)}>
                Prodotti
            </a>
            <a href="#" onClick={handleChangePage(Contatti)}>
                Contatti
            </a>
        </div>
    );
};

export default NavBar;
