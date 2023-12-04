const NavBar = (props) => (
    <div className={`menuFlex ${"col" in props ? "flex-col" : "flex-row"}`}>
        <a href="home">home</a>
        <a href="prodotti">prodotti</a>
        <a href="contatti "> contatti</a>
    </div>
);

export default NavBar;