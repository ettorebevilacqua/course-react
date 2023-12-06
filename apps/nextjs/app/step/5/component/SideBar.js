import NavBar from "./NavBar";

const SideBar = ({ onBarMove, label }) => {
    const handleBarMove = () => onBarMove();

    return (
        <div key="MENULEFT" className="sideBar">
            <button onClick={handleBarMove} className="btNavBarPos">
                {label}
            </button>
            <NavBar col />
        </div>
    );
};

export default SideBar