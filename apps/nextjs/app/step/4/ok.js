"use client";

import { useState } from "react";

import "./styles.css";

const AboutUs = () => (
    <div className="footerAbout">
        <ul>
            <li>Chi siamo</li>
            <li>La nostra storia</li>
            <li>Contatti</li>
        </ul>
    </div>
);

const NavBar = (props) => (
    <div className={`menuFlex ${"col" in props ? "flex-col" : "flex-row"}`}>
        <a href="home">home</a>
        <a href="prodotti">prodotti</a>
        <a href="contatti "> contatti</a>
    </div>
);

const Header = ({ title, Menu }) => (
    <div key="HEADER" className="header firsBg">
        <div className="title">{title}</div>
        <Menu />
    </div>
);

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

const Footer = () => (
    <div key="FOOTER" className="footer firsBg">
        <div className="textCenter">
            <div className="">copyright 2022</div>
        </div>
        <div className="secondBg">
            <AboutUs />
        </div>
    </div>
);

const Content = () => (
    <div key="CONTENT" className="content">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet pretium urna. Vivamus venenatis velit nec neque ultricies,
            eget elementum magna tristique. Quisque vehicula, risus eget aliquam
            placerat, purus leo tincidunt eros, eget luctus quam orci in velit.
            Praesent scelerisque tortor sed accumsan convallis.
        </p>
    </div>
);

export default function Page() {
    const [flexDirection, setFlexDirection] = useState("row");
    const [label, setLabel] = useState(">>>>")

    const handleBarMove = () => {
        const newFlexDirection = flexDirection === "row"
            ? "row-reverse" : "row";

        setFlexDirection(newFlexDirection);

        // qui devo fare la stessa codizioe precedente leggendo flexDirection
        const newLabel =  newFlexDirection === "row" ? '>>>>' : '<<<<';
        setLabel(newLabel)
    };

    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection }}
                className="content-main"
            >
                <SideBar onBarMove={handleBarMove} label={label} />
                <Content />
            </div>
            <Footer />
        </div>
    );
}