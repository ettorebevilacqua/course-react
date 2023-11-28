interface Lens<S, A> {
    get(s: S): A,
    set(a: A, s: S): S
}

interface Street { num: number, name: string }
interface Address { city: string, street: Street }

const a1: Address =
    { city: 'london', street: { num: 23, name: 'high street' } }

const address: Lens<Address, Street> = {
    get: address => address.street,
    set: (street, address) => ({ ...address, street })
}

address.get(a1) // => {num: 23, name: "high street"}
address.set({ num: 23, name: 'main street' }, a1) // => {city: "london", street: {num: 23, name: "main street"}}
address.get(a1) // => {num: 23, name: "high street"}
address.set({ num: 23, name: 'main street' }, a1) // => {city: "london", street: {num: 23, name: "main street"}}

const street: Lens<Street, string> = {
    get: street => street.name,
    set: (name, street) => ({ ...street, name })
}
street.get({ num: 23, name: 'high street' }) // i cant pass andress

function composeLens<A, B, C>(ab: Lens<A, B>, bc: Lens<B, C>): Lens<A, C> {
    return {
        get: a => bc.get(ab.get(a)),
        set: (c, a) => ab.set(bc.set(c, ab.get(a)), a)
    }
}

const streetName = composeLens(address, street)
streetName.get(a1) // => "high street"
streetName.set('main street', a1) // => {city: "london", street: {num: 23, name: "main street"}}

function overLens<S, A>(lens: Lens<S, A>, f: (a: A) => A, s: S): S {
    return lens.set(f(lens.get(s)), s)
}

function capitalize(s: string): string {
    return s.substring(0, 1).toUpperCase() + s.substring(1)
}

overLens(streetName, capitalize, a1)
// => {city: "london", street: {num: 23, name: "High street"}}

export default function LensPage() {
    return <div>
        Lens
    </div>

}