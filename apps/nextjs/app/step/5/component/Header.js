const Header = ({ title, Menu }) => (
    <div key="HEADER" className="header firsBg">
        <div className="title">{title}</div>
        <Menu />
    </div>
);

export default Header;