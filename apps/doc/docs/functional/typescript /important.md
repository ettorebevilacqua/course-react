# important

domain drive design
https://khalilstemmler.com/

## to look for understand

### never

[](https://www.zhenghao.io/posts/ts-never)

To fully understand never type and its purposes, we must first understand what a type is, and what role it plays in a type system.

A type is a set of possible values. For example, string type represents an infinite set of possible strings.

Since there’s no values in the set, never type can never (pun-intended) have any value, including values of any type.

The fulfilled value's type of a rejected promise
const p = Promise.reject('foo') //  p: Promise< never >

## resurces

// esercitazione
[](https://github.com/type-challenges/type-challenges)

// good guide

[](https://dev.to/busypeoples/notes-on-typescript-type-level-programming-in-typescript-part-1-i57)

[](https://basarat.gitbook.io/typescript/type-system/discriminated-unions)

### Interfaces vs. Type Aliases

As we mentioned, type aliases can act sort of like interfaces; however, there are some subtle differences.

Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

### Indexed Access Types

```typescript
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

TypeScript now infers the prop function to have a return type of T[K], a so-called indexed access type or lookup type. It represents the type of the property K of the type T. If we now access the three todo properties via the prop method, each one will have the correct type:

For another real-world example, check out how the Object.entries() method is typed in the lib.es2017.object.d.ts type declaration file that ships with the TypeScript compiler:

```typescript
interface ObjectConstructor {
  // ...
  entries<T extends { [key: string]: any }, K extends keyof T>(
    o: T,
  ): [keyof T, T[K]][];
  // ...
}
```

### the unknown type

[](https://mariusschulz.com/blog/the-unknown-type-in-typescript)

### Decoding JSON with Typescript

[](https://codesandbox.io/s/fp-ts-react-o5t7m?file=/src/index).

### Passing Generics to JSX Elements

[](https://mariusschulz.com/blog/passing-generics-to-jsx-elements-in-typescript)

### Const Assertions in Literal Expressions

[](https://mariusschulz.com/blog/const-assertions-in-literal-expressions-in-typescript)

### the omit helper

[](https://mariusschulz.com/blog/the-omit-helper-type-in-typescript)

### Nullish Coalescing: The ?? Operator

[](https://mariusschulz.com/blog/nullish-coalescing-the-operator-in-typescript)

[](https://mariusschulz.com/blog/assertion-functions-in-typescript)

read :
[](https://www.typescriptlang.org/docs/handbook/mixins.html)
[](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)