type Tail<Tuple> = Tuple extends [unknown, ...(infer LastItems)] ? LastItems : never;

type DeepNonNullable<T> =
  T extends object
    ? T extends (...args: unknown[]) => unknown
      ? T
      : { [K in keyof T]-?: DeepNonNullable<NonNullable<T[K]>> }
    : NonNullable<T>;

export type { Tail, DeepNonNullable };
