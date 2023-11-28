# Gentilissima introduzione alle monadi

## Partiamo dal difficile

Il concetto di monadi generalmente rimane molto ostico da comprendere, in questo articolo vogliamo rendere questa spiegazione quanto più semplice.
In genere questo argomento viene spiegato dopo aver spiegato diversi concetti di base della programmazione funzionale, per esempio le funzioni pure, il curry e la teoria dietro.

Qui si cerca di andare al sodo, si evita la teoria che una volta utilizzato un po di codice, risulta meno ostica da comprendere, ma in molti casi per poterli utilizzare come facciamo con le promise, non cè bisogno di molta teoria, utile se si vuole approfondire bene la programmazione funzionale e avere competenze più solide.

Uno dei grossi problemi alla programmazione funzionale è l' abitudine alla programmazione imperativa, chi cosi abituato spesso deve fare uno sforzo in più a causa del abitudine, per esempio se dicessi di usare solo variabili costanti che andiamo qui a vedere, il primo pensiero è che non è possibile questo approccio perché senza variabili che variano i valori non si può programmare.

## I contenitori

La pentola, il piatto, il vassoio, il cesto della lavatrice cosa hanno in comune ?
sono contenitori, il loro scopo è contenere qualcosa, non importa cosa, se metto i vestiti nella pentola, e il cibo nella lavatrice, dal loro punto di vista funzionale, non cambiano le cose, svolgeranno sempre la loro funzione di contenere qualcosa.

Per usare cosa contengono, devo aprire la lavatrice, sollevare il coperchio, mangiare cosa è contenuto nel piatto, senza queste azioni non servono a nulla.

Nella programmazione funzionale, abbiamo i contenitori, in genere ostici da comprendere, ma rimanendo nella analogia, essi servono per contenere un valore, dove mi serve poterlo inserire, fare qualcosa dentro il contenitore e aprirlo per restituirlo.

### Le Promise

Un esempio di questo concetto che dovrebbe essere famigliare in javascript è la promise, che fa da contenitore di valori :

```javascript
const myPromise = new Promise((resolve, reject) => {
    const startTime = Date.now()
    console.log('start promise ')
    setTimeout(() => {
        console.log('resolve promise in ms ', Date.now() - startTime)
        resolve(64)
    }, 300)
});

const newPromiseOfHalf = myPromise.then(num => num / 2 )
// stampa la definizione della promise ([object Promise]), no il valore 5.
console.log('promise =', myPromise.toString() )
// qui stampa il valore 5
newPromiseOfHalf.then(ris => console.log('risultato = ', ris))
```

Dentro a new Promise, abbiamo messo un valore che viene popolato con un certo ritardo in quanto la promise è fatta per gestire valori futuri.
Ma se provo a stamparla, mi restituisce la sua definizione che fa da contenitore, come se vedessi la pentola e non cosa contiene.

Quello che ci interessa è che dobbiamo passare una funzione per visualizzare il valore :

***newPromiseOfHalf.then(ris => console.log(ris))***

come dire, non mangio la pentola o il piatto perchè contiene cibo, come non mi vesto del cestello della lavatrice perchè contine i vestiti li devo aprire per utilizzare il loro contenuto.

### La difficoltà iniziale della promise

Le promise sono al inizio un po ostiche da comprendere, ma poi le utilizziamo senza problemi, anche se non conosciamo i dettagli implementativi.
Allo stesso modo nella programmazione funzionale il concetto di monadi, provocano la stessa difficoltà nel comprenderle, quale è il problema ??

***L' abitudine mentale***, ragionare come si è imparato a programmare, in modo imperativo cioè una sequenza lineare di istruzioni, allo stesso modo gli array con le funzioni map e reduce si comportano anche loro come contenitori come le promise.

Partiamo con un esempio :

