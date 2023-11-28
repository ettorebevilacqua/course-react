# Recap

essential :
[](https://github.com/pagopa/codemotion-workshop-fest-2022--fpts)

vedi railway programming a min 1:03 [](https://youtu.be/eCWqEUne9bw?t=3914)

Che cos'è un Data Type in fp-ts?
Possiamo immaginare un Data Type come una scatola che contiene il valore che stiamo elaborando. Implementa le regole algebriche che ne determinano la componibilità, quindi le caratteristiche con cui il nostro valore può essere combinato con altri oggetti.

Si può immaginare un Data Type come le forme dei pezzi di un puzzle: gli "innesti" sono determinati sia dal Data Type stesso che dal tipo del valore contenuto. Possiamo quindi combinare Data Type i cui "innesti" sono compatibili tra loro. Inoltre siamo obbligati ad utilizzare tutti gli "innesti" esposti da un Data Type.

data type

- Options
- Either
- taskEither operazione asincrona che può fallire

operazioni:

- is*
- from* costruire un data type da un valore o altro data type
- map trasformazione senza cambiare il sotto tipo
- chain trasformazione cambiando il sotto tipo
- fold per far convergere i 2 rami della computazione

### Operazione: chain

Anche chain applica delle trasformazioni al valore contenuto, ma a differenza di map può cambiare se il risultato sia istanza di Some o None. Si utilizza quando si vogliono mettere in serie due o più valori che potrebbero essere null-ish.

```ts
type Product = { name: string; price: number; };
const products = new Map<string, Product>();

const getFinalPrice = (productId: string): O.Option<string> =>
  pipe(
    productId,
    O.fromPredicate(s => s.length > 0), // Un altro smart constructor!
    O.chain(id => { 
        // qui ho un O.some se usassi map avrei sempre n some, ma in questo caso cambio la direzione eventuale, da some a none
        const product = products.get(id);
        return product ? O.some(product) : O.none;
        // o meglio: O.fromNullable(product)
    }),
    O.map(product => product.price),
    O.map(applyDiscount(35)),
    O.map(toRounded(2)),
    O.map(toEuro)
  );
```

## Folding

### Operazione: fold

Con questa operazione entrambi i "rami" dell'elaborazione (Some e None) vengono collassati in un unico ramo. Il risultato può essere un valore o un altro Data Type su cui lavorare. Un caso di utilizzo è quando si vuole di uscire dal contesto del Data Type per lavorare direttamente sul valore.

pipe(
   productId, 
   getFinalPrice,
   O.fold(
       () => "Cannot find product, sorry :(",
       price => `You will pay ${price}`
   ),
   console.log // Domanda: cosa scrive sul log?
)


By definition concat works with only two elements of A, what if we want to concat more elements?

The fold function takes a semigroup instance, an initial value and an array of elements:

```js
import { fold, semigroupSum, semigroupProduct } from 'fp-ts/Semigroup'

// const semigroupSum: Semigroup<number> = {concat: (x, y) => x + y}

const sum = fold(semigroupSum)
sum(0, [1, 2, 3, 4]) // 10

const product = fold(semigroupProduct)
product(1, [1, 2, 3, 4]) // 24
```

### Type Constructors and Kinds

List is an example of a type constructor. Values do not have the type List directly, but rather List a for some type a. That is, List takes a type argument a *** and constructs a new type List a.***

Note that just like function application, ***type constructors are applied to other types*** simply by juxtaposition: the type List Entry is, in fact, the type constructor List applied to the type Entry – it represents a list of entries.

```ts
// List is type constructor for type Entry
type List Entry
```

If we try to incorrectly define a value of type List (by using the type annotation operator ::), we will see a new type of error:

> import Data.List
> Nil :: List

this get this error :
In a type-annotated expression x :: t, the type t must have kind Type

kind = tipo , genere, specie, sorta

This is a kind error. Just like values are distinguished by their types, ***types are distinguished by their kinds***, and just like ill-typed values result in type errors, ill-kinded types result in kind errors.

***come i valori hanno il tipo, il tipo ha il suo genere o tipo del tipo detto kind***

There is a special kind called Type which represents the kind of all types which have values, like Number and String.

There are also kinds for type constructors. For example, the kind Type -> Type represents a function from types to types, just like List. So the error here occurred because values are expected to have types with kind Type, but List has kind Type -> Type.

***in haskell the kind Type -> Type is * -> ****

To find out the kind of a type, use the :kind command in PSCi. For example:

```text

> :kind Number
Type

> import Data.List
> :kind List
Type -> Type

> :kind List String
Type
```
