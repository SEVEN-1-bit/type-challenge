/**
 * T['type'] ε T extends { type: infer U } ηεΊε«
 */
type LookUp<T, K extends string> = T extends { type: infer U }
  ? U extends K
    ? T
    : never
  : never;