```javascript
const myPromise = Promise.resolve(64) // promise contiene il valore 64

divide = num =(num => num / 2)
myPromise
.then(divide) 32
.then(divide) 16
.then(divide) 8
.then(num => console.log('il risultato è', num )) // 8
```

vediamo in un altro modo la cosa :

```javascript
const newPromise = myPromise.then(divide) // restituisce una promise
newPromise.then(divide) // restituisce una promise dove il then successivo gli appartiene
.then(divide) 8
.cum )) // 8
```

posso prendere il risultato della myPromise.then nella costante newPromise e da questa continuare come prima.

Cosa è importate da notare in questo esempio ?

- che le promise , restituiscono sempre promise , per questo posso concatenarle come successioni di operazioni.
- non uso direttamente il valore contenuto, ma una funzione che la utilizza.

Questi sono i concetti più importanti di contenitore.
Proviamo a creare un contenitore che come la promise, restituisce sempre un contenitore che contiene un valore :

```javascript
const Container = x => ({
map: f => Container(f(x)), // qui definisco map che restitisce un container
toString: () => `${x}`,
})

const result = text => {
return Container(text)
.map(x => x.toUpperCase())
.map(x => x.trim())
.map(x => x.concat("- my cool brand"))
.toString()
} // Output: ["MY TEXT - my cool brand"];

```

Come vediamo, abbiamo creato una struttura con map e toString con una funzione. Il suo parametro iniziale fa da costruttore per contenere tale valore.

Nelle promise, possiamo concatenare una serie di then qui chiamate map, ugualmente alle then ***prendono una funzione e la applicano al valore INTERNO*** del container, in questo caso text. vediamo come ho definito map :

***map: f => Container(f(x))***

Map prende una funzione f, e restituisce di nuovo un container con f(x) il quale applica la funzione con il valore del contenitore, chiamato map.

Il gioco importante sta ***nel restituire un nuovo contenitore*** di uguale struttura ma con il valore trasformato dalla funzione map passata, il nuovo contenitore, a sua volta ha la funzione map, allo stesso modo di come facevamo con le Promise con il suo then, che è il map con un altro nome più sensato al concetto di valore futuro delle promise, il concetto delle due è uguale, ripetiamo :

***applicare la funzione e restituire il contenitore.***

Ma questo codice è poco utile, è solo più prolisso per fare una serie di trasformazioni su una stringa, nelle promise si giustifica il fatto che inizialmente non esiste il valore del contenitore come vengono qui invece inizializzati i Container.

### La monade maybe

vediamo ora un altro tipo di container questa volta più utile: la maybe :

```javascript
const isNullOrUndef = (value) => value === null || typeof value === "undefined";

const maybe = (value) => ({
isNothing: () => isNullOrUndef(value),
extract: () => value
});

const Maybe = {
just: maybe,
nothing: () => maybe(null)
};

const maybeNumberOne = Maybe.just("a value");
const maybeNumberTwo = Maybe.nothing();

console.log("Maybe.just is nothing?", maybeNumberOne.isNothing());
console.log("Maybe.nothing is nothing?", maybeNumberTwo.isNothing());
```

le cose ora sono un po cambiate rispetto al Container con map, la prima maybe restiuscie isNothing e extract

```javascript
const maybe = (value) => ({
isNothing: () => isNullOrUndef(value),
extract: () => value
});
```

Banalmente questo codice serve per restituire un booleano che dice se il valore value è nullo o meno. non abbiamo più il map (per ora), ma solo questa valutazione, senza di esso non posso accedere al valore interno, e quindi utilizziamo extract per poterlo utilizzare.

Successivamente la vediamo come se fosse nuovamente definita con nome Maybe ma con m grande :

```javascript
const Maybe = {
just: maybe,
nothing: () => maybe(null)
};
```

Da notare che just e nothing , ***restituiscono sempre lo stesso tipo di contenitore*** in questo caso maybe, nelle promise restituiscono sempre il tipo promise il quale permette la concatenazione.

