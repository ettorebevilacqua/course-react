import Contatti from "../pages/Contatti";
import Home from "../pages/Home";
import Prodotti from "../pages/Prodotti";
import { Link } from "react-router-dom";

const NavBar = ({ onChangePage, col }) => {
    const handleChangePage =  (page) => () =>{
        onChangePage?.(page);
    }

    return (
        <div className={`menuFlex ${col ? "flex-col" : "flex-row"}`}>
            <Link to="/">Home</Link>
            <button href="#" onClick={handleChangePage(Home)}>
                Home
            </button>
            <button href="#" onClick={handleChangePage(Prodotti)}>
                Prodotti
            </button>
            <button href="#" onClick={handleChangePage(Contatti)}>
                Contatti
            </button>
        </div>
    );
};

export default NavBar;