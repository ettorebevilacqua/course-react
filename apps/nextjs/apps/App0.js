/*

Il componente, essendo come un tag html, i paramentri vengono passati con un nome davanti: 
esempio: 
<AppHeader
          lista={menuHeader}
          pippo={"ciao ciao"}
          pluto={"arrivederci"}
        /> 
Il componente che definisco come funzione con il primo carattere maiuscolo nel nome,
quando passo i parametri come faccio con i tipici tag html, vengono poi passati nella funzione componente 
come oggetto avente come attributi (le chiavi del oggetto) il nome del parametro e come valori quello assegnato nel html. 

Nell'esempio sopra dentro la funzione che definis(ma ovviamente posso dare il nome a picare) ce il componente mi trovo un unico parametro, 
popolato da react, che chiamiamo param  :

export default (param) => (
  param.lista ----> cosi posso accedere al parametro lista passato nel html 

param dicevamo è un oggetto che contine i parametri del tag html, 

quindi param è uguale a : {lista, pippo, pluto}

Posso quindi leggere direttamente i valori 
export default ({lista, pippo, pluto}) => (
  
*/

import "./styles.css";
import { App1 } from "./step";

export default function App() {
  return (
    <div className="App">
      <App1 />
    </div>
  );
}
