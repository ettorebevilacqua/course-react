# Breve panoramica di js

Questa sezione serve come breve panoramica al liguaggio, che non sostituisce una guida, può essere utile a chi già conosce un linguaggio di programmazione e vuole vedere velocemente le differenze, o come panoramica dei costrutti essenziali a chi si approccia al linguaggio iniziando a leggere del codice.

Può essere anche utile come promemoria veloce senza bisogno di cercare gli argomenti.

## Variabili

La parola chiave storicamente utilizzata per dichiarare una variabile è var ma si sconsiglio il suo uso :

`var name;`
`var name = value;`

Esempi di utilizzo delle variabili in JavaScript:

```js
var a = 10,
  b = 20;
var c = a * a + b * b;

var s = "Diagonal equals:";

console.log(s + Math.sqrt(c));
```

### usare let e const

Dalla versione chiamata ES6 di js, vengono introdotte le dichiarazioni let e const

```js
let a = 10;
const b = 20;

a = 5;

const c = a * a + b * b;

const s = "Diagonal equals:";

console.log(s + Math.sqrt(c));
```

Le variabili let possono cambiare valore a differenza di const che rimangono constanti in tutto il programma, se si prova a cambiare loro il valore vanno in errore, il consiglio generale è di usare e variabili const e solo le variabili che variano come nel esempio con let, ma in generale una buona scrittura di codice riduce l' uso di variabili dichiarate con let, esse sono fonti di facili bug.

### I tipi di dati

- number `pi = 3.14;` contiene qualsiasi numero
- string `s = "Hello!";` tipo testo chiamate stringa
- boolean `result = true;` tipo booleano che prende valori solo true o false
- Array `arr = [1, 2, 3, 4, 5];` liste di elementi chiamati array
- Date : `current = new Date();` valori che esprimono date
- object : `o = { width: 100, height: 200}` vagibili oggetto, trutture che prendono più valori in sotto variabili o funzioni
- function : `function sqr(var x) { return x*x;}` sqr è una variabile di tipo funzioni, in js le funzioni sono variabili.

Per finire comode l operatore `typeof` che restituisce il tipo di variabile

```js
const s = "14";
const x = typeof s === "number" ? s * 10 : s;
```

in questo caso se la vatiabile s è number moltiplica per 10 se no restituisci il valore

### le funzioni

Abbiamo 2 tipi di funzioni, le function e le arrow funtion

```js
function name(a, b, c) {
  const sum = a + b + c;
  return result;
}
```

Le funzioni prendono dei parametri separati dalla , e ritornano il valore con return

le arrow function prendono questo nome perchè sostotuiamo function con una freccia `=>`, questo ci permette di essere più coincisi

```js
const name = (a, b, c) => a + b + c;
```

La stessa funzione di prima in una riga, il return se non ci sono ulteriori istruzioni può essere omesso

```js
const name = (a, b, c) => {
  const sum = a + b + c;
  return sum / 3; // calcola la media
};
```

Se però utilizzo una arrow function con più istruzioni devo aggiungere return alla fine se voglio restituire il risultato.

## Array

```js
const array = [1, 2, 3, 4, 5];
array[3] = array[2];

// Possono avere valori di qualsiasi tipo, anche altri array:

const array = [1, "Hello", 3.14, [4, 5] ];
array[3] = array[2];

// Inoltre, gli array si comportano anche come raccolte: puoi aggiungere dinamicamente elementi ad essi:

const array = [];
array.push(100);
array.push(101);s

```

## Oggetti

gli oggetti sono caratterizzati da coppie chiave e valore, come raggruppare variabili dentro un contenitore

```js
const obj = {
  name: "Bill Gates",
  age: 67,
  company: "Microsoft",
};

console.log(obj.age);
```

Posso assegnare le chiavi dinamicamente :

```js
const obj = {};
obj.name = "Bill Gates";
obj.age = 67;
obj.company = "Microsoft";

delete obj.age; //remove field
```

e con delete eliminare una chiave esistente

posso anche assegnar gli oggetti come

```js
const firm = "company";
const obj = {};
obj["name"] = "Bill Gates";
obj.age = 67;
obj[firm] = "Microsoft";
```

obj[firm] è uguale a obj['company'], se voglio passare come key una variabile, devo quindi inserirla nelle parentesi quadre.

## istruzioni di controllo del flusso

### if else

```js
const x = 1;

if (x == 1) {
  console.log("one");
} else {
  console.log("unknown");
}
```

### ciclo for

```js
let s = 0;
for (let i = 0; i < 10; i++) s += i;
console.log(s);
```

tipicamente come in molti linguggi che prendono la sintassi del c, abbiamo nelle parentesi del for

- `let i=0;` valore iniziale detto contatore
- `i < 10;` condizione di termine del ciclo
- `i++` come deve incrementare il contantore

### ciclare gli array

```js
const list = [2, 4, 10];
let newList = [];
for (let i = 0; i < 10; i++) newList[i] = list[i] * 2;

console.log(newList); // [4, 8, 20]
```

### ciclare gli oggetti

```js
var obj = { a: 1, b: 2, c: 3 };
for (var key in obj) console.log(obj[key]);
```

In questo mi restituisce la chiave, e quindi leggo il valore come `obj[key]`
ma posso ciclare gli oggetti leggendo sia il valore che la key

```js
var obj = { a: 1, b: 2, c: 3 };
for (var [key, val] of Object.entries(obj)) console.log(val, key);
```

`Object.entries(obj)` restituisce le coppie chiave valore

## eccezioni

Le eccezzioni è il controllo su eventuali errori generati a run time, cioè durante l esecuzione del programma

```js
try {
  throw new Error("JavaScript support exceptions");
} catch (e) {
  console.log(e);
}
```

con throw posso generare un errore, con try provare delle istruzioni, dove se vanno in errore, anzichè bloccare il programma, nel ramo catch posso prendere altre decisioni e continuare l esecuzione. Nel esempio genero un errore appositamente nel try, per visualizzarlo in console.

Nelle operazioni critiche è consigliato il suo uso.

## Il formato JSON

JSON è l'acronimo di JavaScript Object Notation. Questo formato è strettamente simile al comune oggetto js,con alcune differenze

```js
{
  "firstName": "Bill",
  "lastName": "Gates",
  "birthday": {
    "day": "12",
    "month": "10",
    "year": "1965" },
  "address": {
    "city": "Radmond",
    "state": "Washington",
    "street": "Gates 1",
    "zipCode": "93122"},
  "phone": {
    "home": "+123456789",
    "work": "+123456799"}
}

```
le chiavi e i valori stringa devono essere tutti racchiusi dai doppi apici "", mentre negli oggetti js, le chiavi possono essere scritte senza apici, o con doppi apici o singoli, le strighe o con i doppi apici o i singoli a sua volta.

Un metodo per trasformare un oggetto o un JSON in stringa è `JSON.stringify`

```js
const obj = { a: 1, b: 2, c: 3 };
const stringObj = JSON.stringify( obj )
console.log(stringObj) // { a: 1, b: 2, c: 3 }

const objOriginal = JSON.parse( '{ a: 1, b: 2, c: 3 }' )
```

`JSON.pars` invece prende una stringa e la converte in oggetto js.