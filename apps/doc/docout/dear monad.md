
# Very Gentle Introduction to Monads

## Let's start with the challenging part.

The concept of monads is generally difficult to grasp, and in this article, we aim to simplify the explanation as much as possible. Typically, this topic is covered after explaining various basic concepts of functional programming, such as pure functions, currying, and the underlying theory.

Here, we aim to get to the point, avoiding excessive theory. Once you've used some code, the concept becomes less daunting. In many cases, to use them as we do with promises, you don't need much theory – it's useful if you want to delve deep into functional programming and build stronger skills.

One of the significant challenges in functional programming is the habit of imperative programming. Those accustomed to it often find it a bit more challenging due to this habit. For example, if I say to use only constant variables, as we'll see here, the initial thought might be that this approach is impossible because programming requires variables that change values.

## Containers

The pot, the plate, the tray, the laundry basket – what do they have in common? They are containers; their purpose is to contain something, no matter what. If I put clothes in the pot and food in the washing machine, functionally speaking, they don't change their purpose; they always function as containers.

To use what they contain, I must open the washing machine, lift the lid, eat what's in the plate – without these actions, they are useless.

In functional programming, we have containers, often challenging to understand. But sticking to the analogy, they serve to contain a value. To use it, I need to insert it where needed, do something inside the container, and open it to retrieve the value.

### Promises

An example of this concept familiar in JavaScript is the promise, which acts as a container for values:

```javascript
const myPromise = new Promise((resolve, reject) => {
    const startTime = Date.now();
    console.log('start promise ');
    setTimeout(() => {
        console.log('resolve promise in ms ', Date.now() - startTime);
        resolve(64);
    }, 300);
});

const newPromiseOfHalf = myPromise.then(num => num / 2);
// Prints the definition of the promise ([object Promise]), not the value 5.
console.log('promise =', myPromise.toString());
// Here, it prints the value 5.
newPromiseOfHalf.then(ris => console.log('result = ', ris));
```

Inside new Promise, we placed a value that is populated after a delay, as promises are designed to handle future values. However, if we try to print it, we get its definition as a container, similar to seeing the pot without knowing its contents.

What matters is that we need to pass a function to visualize the value:

***newPromiseOfHalf.then(ris => console.log(ris));***

This is like saying, I don't eat the pot or the plate because they contain food; similarly, I don't wear the laundry basket because it contains clothes – I have to open them to use their contents.

### The initial difficulty of promises

Promises are a bit challenging to understand at first, but we use them seamlessly even if we don't know the implementation details. Similarly, in functional programming, the concept of monads can be initially challenging to comprehend. What's the problem?

***It's the mental habit*** reasoning as we learned to program, imperatively, with a linear sequence of instructions. Similarly, arrays with map and reduce functions behave like containers, just like promises.

Let's start with an example:

```javascript
const myPromise = Promise.resolve(64); // promise contains the value 64

const divide = num => num / 2;
myPromise
    .then(divide) // 32
    .then(divide) // 16
    .then(divide) // 8
    .then(num => console.log('the result is', num)); // 8
```

Here, we are chaining then functions, which are like containers (map) in functional programming. They take a function and apply it to the INTERNAL value of the container (in this case, the value inside myPromise). Let's see how I defined map:

```javascript
map: f => Container(f(x)),
The map function takes a function f and returns a new container with f(x). It applies the function to the value of the container and returns a new container. This is similar to what we did with promises.

However, this code is not very useful; it's just more verbose for a series of transformations on a string. In promises, the initial lack of a container's value justifies this approach. Here, we initialize Container values.

The Maybe Monad:
Now, let's look at another type of container, which is more useful: the Maybe monad.

```javascript
const isNullOrUndefined = value => value === null || typeof value === "undefined";