- Just restituisce una nuova istanza della maybe pronta per contenere un valore nel suo costruttore.
- Nothing invece restituisce una funzione senza parametri, al interno istanza una maybe con un valore null perché vogliamo rappresentare la mancanza di valori come suggerisce il suo nome.

qui un esempio del loro utilizzo :

```javascript
const maybeNumberOne = Maybe.just("a value");
const maybeNumberTwo = Maybe.nothing();
```

come vediamo just prende un valore e nothing nessuno.
possiamo poi interrogare se la maybe è nulla :

*console.log("Maybe.just is nothing?", maybeNumberOne.isNothing());*

Per ora quindi la maybe si limita a dirci se il valore inserito è nullo o meno, dal inglese May be = potrebbe essere.
Questo codice però non è di grande utilità, proviamo a ridefinirlo come container aggiungendo una funzione di map, che lo rende utile.

### La funzione di map nei container

Le promise dicevamo sono container, con il then che fa da map perché restituiscono valori futuri, come dire : quando avrai il valore allora fa questo, il senso di map o then è lo stesso : "fai qualcosa", le funzioni "fanno qualcosa", allo stesso modo gli array hanno la funzione di map per trasformare tutti i suoi valori, e appaiono strani con la funzione da passare dentro, ma non basta il for ?

In altre parole facciamo qualcosa con questi valori con il map, ma come mai questo nome ?

#### Definizione di map e le costanti

Diciamo che map ***trasforma i valori***, il nome viene dalla teoria degli insiemi : mappa un valore a un altro associato tramite una  funzione matematica, motivo del suo nome map, ma qui ora stiamo evitando le teorie per non complicarci a vita e  ***consiglio di limitarsi a dire che map trasforma un valore passando una funzione che chiamiamo di trasformazione***,  il suo senso aderisce al concetto di funzione nella matematica che che mappa i valori da un insieme a un altro.

#### Usare le costanti

Caratteristica della programmazione funzionale è la ***trasformazione di valori costanti*** in altri valori costanti piuttosto che modificare la stessa variabile come siamo abituati a ragionare nella programmazione imperativa.

```javascript
// uso di variabili

let nome = 'Giulio'
nome = nome + ' Rossi'

// uso di costanti

const nome = 'Giulio'
const nomeCognome = nome + ' Rossi'
```

In questo esempio quello che cambia è che devo introdurre una nuova "variabile" costante. Il valore precedente viene mantenuto, ma il nuovo valore necessità di un nome che meglio descrive il **nuovo** valore.

questo porta a una maggiore semantica e meno bug per errori di assegnazione, ho poi meno bisogno di commentare il codice, se ben scritto si spiega da solo, in particolare il refactoring del codice è più agevole.

Se dobbiamo poi riprendere solo il nome, dovrei cambiare la variabile let come ho fatto con le costanti con le variabili nome e nomeCognome, e poi modificare dove viene utilizzata la viariabile nome, se dimentichiamo qualcosa può portare a bug.

Diciamo che ***l uso di let in javascript dovrebbe essere limitato il più possibile***, in quanto sono fonte di bug.
Ora dovrebbe essere più chiaro perché utilizziamo il termine ***trasformare*** piuttosto che riassegnare.

### La nostra maybe con la funzione map

```javascript
const isNullOrUndef = (value) => value === null || typeof value === "undefined";

const maybe = (value) => ({
isNothing: () => isNullOrUndef(value),
extract: () => value,
map: (transformer) => isNullOrUndef(value)
    ? Maybe.nothing()
    : Maybe.just(transformer(value))
});

const Maybe = {
just: maybe,
nothing: () => maybe(null)
};

const a = { b: { c: "fp"} };

const maybeA = Maybe.just(a)
.map(a => a.b)
.map(b => b.c)
.map(c => c + " is great!");

console.log(maybeA.extract()); // fp is great S
```

vediamo subito il map introdotto :

