type ConObject<K extends string | symbol | number, V extends any> = {
  [Key in K]: V
}

type NestedObject<K extends string | symbol | number, V extends any, O extends Record<string | symbol | number, any>> =
  {
    [Key in keyof O]: O[Key] extends object ? NestedObject<K, V, O[K]> : ConObject<K, V>
  }

type TupleToNestedObject<T extends any[], U, O extends Record<PropertyKey, any> = {}, L = 0, Len = T['length']> =
  L extends 0 ? Len extends 0 ? U
  : T extends [infer K extends PropertyKey, ...infer R] ? TupleToNestedObject<R, U, ConObject<K, U>, [L]['length']>
  : never
  : Len extends 0 ? O
  : T extends [infer K extends PropertyKey, ...infer R] ? TupleToNestedObject<R, U, {
    [Key in keyof O]: O[Key] extends object ? Expand<NestedObject<K, U, O[Key]>> : {
      [Key2 in [K][number]]: U
    }
  }, [L]['length']> : O

// type TupleToNestedObject<T extends Array<unknown>, U> = T extends [
//   infer F,
//   ...infer Rest,
// ]
//   ? {
//     [key in F as F extends PropertyKey ? F : never]: TupleToNestedObject<
//       Rest,
//       U
//     >
//   }
//   : U

type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
type d = TupleToNestedObject<['a', 'b', 'c'], boolean>