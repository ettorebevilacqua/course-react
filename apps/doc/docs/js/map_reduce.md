# map e reduce degli array

Proviamo alcune operazioni sulle liste array :

```js
const upperList = (list)=>{
    let acc=[];
    for(let i=0; i < list.length; i++){
        acc[i] =  list[i].toUpperCase();
    }
    return acc;
}

console.log(upperList(['aa','bb', 'cC'])) // ['AA', `BB', `CC`]


const incList = (list)=>{
    let acc=[];
    for(let i=0; i < list.length; i++){
        acc[i] =  list[i]++;
    }
    return acc;

}

console.log(upperList([0, 1, 2])) // [1, 2, 3]

const negateList = (list)=>{
    let acc=[];
    for(let i=0; i < list.length; i++){
        acc[i] =  !list[i];
    }
    return acc;

}

console.log(negateList([true, false, true])) // [false, true, false]

```

Tutte queste funzioni sono quasi identiche, quello che cambia è l istruzione dentro il for :

- `acc[i] =  list[i].toUpperCase();`
- `acc[i] =  list[i]++;`
- `acc[i] =  !list[i];`

quindi posso fare a meno di dover riscrivere tutta la parte identica tramite una astrazione chiamata map :

```js
const map = (list, func)=>{
    let acc=[];
    for(let i = 0; i < list.length; i++){
        acc[i] = func(list[i])
    }
    return acc;
}

const upperList = map(['aa','bb', 'cC'], val => val.toUpperCase())
const incList = map([0, 1, 2], val => ++val)
const negateList = map([true, false, true], val => !val)

console.log(upperList) //  ['AA', `BB', `CC`]
console.log(incList) // [1, 2, 3]
console.log(negateList) //  [false, true, false]
```

La logica del for, che necessita di una variabile acc che accumuona i risultati, in pratica crea un nuovo array con il valori trasformati del precedente list passato in input alla funzione viene scritta una sola volta essendo sempre identica, il calcolo lo passiamo come funzione.

Il map di dice anche funzione di trasformazione, in quanto trasmorma i valori di una lista restituendo una nuova lista con uguali elementi ma trasformata nei valori un base a una funzione passata.

Come potete vedere il codice si riduce molto senza le ripetizioni, e diventa più leggibile chiaro su cosa deve fare, nascondendo i dettagli di come lo deve fare, in altre parole, gli passiamo la lista e la funzione che dice cosa deve fare per ogni valore.

Ora prendiamo l' esempio di una somma o della media :

```js
const sumOfList = (list) => {
    let acc=0;
    const count = list.length;

    for(let i=0; i < count; i++){
        acc = acc + list[i];
    }
    return acc;
}

const countMaxLenWords = (list) => {
    let acc=0;
    const count = list.length;

    for(let i=0; i < count; i++){
        acc = list[i].lenght > acc ? list[i].lenght : acc;
    }
    return acc;
}

const filterMax6 = (list) => {
    let acc=[];
    const count = list.length;

    for(let i=0; i < count; i++){
        acc = list[i] < 7 ? [...acc, list[i]] : acc;
    }
    return acc;
}

console.log(sumOfList([2, 5, 3])) // 10
console.log(mediaOfList([2, 5, 3])) // 3.
console.log(filterMax6([2, 9, 3, 6, 7])) // [2, 6, 3]
```

Quello che cambia, che prima restituivo una nuova lista con ogni elemento trasformato da una funzione, ora invece restituico un unico valore data una lista.
Per tale motivo dico che rispetto alla lista sto eseguendo una riduzione, da tanto elementi a uno solo e la chiamiamo Reduce.

Proviamo come prima a scriverla più generale senza ripetizioni, quello che cambia ora è come prima la funzione interna al for, e questo ci suggerisce quindi di passare una funzione come fatto precendenza, ma a differenza di prima , acc ora varia a seconda dei casi, e quindi devo passarlo.

```js
const reduce = (list, func, acc)=>{
        const count = list.length;
        for(let i=0; i < count; i++){
         acc = func(acc, list[i], i)
    }
    return acc;

}

console.log(reduce([2,5,3], (acc, val)=> acc + val,  0))
console.log(reduce(['ab', 'abcdef', 'abcd'], (acc, val)=> val.length > acc ? val.length : acc,  0))
console.log(reduce([2, 9, 3, 6, 7], (acc, val)=>  val < 7 ? [...acc, val] : acc ,  []))

```

Ora ho 3 paramentri, la lista, la funzione da eseguire, e l accumulatore per conservare i valori "accumulati"

posso riscrivere per maggior lebbigilità dei paramentri :

```js
const reducerSum = (acc, val)=> acc + val;
const reducerStringMax = (acc, val)=> val.length > acc ? val.length : acc;
const reducerFilterMax6 =  (acc, val)=>  val < 7 ? [...acc, val] : acc;

console.log(reduce([2,5,3], reducerSum,  0))
console.log(reduce(['ab', 'abcdef', 'abcd'], reducerStringMax,  0))
console.log(reduce([2, 9, 3, 6, 7], reducerFilterMax6,  [])) // [2, 6, 3]

```

In questo caso le funzioni che eseguoni le operazioni sui valori, le ho tutte chiamate con reducer inziali, questa è una convenzione per ricordare che queste funzioni servono per essere passate a funzioni che eseguono il reduce, e loro è la loro logica interna.

Nel caso della funzione reducerFilterMax6, dove filtra sempre e solo per il valore 6, se voglio rendere paramentro il valore 6, quindi scritta come :

`(acc, val, PARAM)=>  val < PARAM ? [...acc, val] : acc;` dove PARAM è in maiuscolo per leggibilità , questo non funzionerebbe in quanto reduce si aspetta una funzione passata con 2 paramentri che sono l' accomulatore, e il valore corrente della lista, e chiama tale funzione solo con quei 2 parametri, le funzioni devono cosi essere compatibili come numero e genere di paramentr.

Per aggirare l' ostacolo posso scrivere una funzione che prende un paramentro e restituisce la funzione che mi interessa :

```js
const reducerFilterMax = maxVal => (acc, val) =>  val < maxVal ? [...acc, val] : acc;
console.log(reduce([2, 9, 3, 6, 7], reducerFilterMax(4),  [])) // [2, 3]
```

in questo caso la funzione 'reducerFilterMax' prende un parametro `maxVal` e  restituisce la funzione  funzione :
 `(acc, val) =>  val < maxVal ? [...acc, val] : acc;`

 maxVal viene in questo modo visto dalla funzione restituita nel suo test del valore : `val < maxVal` in quanto si trova nello stesso scope, cioè la visibilità delle variabili nel resto del codice, al di fuori della funzione maxVal come gli altri paramentri non esistono più e non vanno in collissione di nome.

 In questo modo scriviamo `reduce([2, 9, 3, 6, 7], reducerFilterMax(4),  []))` con `reducerFilterMax(4)` che restituisce la funzione del secondo `=>` con i parametri compatibili, ma che vede il parametro `maxVal`.

 La cosa importante da tenere a mente, è la compatibilità dei parametri, reduce prende una funzione con 2 parametri, e noi dobbiamo passare una funziomne con 2 paramentri compatibili.