```javascript
map: (transformer) => isNullOrUndef(value)
  ? Maybe.nothing()
  : Maybe.just(transformer(value))
```

se il valore è :

- nullo restituisco Maybe.nothing() che quindi contiene il valore null e non più il valore passato.
- se non è nullo, applichiamo la funzione passata.

La cosa importante da sottolineare è che :

***La funzione del map, viene applicata solo se il valore non è nullo, se no non fa nulla non eseguendo la funzione.***

Un esempio con valori nulli :

```javascript
const a = { b: { c: "fp"} };

const maybeA = Maybe.just(a)
.map(a => a.b)
.map(b => b.c)
.map(c => c + " is great!");

console.log(maybeA.extract()); // fp is great S

const maybeB = Maybe.just(a)
.map(a => a.d) // a.d NON ESISTE !!!
.map(b => b.c)
.map(c => c + " is great!");

console.log(maybeB.extract()); // null
```

***Maybe.just(a).map(a => a.d)***  a.d non esiste , quindi restituisce Maybe.nothing()

nel successivo map  ***.map(b => b.c)*** che è  Maybe.nothing(), non viene applicata la funzione passata b => b.c come mai ??
riprendendo la definizione di map della maybe :

`map: (transformer) => isNullOrUndef(value) ? Maybe.nothing() : Maybe.just(transformer(value))`

il secondo map, che è in realtà la seconda "nuova" maybe restituita dal map della maybe precedente come Maybe.nothing(), al suo interno come contenitore ha il valore null, e quindi ***isNullOrUndef(value) ? Maybe.nothing()*** restituisce di nuovo Maybe.nothing(), e cosi a catena il successivo .map, che inevitabilmente sono tutte maybe con valore nullo, quindi tutte Maybe.nothing(), `Maybe.just(transformer(value))` e la funzione transformer non viene più eseguita.

rivediamo con il commento di come vengono restituite ***nuove maybe*** dal map riga per riga :

```javascript
const a = { b: { c: "fp"} };

const maybeB = Maybe.just(a)
.map(a => a.d) // restituisce Maybe.nothing()
.map(b => b.c) // restituisce Maybe.nothing()
.map(c => c + " is great!"); // restituisce Maybe.nothing()

console.log(maybeB.extract()); // null
```

La cosa importante, è che la catena si ferma, in quanto nella biforcazione del map non viene eseguito il ramo ***Maybe.just(transformer(value))***  che applica la funzione transformer passata, e tutte le successive maybe create con .map saranno sempre nulle come Maybe.nothing()

più precisamente, ***tutte le funzioni nei map successivi non vengono eseguite in presenza di valori null***, in questo modo non possiamo più generare errori per valori nulli, che tipicamente porta a bug nel programma !

Questo è l aspetto che ci interessa, la concatenazione di map eseguono un flusso di programma, il quale si ferma se trova valori nulli.

### a cosa serve quindi la maybe ??

La maybe permette una biforcazione del flusso, come fa la if, ma senza che devo scrivere codice che controlla valori null perché lo fa al suo interno con il suo map restituendoci maybe di tipo nothing o just !!

***Importante è quindi vedere la maybe come due tipi che possono essere just o nothing***

diversamente avrei dovuto scrivere :

```javascript
const val1 = a

let val2=null
if (val1) {
val2 = val1.d
}

let val3=null
if (val2) {
val3 = val2.c
}

console.log(val3); // null

```

come cambia la leggibilità ? notare come devo ricorrere a variabili intermedie (o terribili nidificazioni di if),  non più necessarie con la maybe che segue linearmente il flusso.

## il chaining di funzioni

Aggiungiamo queste 2 funzioni di utilità al codice precedente :

```javascript
const prop = (propName) => (obj) => obj[propName];
const append = (appendee) => (appendix) => appendee + appendix;

const a = { b: { c: "fp"} };

const val = prop('b')(a) // { c: "fp"}

// posso scrivere anche come :

const getPropB = prop('b')
const valB = getPropB(a) //  { c: "fp"}

// se voglio accedere a c :
const getPropC = prop('c')

const valC = getPropC(getPropB(a)) //   "fp"

```

