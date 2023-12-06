# Uso avanzato delle funzioni in javascript

## definizione

Le funzioni le possiamo definire con function o come arrow function `=>` , qui la stessa funzione scritta in 2 diverse modalità  

```js
function media(list){
    const lenList = list.length;
    let somma = 0;
    for (let i = 0; i < lenList; i++ ) somma=somma list[i];
    return somma / lenList;
}

const mediaArrow = (list)=>{
    const lenList = list.length;
    let somma = 0;
    for (let i = 0; i < lenList; i++ ) somma=somma list[i];
    return somma / lenList;
}
...

## First-class functions

Le funzioni in js sono di tipo first-class functions in quanto sono trattate come comune variabili e possono essere passati come paramentri nelle funzioni o restite dalle funzioni:


```js
const add = (x, y) => x + y

const log = fn => (...args) => {
         fn(...args)
    }

const logAdd = log(add)
logAdd(2,3) // 5 
```

Qui la funzione log prende una funzione fn nei suoi paramentri e retituice una funzione `(...args) => {...` tramite un ulteriore simbolo di arrow function `=>`
Con `...args`, possiamo leggere tutti i parametri della funzione come lista, e cosi   `fn(...args)` richiamare una funzione passandogli i parametri, questo mi evita di dover specificare parametri, nel nostro caso `logAdd = log(add)` restituisce una funziona che prende ...arg parametri, e esegue la funzione passata add con ...arg parametri , ...arg ci permette di essere indipendenti dai parametri, e cosi poter fare queste generalizzazioni.

LogAdd quindi si comporta come la funzione add, che però viene  eeguita al suo interno.

## le funzioni applicate parzialmente

Spesso torna utile questo metodo di funzioni che prendono dei parametri, "li ricordano" e restituiscono una funzione

```js

setTimeout(()=>console.log('finish time'), 400)

const log = ()=>console.log('finish time with log')
setTimeout(log, 400)

```

Ricordiamo che timeout esegue una funzione come primo parametro, dopo un intervallo di tempo in millisecondi come secondo parametro.
Vediamo che nella seconda setTimeout passiamo direttamente la funzione `log` definita separatamente, questo aumenta la leggibilità

Ma possiamo fare qualcosa di più complesso, per esempio definire una funzione che orende un parametro n e restituisce una seconda funzione

```js
const timeCountLog = (n)=>()=>{
    console.log(n)
    n-- > 0  && setTimeout(timeCountLog(n), 400)
}

const timeCountDown = (n) => timeCountLog(n)()

// timeCountLog(5)()
timeCountDown(5)

```
timeCountLog prende il valore n e restituisce :

```js
()=>{
    console.log(n)
    n-- > 0  && setTimeout(timeCountLog(n), 400)
}
```

Essendo definita dentro timeCountLog come funzione che restituisce una funzione, il valore n viene visto dal contesto, e dentro setTimeout chiamiamo se stessa cioè `timeCountLog` si dice in modo ricorsivo quando una funzione chiama se stessa come in questo caso.

### La condizione non fa esegueire il codice al infinito

`n--` legge quanto vale n e esegue per noi n=n-1 in forma più compatta, quindi significa leggi n e diminuiscilo di 1, se la condizione è vera esegui il timeOut.

Con la condizione `n-- > 0 &&` non la rende infinita, perchè ua funzione che chiama se stessa senza controllo , crea un loop infinito e bisogna stare attenti.
`n-- > 0 &&` con && significa se vero esegui quello che segue. Se scriviamo come condizione`n++ < 5`otteniamo il conteggio da 0 a 5 se chiamata come timeCountDown(0).

In questo modo timeCountLog dovrei chiamarla come `timeCountLog(5)()` perchè per farla partire dobbiamo eseguire la funzione restituita.
In questo modo potete trovare funzioni con doppoe parentesi tipo sum(3)(5) piuttosto che scrivere sum(3,5), questo perchè si ha intenzione come visto di passare una parte della funzione che prende un paramentro inizialem, e chi la prende si trova a chiarmarla solo con il secondo parametro.

`const timeCountDown = (n) => timeCountLog(n)()` ci evita di usare le doppie parentesi se può essere più comodo non dover scrivere `timeCountLog(5)()`.

### Dove torna utile applicare parzialmente le funzioni ? Evitiamo varibiali esterne.

Quando passiamo funzioni del genere , come ` timeCountLog(n)`  piuttosto che  `timeCountLog(5)()` si dice che applichiamo parzialmente la funzione, di fatto non è eseguita con un solo parametro, ma  in `setTimeout( timeCountLog(n), 400)` passsa parzialmente  timeCountLog(n), allo scadere esegue  `timeCountLog(n)()` in quanto setTimeout come primo parametro prende una funzione senza parametri, scrivendo  `timeCountLog(n)` gli passiamo una funzione senza parametri ma molto comoda che legge al suo interno il valore n.

Questo mi evita anche dover definire esternamente una variabile specifica che tiene il conto di n, la funzione `timeCountLog` è indipendente da valori esterni con il suo contatore interno.

### Il curry delle funzioni

vista la parsiale applicazione, nel esempio precedente si potrebbe passare più di un paramentro :

```js
const timeCountLog = (n, time)=>()=>{
    console.log(n)
    n-- > 0  && setTimeout(timeCountLog(n), time)
}

timeCountLog(5, 300)()

// OPPURE ;

const countDown = timeCountLog(5, 300);
countDown();
```

Il curry è la parziale applicazione passando un solo parametro :

`const add = (x, y) => x + y` la possiamo scrivere come :

```js
const add = x => y => x + y

const add1 = add(2)
add1(2); // 4
add1(3); // 5
```

Questa piccola differenza può portare a confuzioine quando si parla di curry o parziale applicazione, in genere le funzioni curry, servono per conservare i valori e essere riutilizzate con altri nomi nei parametri successivi, che devono essere sempre singoli.

### funzioni pure

Una funzione pura è tale che dato un suo parametro in input, il risultato non varia se il paramentro è lo stesso.

`const add = (x, y) => x + y` questa è una funzione pure, se i parametri sono 2 e 3 restituisce sempre 5, non posso avere altri valori improvisi

mentre

```js
let x = 0
const add = y => (x = x + y)
console.log(add(3)) // 3
console.log(add(3)) // 6
```

non restituisce lo stesso risutato se il paramentro è identico, in questo caso aggiornando il valore di x
Allo teso modo 

```js

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const addRandom = (y) => y + getRandomInt()
addRandom(3) 
addRandom(3)
```

addRandom non è pura, con lo stesso paramentro 3 il numero è totalmente causuale, anche getRandomInt non è una funzione pura, che è quella che rende impura la nostra funzione addRandom.

La funziona pura si comporta come le funzioni matematiche, x = x * 2 , porta sempre allo stesso risultato a parità di x, non certo uno innaspettato.

## la composizione

Le funzioni posso comporle tra di loro evitando di dover memorizzare valori intermedi :

```js
const add = (x, y) => x + y
const square = x => x * x

const addVal = add(3,2)
const squareOfAddVal = square(addVal)
console.log(squareOfAddVal)

// posso comporre chiamando una funzione dentro l'altra

const addAndSquare = (x, y) => square(add(x, y))
console.log(addAndSquare(3, 2))

```

addAndSquare chiama square con una funzione da eeguire, il suo risultato viene poi passato come parametro di addAndSquare, evitando variaibli intermendie.