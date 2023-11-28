# il curry delle funzioni

## codice di esempio

Definiamo una promise che restituisce il valore 64 dopo un certo tempo e calcoliamo la sua metà :

```js
const myPromise = new Promise((resolve, reject) => {
  const startTime = Date.now();
  console.log("start promise ");
  setTimeout(() => {
    console.log("resolve promise in ms ", Date.now() - startTime);
    resolve(64);
  }, 300);
});

myPromise
    .then((num) => num / 2)
    .then((ris) => console.log("risultato = ", ris));
```

cerchiamo di evitare le annidazione in modo che la definizione della promise sia più lineare.

```js
const logVal = (descr, val = "") => console.log(`${descr} ${val}`);
const timeDiff = (startTime) => Date.now() - startTime;
const resolveAfterTimeout = (resolve, startTime) =>{
  logVal("resolve promise in ms ", timeDiff(startTime));
  resolve(64);
}

const myPromise = new Promise((resolve, reject) => {
  const startTime = Date.now();
  logVal("start promise ");
  setTimeout(() => resolveAfterTimeout(resolve, startTime), 300);
});

myPromise
    .then((num) => num / 2)
    .then((ris) => console.log("risultato = ", ris));
```

quello che interessa in questo codice è l ultima riga che si legge data la nomenclatura scelta :

quando hai risolto il valore futuro (dopo i 300ms di setTimeout), ALLORA (then) DAMMI (get) il MEZZO (half) valore, la successiva then diciamo di visualizzare il risultato.

Rendiamolo il codice più elegante in funzione di migliorare la sua parte finale, che dovrebbe da sola rappresenatare facilmente il flusso del programma :

```js
const getHalfValue = (a) => a / 2;
const logVal =
  (descr) =>(val = "") => console.log(`${descr} ${val}`);

const timeDiff = (startTime) => Date.now() - startTime;
const resolveAfterTimeout = (resolve, startTime) => () => {
  logVal("resolve promise in ms ")(timeDiff(startTime));
  resolve(64);
};

const myPromise = new Promise((resolve, reject) => {
  logVal("start promise ");
  setTimeout(resolveAfterTimeout(resolve, Date.now()), 300);
});

myPromise.then(getHalfValue).then(logVal("risultato = "));
```

il contenuto della then per visualizzare il risultato è più coinciso rispetto a :
newPromiseOfHalf.then(ris => logVal('risultato = ', ris))

e cosi la lettura su una riga di codice risualta lo stesso agevole, notiamo allo stesso modo setTimeOut cambia da
setTimeout(() => resolveAfterTimeout(resolve, startTime), 300)

diventa :
setTimeout(resolveAfterTimeout(resolve,  Date.now()), 300)

setTimeOut in questo modo non inzia più con ()=> come funzione di callback, come anche nelle due funzioni di callBack dei 2 then finali.
Come si dice abbiamo tolto rumore nel codice, le mie funzioni occupano meno righe.

ora passo come parametro a  resolveAfterTimeout direttamente Date.now che precendentmente dovevo utilizzare startTime per storicizzare il valore, ora non più neccessario, perchè questo dettaglio è gestito nella funzione resolveAfterTimeout.

Mettiamo a confronto ora le due differenti versioni della definizione della promise :

```js
const myPromise = new Promise((resolve, reject) => {
  const startTime = Date.now();
  console.log("start promise ");
  setTimeout(() => {
    console.log("resolve promise in ms ", Date.now() - startTime);
    resolve(64);
  }, 300);
});
```

```js
const myPromise = new Promise((resolve, reject) => {
  logVal("start promise ");
  setTimeout(resolveAfterTimeout(resolve, Date.now()), 300);
});
```

stiamo più chiaramente dicendo:

- log di start promise,
- dopo il timeout di 300ms, risolvi la promise con il time attuale.

setTimeout ora sta facilmente su una riga, con il suo parametro finale 300 più chiaro in lettura.

guardiamo ora .then(logVal('risultato = '))

abbiamo passato la funzione logVal definita come :
const logVal = ***(descr) => (val='') =>*** console.log(`${descr} ${val}`)

opsss !! mi aspetterei invece :

 ***(descr, val='') =>*** console.log(`${descr} ${val}`)

cosa significa quindi (descr) => (val='') => ??

Che i miei parametri ora sono singoli, separati da una funzione nel mezzo, cioè abbiamo una funzione che restituisce una funzione,
nel caso specifico avendo un solo parametro, di dice abbiamo fatto il curry della funzione.
I parametri vengono passati singolarmente da funzione a funzione.
Priviamo a scriverlo più tradizionalmente per vedere la funzione che restituisce una funzione in modo più chiaro come semantica :

```js
function logVal(descr) {
  return function (val = "") {
    console.log(`${descr} ${val}`);
  };
}
```