Ho creato delle funzioni con un solo parametro che restituiscono funzioni per il resto dei singoli parametri, diciamo ***funzioni che restituiscono funzioni***

***const val = getPropC(getPropB(a))***

getPropC riceve \{ c: "fp"} restituito da getPropB(a) , quindi legge il valore in `c` con valore "fp"
usando queste funzioni il codice precedente diventa :

```javascript
const prop = (propName) => (obj) => obj[propName];
const append = (appendee) => (appendix) => appendee + appendix;

const maybeA = Maybe.just(a)
    .map(prop("b"))
    .map(prop("c"))
    .map(append(" is great!"));

console.log(maybeB.extract()); // fp is great!
```

Dentro al primo map gli passo `.map(prop("b"))` pronta a leggere il membro b di un oggetto passato : `prop("b")` al interno quindi diventa:

- `obj => obj["b"]` che è la stessa cosa del nostro precedete `a => a.b`
- append ugualmente è pronto a riceve una stringa, per poi concatenarla nella sua funzione restituita.

### First-Class Function

In prima battuta diciamo che aumenta la leggibilità in quanto non specifico più nella funzione dentro al map il parametro (non importa il suo nome) del oggetto da leggere, tutte le funzione passate al map hanno tale parametro in quanto funzioni, concetualemente gli passiamo il nome della funzione che  questo aspetto si chiama  First-Class Function cioè **le funzioni si comportano come una variabile**.

### Point-free

Abbiamo fatto un refactory con lo stile **point-free**, cioè non specifichiamo come detto il parametro iniziale, la leggibilità aumenta, più codice inseriamo più dobbiamo leggere cosa fa per capire, con un nome appropriato indico meglio con un solo termine.

A cosa torna utile a noi queste osservazioni di funzioni cosi definite rispetto alla nostra maybe ??
Che potrei evitare la catena .map, passando più chiaramente il flusso da gestire :

```javascript
const isNullOrUndef = (value) => value === null || typeof value === "undefined";

const maybe = (value) => ({
    isNothing: () => isNullOrUndef(value),
    extract: () => value,
    map: (transformer) => !isNullOrUndef(value) ? Maybe.just(transformer(value)) : Maybe.nothing()
});

const Maybe = {
    just: maybe,
    nothing: () => maybe(null),
    chain: (...fns) => (input) => fns.reduce((output, curr) => output.map(curr), input) // AGGIUNGIAMO CHAIN
};
```

La funzione chain nella nostra Maybe

- prende una lista di funzioni con il parametro (...fns)
- restituisce una funzione  con il paramentro (input)
- nella funzione restituita, ciclo le funzioni passate con reduce eseguendo la catena di maybe con `output` passando la funzione corrente `curr`

Diciamo anche che passo alla chain una serie di funzioni che vengono inserite nel map di una maybe `output`, questa creata dal map precedente che la restituisce come variabile `output`, la maybe iniziale è `input` che poi chiamiamo `output`.
Il codice dovrebbe chiarire le idee rispetto a questa descrizione;

```javascript
const prop = (propName) => (obj) => obj[propName];
const append = (appendee) => (appendix) => appendix + appendee;

const a = { b: { c: "fp"} };

const appendToC = Maybe.chain(
    prop("b"),
    prop("c"),
    append(" is great!")
);

const goodInput = Maybe.just(a);
const badInput = Maybe.just({});

console.log(appendToC(goodInput).extract())
console.log(appendToC(badInput).extract())
```

con chain abbiamo eliminato la concatenazione dei map, passando più chiaramente una lista di funzioni, senza usare prop e append mi sarei trovato

