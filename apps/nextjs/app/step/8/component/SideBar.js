import NavBar from "./NavBar";

const SideBar = ({ onBarMove, label, onChangePage }) => {
    const handleBarMove = () => onBarMove();

    return (
        <div key="MENULEFT" className="sideBar">
            <button onClick={handleBarMove} className="btNavBarPos">
                {label}
            </button>
            <NavBar col onChangePage={onChangePage} />
        </div>
    );
};

export default SideBar