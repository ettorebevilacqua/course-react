"use client";

import { useState } from "react";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Home from "./pages/Home";
import Footer from "./component/Footer";

import "./styles.css";

const navBarDir = [
    { flex: "row", label: ">>>>" },
    { flex: "row-reverse", label: "<<<<" },
];

const getNavState = (pos)=> navBarDir[pos];

export default function Page() {
    const [posNav, setPosNav] = useState(0);
    const [contentPage, setContentPage] = useState(Home);

    const handleBarMove = () => setPosNav(Number(!posNav));
    const handleChangePage = (page)=>setContentPage(page)

    return (
        <div className="App">
            <Header title="Motor" Menu={NavBar} onChangePage={handleChangePage} />
            <div
                key="MAIN-CONTENT"
                style={{ flexDirection: getNavState(posNav).flex }}
                className="content-main"
            >
                <SideBar
                    onBarMove={handleBarMove}
                    label={getNavState(posNav).label}
                    onChangePage={handleChangePage}
                />
               {contentPage}
            </div>
            <Footer />
        </div>
    );
};
