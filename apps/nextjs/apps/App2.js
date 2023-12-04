import "../styles.css";

/*
 1) spezzare l'html nelle funzioni di :
 appHeader, appMenuLeft, Content, Footer

 in modo che nel return vedo solo

 <div>
{appHeader()}
{appMenuleft()}
{appContent()}
{appFooter()}
 </div>
 
Attenzione, quando faccio return, devo sempre restituire in solo elemento c
con al suo interno il resto dei tag esempio 

ERRATO : 
const appFooter = ()=>     
      <div class="box s66 ">contenuto pagina</div>
      <div class="box s100 secondBg">copyright 2022</div>

corretto : 

const appFooter = ()=>   
  <div>  
     <div class="box s66 ">contenuto pagina</div>
     <div class="box s100 secondBg">copyright 2022</div>
  </div>

2) mettere le funzioni in files separati (file) ESPORTANDOLE
importarli e vedere se funzionano

3) renderli come componenti 
il nome della funzione deve avere il primo carattere in grande
se passiamo dei parametri li passiamo nel tag da noi creato come attributi html, 
e dentro la funzione chiamo i parametri passati nel html, dentto le parentesi graffe

<appHeadr list={xxx} >

nel file esportato : 
export function({list}){}

*/

export default function Page() {
    const renderHead = () => (
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
    );

    const renderMenuLeft = () => (
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
    );

    const renderContent = () => (
        <div key="CONTENT" className="box s66 ">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas sit amet pretium urna. Vivamus venenatis velit nec
                neque ultricies, eget elementum magna tristique. Quisque
                vehicula, risus eget aliquam placerat, purus leo tincidunt eros,
                eget luctus quam orci in velit. Praesent scelerisque tortor sed
                accumsan convallis.
            </p>
        </div>
    );

    const renderFooter = () => (
        <>
        <div className="boxs30 box">copyright 2022</div>
        <div key="FOOTER" className="box s100 ">

            <div className="box s30 textCenter"> </div>
            <div className="box s100 secondBg">
                <div className="box s30 textCenter">
                    <ul>
                        <li>Chi siamo</li>
                        <li>La nostra storia</li>
                        <li>Contatti</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );

    return (
        <div className="App">
            {renderHead()}
            {renderMenuLeft()}
            {renderContent()}
            {renderFooter()}
        </div>
    );
}
