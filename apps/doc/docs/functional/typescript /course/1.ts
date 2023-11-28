/* part 1

<https://dev.to/busypeoples/notes-on-typescript-type-level-programming-in-typescript-part-1-i57>
https://dev.to/busypeoples/notes-on-typescript-pick-exclude-and-higher-order-components-40cp
*/

type User = { id: number;name: string; title: string;}

type MakeReadOnly<T> = {readonly [key in keyof T ]: T[key]};
// Test MakeReadOnly
type ReadOnlyUser =  MakeReadOnly<User>;
type ReadOnlyUser2 =  Readonly<User>; // ts buld in

type MakePartial<T> = { [key in keyof T]?: T[key] };
type MakeRequired<T> = { [key in keyof T]-?: T[key] };
// buld in
type PartialUser = Partial<User>;
type RequiredUser = Required<PartialUser>;

type Profile = {id: number; title: string; url: string;}

export type MakeIntersect<T, U> = T extends U ? T: never;
export type MakeExclude<T, U> = U extends T ? never: U;
export type MakePick<T, Keys extends keyof T> = { [Key in Keys]: T[Key] };

type UserProfile = MakeIntersect<keyof User, keyof Profile>;
type NonExistentKeys = MakeExclude<keyof User, keyof Profile>;
type NewProfile = MakePick<Profile, "id" | "title">;

// build in
type NonExistentKeys2 = Exclude<keyof User, keyof Profile>;
type NewProfile2 = Pick<Profile, "id" | "title">;

// not build in
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type NewProfile3 = Omit<Profile, "title">;

// with react props

type Props = {name: string, a:number, b:boolean}
const props = {name: 'name', a:1, b:true}
type ExtractName = {name: string}

function removeName<Props extends ExtractName>(
    props: Props
  ): Pick<Props, Exclude<keyof Props, keyof ExtractName>> {
    const { name, ...rest } = props;
    // do something with name...
    return rest;
  }

const withNoName = removeName(props)
type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>;
type Diff<T, K> = Omit<T, keyof K>;

function removeName2<Props extends ExtractName>(
    props: Props
  ): Diff<Props, ExtractName> {
    const { name, ...rest } = props;
    // do something with name...
    return rest;
  }

const withNoName2 = removeName2(props)