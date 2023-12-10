const Header = ({ title, Menu, onChangePage }) => (
    <div key="HEADER" className="header firsBg">
        <div className="title">{title}</div>
        <Menu onChangePage={onChangePage} />
    </div>
);

export default Header;