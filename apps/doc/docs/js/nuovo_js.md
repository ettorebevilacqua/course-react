# Come cambia il javascript più moderno : ES6

Javascript prende questi 2 nomi ES5 e ES6, che sta per Emacs Script che è il nome del consorzio che definisce l evoluzione di tale linguaggio, javascript prende queste direttive, se domani varia rispetto a questo, non è più un linguaggio emacs.

## let e const per definire le variabili

Precedentemente usavamo solo var per definire le variabili, ora abbiamo `let` per le variabili e `const` per le costanti anche se errato dire cosi, chiamiamole pure alla buona variabili costanti (che quindi non sono varibili), anche se il loro nome è costanti.

Oggi è non più di uso dichiarare le variabili con `var` che in automatico prendono il valore undefined se ancora inizializzate e cosi non generano errori di dichiarazione :

```js
console.log(valueVar)
console.log(value)

let value = 5
var valueVar = 8
```

In questo caso io primo log visualizza undefined in quanto vede che esiste valueVar ma non ancora il suo valore 8 assegnato succesivamente.
Il log di value invece genera un errore :

`Uncaught ReferenceError: Cannot access 'value' before initialization"`

errore di referenza, non si può accedere a value prima della sua iniziallizazione, che è diverso dal errore che value non esiste.
Si sconsiglia di usare le dichiarazioni con val, che è rimasto per retro compatibilità in quanto porta più facilmente a bug, un errore ci blocca prima di rischiare valori che possiamo perdere il controllo.

L uso di let invece si cerca di evitarlo a favore di const, anche se può sembrare scomoda la cosa, e si tende a usare let cosi siamo pronti senza dover cambiare nulla a cambiare il valore a una variabile :

```js
let nome = `Mario`
let nome = nome + `Rossi`

console.log(nome)
```

meglio scrivere :

```js
const nome = 'Mario'
const nomeCognome = nome + ' Rossi'

console.log(nomeCognome)
const messaggio = 'Salve ' + nomeCognome + ' oggi è l onomastico di coloro che si chiamano' + nome
```

se devo scrivere messaggio, nel primo caso non riesco più a dividere nome con cognome e scrivere come nella seconda forumula
in questo caso non cambio valore alla variabile ma ne creo una nuova costante, se devo variare il valore, creao una ulteriore costante e cosi via.
In questo modo ho una serie di trasformazioni che prendeno nomi diversi, questo comporta di avere i vsalori originali precedenti a disposizione come visto nel esempio e meno errori tipici di errata assegnazione, in specie nelle condizioni se sbagliamo a digitare :

`if (nome='paolo')` in questo caso nome cambia valore in paolo, se nome è costante genera un errore subito visibile e non rischio valori errati.

In genrale cercate sempre di usare const, meno usate let più è facile individuare le variabili che cambiano in caso di errori di cui in genere i più difficili da individuare, e la loro esistenza deve essere più corta possibile, in altre parole evitate di usarla come varibiali globali che esistono in tutta la dirata del programma , ma dentro a funzioni in modo che al di fuori della funzione non esistendo più non rischiamo che chi sa chi possa variare per errroe il valore.

## Stringhe letterali

Abbiamo un nuovo metodo per scrivere le stringhe dentro a apici chiamati **i back tick** : \```\` rispetto a `''` o `""` detti singolo o doppio apice.

```js

const str = ` questa stringa è capace di andare a capo
            e essere visualizzata in più righe`

console.log(str)

const nome = 'Rossi mario'
const message = `Congratulazioni signor ${nome} per la sua promozione`

console.log(message)
```

Nel primo caso possiamo vedere con **i back tick** che mantiene il ritorno a capo, nel secondo che possiamo inserire varibili o costanti dentro alla stringa tramite `${nome}` cioè le partentesi graffe precedute dal $ con dentro un valore.

## La Destruttrazione

Il termine non rassicura, ma vengono in aiuto per scrivere codice più compatto , leggibile e meno soggetto a errori.
Facciamo subito un esempio :

```js
const introduction = ["Hello", "I" , "am", "Sarah"];
const greeting = introduction[0];
const name = introduction[3];

console.log(greeting);//"Hello"
console.log(name);//"Sarah"
```

Con i distruttori posso scrivere :

```js
const [greeting, pronoun] = ["Hello", "I" , "am", "Sarah"];