## first class function

function logVal che prende un singolo parametro, restisce chiaramente una funzione anonima che a sua volta prende un singolo parametro.

### lo scope delle funzioni

La cosa importante è che dentro la funzione anonima  console.log(`${descr} ${val}`) vede il parametro descr anche se non è stata a lei passata,
questo grazie alla regola dello scope. logVal è la funzione padre, quindo tutto quello che si trova al suo interno vede i suoi valori, anche se definiamo come visto delle funzioni al suo interno.

e cosa significa quindi ***first class function*** ??

in generale nella programmazione significa che le funzioni vengono trattate come le altre variabili, quindi possono esseere restituite come valore come appena visto, o passate come valori come abbiamo fatto per ora per pulire il codice :
setTimeout(resolveAfterTimeout(resolve, Date.now()), 300);

a setTimeout passiamo la funzione resolveAfterTimeout, che a sua volta restituisce una funzione senza parametri come richiede setTimeout :
è quindi equivalente come prima a :

```js
function resolveAfterTimeout(resolve, startTime) {
  return function () {
      logVal("resolve promise in ms ")(timeDiff(startTime));
      resolve(64); // resolve è una funzione che viene passata dalla funzione padre
  }
}
```

setTimeout prende come primo parametro una funzione di evento senza parametri, quando sono passati i 300ms, al suo interno chiama la funzione di callBack che abbiamo appena passato, ma non ha nulla passare come valori al suo interno, ma a noi invece interessa passare i parametri resolve chee è a sua volta una funzione, e startTime, setTimeot si limita a chiamare la nostra funzione passata, ma non conosce nulla al suo esterno e non ha nulla di utile da passare come parametri.

Come vediamo la funzione anonima restituita da resolveAfterTimeout, è senza parametri come richiesto da setTimeout,:
setTimeout( ()=>faiQualcosaDopoIlTimer, 200)   e grazie alla funzione padre resolveAfterTimeout(resolve, startTime) e lo scope che aggiriamo il problema.

nulla ci vieta di definire dei paramentri a questa funzione anonima, ma non siamo noi a chiamarla, dove anche se definiti non verrano mai utilizzati setTimeout non ha codice per gestirli non conoscendo il mondo esterno, diversamente sarebbe invece un bel problema.

Facciamo un altro esempio per abituarci alla lettura delle funzioni che restituiscono funzioni :

```js
function logVal(descr) {
  const preMessage = "->"; // valori qui definiti vengono visti dalle funzioni interne,
  return function (val) {
    console.log(`${preMessage} ${descr} ${val}`);
  };
}

logVal("valore=")(5);
```

vedimo subito con const preMessage = "->" :
come i paramentri, variabili definite nel body della funzione padre viene visto nelle funzioni figlie anche inneestate.

ma attenzione, ora ho dovuto però scrivere :
***logVal('valore=')(5) doppie parentesi !!!***

come potete notare chiamandola direttamente, ho dovuto mettere le doppie parentesi per ogni parametro,
piuttosto che tipicamente e più elegantemente logVal('valore=', 5) come ci aspetterebbe.

Ma se definiamo qualcosa del genere è perchè ci torna utile altrove, come abbiamo già visto :
.then(logVal("risultato = "))

la then della promise si aspetta una callBack, come fa setTimeout, ma a differenza di setTimeout che deve solo dire che il time è scaduto, la promise ci deve non solo dire che è stata risolta dopo un evento, ma anche con quale valore, che è il motivo per cui l abbiamo utilizzata.
In questo caso siamo noi stessi che abbiamo gestito la callback passata a differenza di setTimeout definita nel sistema di js.

```js
const myPromise = new Promise((resolve, reject) => {
    resolve(64) // qui come esempio chiamiamo subito la call back resolve
}

function logVal(descr) {
  return function (val) { // questo è resolve(64) chiamata dentro la definizione della promise !!!
    console.log(`${descr} ${val}`);
  };
}

myPromise.then(logVal('stampo qualcosa')) // visualizza in console 64
```

quindi : ***resolve(64) in questo caso è logVal ? NO Attenzione !!!***
è la funzione anonima al interno di logVal restituita che prende nel suo parametro val quindi il valore 64 !!

Da questo punto in poi, se non è chiaro, consiglio di rileggere, provare a giocare con il codice prima di proseguire con esempi di casi d' uso.

## Casi uso

Se abbiamo capito, ora proviamo a scrivere getHalfValue più in generale, cioè che permette di dividere non più in modo rigido per 2 ma per qualsiasi valore :

```js
const divide = (divisore) => (dividendo) => dividendo / divisore;
const getHalfValue = divide(2);

const ris1 = divide(2)(10); // ris1 = 5
const ris2 = getHalfValue(10); // ris2 = 5
```

***quindi quando utilizzare il curry delle funzioni ??***