```javascript
const appendToC = Maybe.chain(
    o => o.b
    o => o.c,
    c => c + " is great!"
);

// nella versione iniziale scrivavamo :

const maybeA = Maybe.just(a)
.map(a => a.b)
.map(b => b.c)
.map(c => c + " is great!");

//  versione finale meno verbosa

const appendToC = Maybe.chain(
    prop("b"),
    prop("c"),
    append(" is great!")
);
```

L' ultima versione è la più compatta e chiara nella lettura, in questi esempi il codice nelle funzioni è molto semplice, immaginate se avete qualcosa di più articolato se qualcuno può obbiettare che non cambiano molto le cose.

### Le promise e la nostra maybe non sono monadi

In questi esempi ho chiamato la monade maybe, ma in realtà rimane un container in quanto ha la funzione map, per essere monade abbiamo bisogno di altri membri oltre al map, ma qui ci siamo concentrati al suo concetto di base, pronta per essere utilizzata.

Ho inserito link utili per approfondire il discorso oltre, o se si vuole studiare meglio la programmazione funzionale, questa introduzione dovrebbe aiutare.

### Codice più leggibile

Abbiamo visto :

- L' importanza delle costanti rispetto alle variabili definite con let, dove mi permette di creare meno bug, mi obbliga a usare meglio la semantica e il refactoring del codice è meno rischioso e molto più veloce.

- Con la maybe abbiamo visto come mi permette di non utilizzare più la if con i suoi brutti costrutti, variabili intermedie ecc.

- Con le funzioni che restituiscono funzioni come possiamo passare le funzioni ai map senza parametro iniziale, con la giusta semantica leggo cosa fa, non come lo deve fare.

- Con la chain non devo ripetere più .map, passo direttamente la sequenza di funzioni da eseguire diventado diretta la semantica del flusso.

Nella programmazione funzionale ci si concentra **su cosa si deve fare non come lo si deve fare** come sequenza di azioni, questo ci permette di concentrarci sul flusso da seguire, con la chain questo è molto chiaro, quindi la maybe con la chain significa dire :

***Fino a quando non trovi errori , prendi la prob b, la prop c e inserisci una stringa finale.***

Quando leggo il codice mi concentro nelle ultime righe del codice, deve essere chiaro il flusso e non i dettagli fosse anche il solo e corto .map o il parametro della funzione, l unico sforzo richiesto è la giusta semantica, ma non devo scorrerlo come nel codice imperativo su e giù , di nuovo su e giù per seguire il flusso che mi perdo facilmente.

I dettagli vado a leggermeli per cambiare qualcosa, ma una volta che funzionano non mi interessano, e la manutenzione del codice cambia molto in questo modo, se può sembrare un maniacale risparmiare quel poco le cosa cambiano quando vado a modificare.

la if è un costrutto pesante per seguire il flusso, per questo viene usata la maybe, chiamata anche option dove molti linguaggi per esempio rust la usano di base, in generale vi consiglio di utilizzarla il meno possibile, e anche senza grossi studi rafforzare l approccio intendendo almeno le parti facili alla programmazione funzione dove javascript si presta molto bene, considerando che molti linguaggi non funzionali hanno inziato ad addottarla.

## link utili

[dove provare il codice on line](https://jsfiddle.net/)

[articolo di riferimento](https://www.codingame.com/playgrounds/6272/building-a-maybe-in-javascript)
[un altro articolo sulle monadi](https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8)
[either](https://blog.logrocket.com/javascript-either-monad-error-handling/)

[implentazioni](https://thecodest.co/blog/power-of-functional-programming-in-javascript-part-3-functor-monad-maybe/)

[la guida più amata per l' introduzione alla programmazione funzionale](https://mostly-adequate.gitbook.io/mostly-adequate-guide/)

### La teoria sui container chiamati functor

[i functor 1](https://javascript.plainenglish.io/the-definite-guide-to-functors-in-js-6f5e82bd1dac)

[i functor 2](https://stackoverflow.com/questions/63390339/functor-implementation-in-javascript)