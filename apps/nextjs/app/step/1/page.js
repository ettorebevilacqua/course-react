/*

Il nostro componente è fatto di solo codice jsx che si presenta come
puro html, questo scenario può essere possibile se prendiamo del codice
di esempio o vogliamo rendere dinamico un sito in html

Andiamo a vedere come lo seperiamo in blocchi :

HEADER, MENULEFT, CONTENT, FOOTER
*/

import "./styles.css";
export default function Page() {
    return (
        <div className="App">
            <div key="HEADER" className="box s100 firsBg">
                <div className="box s30">First React</div>
                <div className="box s50 right textWhite">
                    <a href="home" className="button textWhite">
                        home
                    </a>
                    <a href="prodotti" className="button textWhite">
                        prodotti
                    </a>
                    <a href="contatti " className="button textWhite">
                        contatti
                    </a>
                </div>
            </div>

            <div key="MENULEFT" className="box s20 ">
                <ul>
                    <li>
                        <a href="somepage.html" className="button">
                            Camion
                        </a>
                    </li>
                    <li>
                        <a href="somepage.html" className="button">
                            Vetture
                        </a>
                    </li>
                    <li>
                        <a href="somepage.html" className="button">
                            Moto
                        </a>
                    </li>
                </ul>
            </div>

            <div key="CONTENT" className="box s66 ">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas sit amet pretium urna. Vivamus venenatis velit nec
                    neque ultricies, eget elementum magna tristique. Quisque
                    vehicula, risus eget aliquam placerat, purus leo tincidunt
                    eros, eget luctus quam orci in velit. Praesent scelerisque
                    tortor sed accumsan convallis.
                </p>
            </div>

            <div className="boxs30 box">copyright 2022</div>
            <div key="FOOTER" className="box s100 ">
                <div className="box s100 secondBg">
                    <div className="box s30 textCenter"> </div>
                    <div className="box s30 textCenter">
                        <ul>
                            <li>Chi siamo</li>
                            <li>La nostra storia</li>
                            <li>Contatti</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