come possiamo vedere dal esempio, divide è la funzione generale di divisione
ma ho anche definto getHalfValue preparata con il primo paramentro della prima funzione con 2 :
const getHalfValue = divide(2)

Attenzione quindi ! getHalfValue non restituisce un valore ma una funzione preparata con il parametro 2 nel divisore, non a caso prima passo divisore in divide e poi il suo dividendo, l ordine dei parametri passati è importante in questo caso. In questo eesempio da specializziamo la funzione più generica divede.

vediamo con la moltiplicazione

```js
const multiply = (a) => (b) => a * b;
const double = multiply(2);

const ris1 = multiply(2)(10); // ris1 = 20
const ris2 = double(10); // ris2 = 10
```

in questo caso ho chiamato i paramentri, a e b più generali in quanto l' ordine dei fattori nella moltiplicaione non è importante grazie alla proprietà transitiva, nella divisione anche come scopo di chiarezza didattica li ho chiamati dividendo e divisore che come nella sotrazione l ordine è importante.

quello che qui si è voluto mettere in luce, è che con il curry di funzioni di base, posso estenderle per creare nuove funzioni più specializzate con valori fissi sui suoi primi paramentri passati come funzioni che restituiscono funzioni, in double per esempio fisso a 2 il primo paramentro.

***Come mai definisco multiply piuttosto che fare la banale moltiplicazione ??***

giustamente si potrebbee obbiettare che si diceva di essere coincisi ma se scrivo :
then((valoreFuturo)=> valoreFuturo * 2)

non faccio prima ?? devo pure scriveere funzioni separate piuttosto che essere immedito con val * ? tutto questo per evitare (valoreFuturo)=> che posso scrivere (val)=> ?? non è discutibile questa "eleganza" ?
Potrei rispondere che è a scopo didattico, ma vediamo che diventano importati per

### Manutenzione del codice

Se andate spulciare il codice in giro, non difficilemente trovate "stupide" funzioni come :  double, multiply, divide, sum
piuttosto che val * 2, a - b, a/b, a + b, che sono espressioni e non funzioni

In questo modo trovo codice del genere, apparenteemente poco sensato :

```js
const multiply = (a) => (b) => a * b;
const divide = (b) => (a) => a / b; // operatori inveriti !! vedi sopra.
const sum = (a) => (b) => a + b;
const inc = (a) => sum(1);
const dec = (a) => sum(-1);
const double = multiply(2);
const half = divide;

myPromise
  .then(double)
  .then(sum(4))
  .then(multiply(3))

  [(1, 2, 3, 4, 5)].map(double)
  .map(inc)
  .map(half)
  .map(dec);
```

Come possiamo vedere come primo aspetto è che riutilizziamo le stesse funzioni in contesti diversi, ma che come già detto, peer usare callBack che prendono un solo valore

Proviamo ora a scrivere come ci si aspetterebbe, piuttosto che perdere tempo a fare funzioni per fare cose che già fanno operatori di un solo caratteere :

```js
[1, 2, 3, 4, 5]
  .map((val) => val * 2)
  .map((val) => val + 1)
  .map((val) => val / 2)
  .map((val) => val - 1)

  [(1, 2, 3, 4, 5)].map(double)
  .map(inc)
  .map(half)
  .map(dec);
```

quale delle due versioni è più leggibile ??
e se devo cambiare qualcosa per esempio incremntare a + 2 ?

```js
[1, 2, 3, 4, 5]
  .map(double)
  .map(sum(2))

  [1, 2, 3, 4, 5]
  .map(double)
  .map(inc(inc)); // notarer inc(inc) fa due volte l incremento,
```

 su lunghe operazioni mi sfugge di meno qualche mancato +1 da sostituire con +2. ma anche è più facile definire inc2 e fare con l editor la sostituzione del testo. Le funzioni devono avere nomi unici, quindi non possiamo sbagliare la sostituzione.
 Provate a sostituire in automatico + 1 con + 2 su un codice molto corposo, potete immaginare i bug che possono generarsi se non si perde molto tempo a vedere se si è ben sostituito.

### evitiamo varibili globali

proviamo a fare un timer di conto alla rovescia :

```js
let x = 3;

const countDown = () =>
  setTimeout(() => {
    console.log(x);
    x-- > 0 && countDown();
  }, 500);

countDown(4);
```

questo stampa 4, 3, 2, 1, 0 ogni 500ms e si ferma
vediamola in altra versione :

```js
const timeOutCounter = (x) => () => {
  console.log(x, "s");
  x-- > 0 && setTimeout(timeOutCounter(x), 500);
};

timeOutCounter(3)();
```

nella prima versione devo usare una variabile esterna più globale e modificabile.