console.log(greeting); //"Hello"
console.log(pronoun); //"I"
```

In pratica con `[greeting, pronoun]` abbiamo scritto un array nella definizione del nome della varibiale, questo avrebbe poco senso, se non fosse che invece significa : prendi i primi due valori del array letto, e assegna il nome greeting e pronoun rispettivamente.

```js
const [method, url, param] = ['https', `www.miosito.it/pagina`, `lang=it`]
```

Come prima ho subito in una riga i tre valori in 3 variabili, questo permette di evitare meglio di riferirsi ad array del genere come `lista[1]`, o `lista[2]` che con l' indice non mi da nessuna informazione di che genere sia il valore, e sono obbligato a vedere il contenuto della lista.

Posso anche saltare parametri in questo modo :

```js
const [greeting,,,name] = ["Hello", "I" , "am", "Sarah"];
console.log(greeting); //"Hello"
console.log(name); //"Sarah"
```

Con delle virgole senza valori salto i parametri.

se volessi solo il primo valore e il resto come lista senza il primo valore già letto ??

```js
const [greeting, ...intro] = ["Hello", "I" , "am", "Sarah"];

console.log(greeting);//"Hello"
console.log(intro);//["I", "am", "Sarah"]

```

In questo caso con i 3 puntini (...) gli dico di prendere il resto che rimane, quindi senza i valori già letti.

Anche se passiamo funzioni che però restituiscono array funziona :

```js
function getArray() {
    return ["Hello", "I" , "am", "Sarah"];
}

const [greeting,pronoun] = getArray();

console.log(greeting);//"Hello"
console.log(pronoun);//"I"
```

### Destruttrazione di oggetti

Tradizionalmente leggo i valori in questo modo :

```js
const person = {name: "Sarah", country: "Nigeria", job: "Developer"};

const name = person.name;
const country = person.country;

console.log(name); //"Sarah"
console.log(country); //"Nigeria"
```

ma con la destrutturazione in modo simile agli array :

```js
const person = {name: "Sarah", country: "Nigeria", job: "Developer"};

const {name, country} = person;

console.log(name);//"Sarah"
console.log(country);//"Nigeria"
```

quello che cambia, è che devo prendere il nome della chiave del oggetto.

### Se voglio assegnare un altro nome rispetto alla chiave del oggetto

Se voglio cambiare nome, specie per evitare collisioni di nomi già presenti, posso scrivere :

```js
const person = {name: "Sarah", country: "Nigeria", job: "Developer"};

const {name: foo, job: bar} = person;

console.log(foo);//"Sarah"
console.log(bar);//"Developer"
```

i valori estratti sono assegnati alle variabili foo e bar

### usare valori predefiniti

Posso assegnare dei valori predefiniti nel caso la spefica chiave del oggetto non esiste :

```js
let person = {name: "Sarah", country: "Nigeria", job: "Developer"};

let {name = "myName", friend = "Annie"} = person;

console.log(name);//"Sarah"
console.log(friend);//"Annie"
```

possiamo anche asseganre un nome diverso e un valore predefinito :

```js
const person = {name: "Sarah", country: "Nigeria", job: "Developer"};

const {name:foo = "myName", friend: bar = "Annie"} = person;

console.log(foo);//"Sarah"
console.log(bar);//"Annie"
```

### la property name

```js
const prop = "name";

const {[prop] : foo} = {name: "Sarah", country: "Nigeria", job: "Developer"};

console.log(foo);//"Sarah"
```

posso assegnare il nome dinamicamente, cioè preso da una variabile, mettendo la variabile del nome tra parentesi quadre.

### annidamento nella destrutturazione

Se il mio oggetto è annidato, cioè sono prenseti sotto oggetti, possiamo accedere in questo modo

```js
const person = {
    name: "Sarah",
    place: {
        country: "Nigeria", 
        city: "Lagos" }, 
    friends : ["Annie", "Becky"]
};

const {name:foo,
     place: {
         country : bar,
         city : x}
    } = person;

console.log(foo);//"Sarah"
console.log(bar);//"Nigeria"
```

### il resto nella destrutturazione

Come per gli array, posso assegnare edlle chiavi, e chiedere il resto rimanente :

```js
const person = {name: "Sarah", country: "Nigeria", job: "Developer" friends: ["Annie", "Becky"]};

const {name, friends, ...others} = person;

console.log(name);//"Sarah"
console.log(friends);//["Annie", "Becky"]
console.log(others);// {country: "Nigeria", job: "Developer"}
```

others quindi contiene il resto del oggetto non letto `{ country: "Nigeria", job: "Developer" }`. 
`others` può prendere il nome che preferiamo.

### la destrutturazione nei parametri delle funzioni

```js
function person({ name: x, job: y } = {}) {
    console.log(x);
}

person({ name: "Michelle"} );//"Michelle"
person();//undefined
```

La funzione `person`, prende un oggetto con chiavi name e job, nel primo caso visualizza `Michelle` in quanto name viene risolto,
nel secondo caso i parametri sono vuoti e quindi può solo che assegnare undefined

e possiamo assegnare dei valori ai parametri come già visto se sono mancanti :

```js
function person({name: x = "Sarah", job: y = "Developer"} = {}) {
    console.log(x);
}

person({name});//"Sarah"
```