const maybe = value => ({
    isNothing: () => isNullOrUndefined(value),
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
Things have changed a bit compared to the Container with map. The first maybe now returns isNothing and extract:

```javascript
const maybe = value => ({
    isNothing: () => isNullOrUndefined(value),
    extract: () => value
});
This code returns a boolean indicating whether the value is null or not. We no longer have map (for now), only this evaluation. Without it, we cannot access the internal value, so we use extract to use it.

Later on, it's redefined with the name Maybe but with a capital "M":

```javascript
const Maybe = {
    just: maybe,
    nothing: () => maybe(null)
};
Note that just and nothing always return the same type of container, in this case, maybe. In promises, they always return the Promise type, allowing for concatenation.

Just returns a new instance of maybe ready to contain a value in its constructor. Nothing, on the other hand, returns a function with no parameters. Inside, it creates a maybe with a null value, representing the absence of values, as its name suggests.

Here's an example of their usage:

```javascript
const maybeNumberOne = Maybe.just("a value");
const maybeNumberTwo = Maybe.nothing();
As we can see, just takes a value, and nothing takes none. We can then check if the maybe is nothing:

```javascript
console.log("Maybe.just is nothing?", maybeNumberOne.isNothing());
For now, maybe only tells us if the inserted value is null or not, from the English "May be = might be." However, this code is not very useful. Let's redefine it as a container by adding a map function, making it more valuable.

Map function in containers:
As mentioned before, promises are containers with then acting as a container with a map function, applied using a series of functions.

Containers have other features, which we'll explain by adding more capabilities. Before we continue, it's important to point out that we'll keep things simple.

```javascript
const map = (f, container) => container.map(f);
const divide = num => num / 2;

const maybeNumberOne = Maybe.just(64).map(divide);
const maybeNumberTwo = Maybe.nothing().map(divide);

console.log(maybeNumberOne.extract()); // 32
console.log(maybeNumberTwo.extract()); // null
Here, map applies the divide function to the internal value of maybeNumberOne, which contains 64. The result is a new instance of maybe with the value 32, as the value inside is divided by 2.

On the other hand, maybeNumberTwo is Nothing, meaning there is no value inside. If we try to map over it, nothing happens; the function is not applied:

```javascript
console.log(maybeNumberTwo.extract()); // null
If you don't extract the value using extract, you'll still get an object containing the maybe and its internal value. But extract is the key to removing the value from the container. It's a bit like opening the washing machine or the pot to use their contents.

But let's say that instead of Nothing, we wanted an error message to understand why a value is not present. Here is an implementation:

```javascript
const maybe = value => ({
    isNothing: () => isNullOrUndefined(value),
    extract: () => value,
    map: f => (isNullOrUndefined(value) ? Maybe.nothing() : Maybe.just(f(value)))
});

console.log(
    Maybe.nothing()
        .map(divide)
        .map(divide)
        .map(divide)
        .extract()
); // null
Now, map verifies if the maybe is nothing. If it is, it returns Nothing, meaning there's no value to process. If it's something, it applies the function and returns a new instance of maybe.

This way, we have a Maybe that behaves like a container. If we had used promises, we would have used then. The advantage is that this container can be used like promises or other containers:

```javascript
const myPromise = Promise.resolve(64); // promise contains the value 64

const divide = num => num / 2;
myPromise
    .then(divide) // 32
    .then(divide) // 16
    .then(divide) // 8
    .then(num => console.log('the result is', num)); // 8

const maybeNumberOne = Maybe.just(64).map(divide);
console.log(maybeNumberOne.extract()); // 32
The concept is similar, but promises are meant for asynchronous operations, while the Maybe monad is meant for synchronous operations, giving us more control.

The Either Monad:
Now, let's take a look at the Either monad. Maybe is excellent for handling the absence of values, but sometimes we want to know more about the reason why something failed. This is where Either comes in handy.

Let's take a simple example of dividing two numbers:

```javascript
const divide = (numerator, denominator) => {
    if (denominator === 0) {
        return Either.left("Cannot divide by zero");
    }
    return Either.right(numerator / denominator);
};

const result = divide(10, 2);
console.log(result.isLeft()); // false
console.log(result.extract()); // 5
Here, divide returns an Either instance. If the denominator is 0, it returns a left instance, indicating an error with a message. If the division is successful, it returns a right instance with the result.

The usage of isLeft and extract is similar to Maybe. If the result is a left, isLeft returns true, and extract returns the error message. If it's a right, isLeft returns false, and extract returns the result.

This way, we can use Either to represent success or failure with an associated error message.

Conclusion:
In conclusion, monads are a way to structure code, making it more modular and composable. They provide a consistent interface for working with different types of containers and handling both synchronous and asynchronous operations.

Understanding monads requires a shift in mindset, moving from imperative to functional programming paradigms. Once you grasp the core concepts and see practical examples, you'll find that monads become a powerful tool in your programming arsenal.

In this article, we introduced the Maybe and Either monads, showing how they can be used to handle the absence of values and represent success or failure with an error message, respectively. We also briefly touched on promises, which act as monads for handling asynchronous operations.

We hope this article has provided a clear and practical introduction to monads, making them more approachable for developers looking to enhance their functional programming skills. Remember, practice is key, so don't hesitate to experiment with monads in your code and explore their full potential. Happy coding!