nella seconda versione inglobo la x, e non devo utilizzare nessuna variabile esterna, cosi facendo la stessa funzione timeOutCounter si dice mantiene il suo stato interno, con lo stesso vantaggio delle classi ma senza la loro cerimonia e molte righe di codice.

Ricordo con l occasione, di cercare di evitare variabili esterne e quando possibile usare variabili costanti, evitare quanto più varibili modificabili con let, dove con il buona approccio funzionale quasi mai cè tale bisogno, motivo per cui si utilizzano funzioni come map piuttosto ch il tradizionale for.

### Utilizzo più tipico nel web design

Un altro esempio tipico di curry, è una pulsantiera nello sviluppo web
un pulsante prende una action, la action la definiamo come funzioni senza parametri

```jsx
const action = (actionName) =()=>log('action', actionName)
  const listButton = [
    ((<button onclick={() => action("add")()} />),
    (<button onclick={action("remove")} />),
    (<button onclick={action("reset")} />))
  ];
```

in questo caso onclick prende una funzione, che si "ricorda" con il curry, vediamo il primo pulsante

```js
onclick={ () => action('add')() }
onclick={ action('remove') } />
```

nel primo caso con () => action('add')() chiamo la funzione con add, ed eseguo con () quella restituita,
in questo caso mi trovo quindi a chiamare qualcosa con due volte le parentesi action('add')()

nel secondo caso, action('remove') passo la funzione ()=>log('action', actionName) che al click verra chiamata come callBack()
nella seconda funzione non passo parametri, che è quella che poi chiama l' evento del browser al click e passa la variabile event,
in questo caso non la usiamo qindi la funzione è assent di parametri, quello che ci inteeressa è actionName passata nella funzione padre.

***sempre creare funzioni con un solo parametro ??***

il curry per definizione prende un solo parametro alla volta, ma nel esempio del map, posso creare funzioni che prendono più di un parametro ma sempre che restituiscono funzioni come abbiamo fino ad ora visto.

```jsx
const whoIsTheUserClicked=(user)=>()=>console.log(user)

const renderUser((user, index)=>{
    return (
    <div key={index} onclick={ whoIsTheUserClicked(user)} >
        {user.name}, {user.city}
    </div>
    )
}

users.map(renderUser)
```

in questo renderUser necessità sia di user, che index, parametri passati dalla funzione map, e io appositamente ho definito renderUser che prende due parametri, che risulta quindi compatibile con la funzione map, l importante è la compatibiltà del numero di paramtri

se dovessi per esempio passare renderUser a una promise , essa restituisce solo un valore come funzione di callBack

```jsx
const whoIsTheUserClicked=(user)=>()=>console.log(user)

const renderUser((user, index)=>{
    return (
    <div key={index} onclick={ whoIsTheUserClicked(user)} >
        {user.name}, {user.city}
    </div>
    )
}

userPromise.then(renderUser)

// scritta in modo più estesa vediamo l errore :
userPromise.then((user)=>renderUser(user, index)) // index non è definito !!

```

**_esempio finale da provare_**

```js
const cities = [
  { name: "padova", prefix: "049" },
  { name: "roma", prefix: "06" },
  { name: "milano", prefix: "02" },
];

const users = [
  { name: "paolo", city: "bologna", tel: "777999" },
  { name: "mattia", city: "roma", tel: "22233355" },
  { name: "giulio", city: "roma", tel: "336577" },
  { name: "roberto", city: "milano", tel: "225588" },
  { name: "susy", city: "milano", tel: "3374322" },
  { name: "maria", city: "milano", tel: "994422" },
];


const renderUser = (render) => (city) => (user, idxUser) => {
  render(`-     ${idxUser + 1} - ${user.name} tel ${city.prefix}/${user.tel}`);
};

const renderCity = (render) => (city, index) => {
  const cityName = `${city.name.toUpperCase()} `;
  const usersCity = users.filter((user) => user.city === city.name);

  usersCity.length > 0
    ? render(`${cityName} prefix ${city.prefix}`)
    : render(`${cityName} users not found`);

  usersCity.map(renderUser(render)(city));
};

const renderLog = (str) => console.log(str);
const renderList = (list) => (str) => list.push(str);

const resList =[]
const citiesToList = renderCity(renderList(resList))
const citiesToLog = renderCity(renderLog)

cities.map(citiesToLog);
cities.map(citiesToList);

console.log("\n \n ----------------- \n list cities", resList);
```

in queesto esempio finale, mettiamo in risalto come rendo renderCity indipendente dal rendering,
posso usarla come log, o come risultato su una lista.

Nelle funzione renderCity passiamo la funzione citiesToLog o citiesToList prepopolate rispetto a come vengono renderizzati i valori, una volta pronte possiamo dimenticare di come gestire la renderizzazione, e utilizzarle nel resto del codice, per esempio se la mia applicazione è da console utilizzerò citiesToLog.
