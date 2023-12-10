"use client";

import { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Footer from "./component/Footer";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Contatti from "./pages/Contatti";
import Home from "./pages/Home";
import Prodotti from "./pages/Prodotti";

import "./styles.css";

// const NoPage = () => <h2>Page not found</h2>;

export function RouteApp() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="Prodotti" element={<Contatti />} />
            <Route path="contact" element={<Prodotti />} />
        </Routes>
    );
}

const navBarDir = [
    { flex: "row", label: ">>>>" },
    { flex: "row-reverse", label: "<<<<" },
];

const getNavState = (pos) => navBarDir[pos];

export default function Page() {
    const [posNav, setPosNav] = useState(0);
    const [, setContentPage] = useState(Home);

    const handleBarMove = () => setPosNav(Number(!posNav));
    const handleChangePage = (page) => setContentPage(page);

    return (
        <div className="App">
            <BrowserRouter >
            <Router>
                <Header
                    title="Motor"
                    Menu={NavBar}
                    onChangePage={handleChangePage}
                />
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
                    <RouteApp />
                </div>
                <Footer />
            </Router>
        </BrowserRouter>
        </div>
    );
}
