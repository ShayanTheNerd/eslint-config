type Tail<Tuple> = Tuple extends [unknown, ...(infer LastItems)] ? LastItems : never;

type DeepNonNullable<Type> =
  Type extends Function ? Type /* eslint-disable-line @typescript-eslint/no-unsafe-function-type */
    : Type extends object ? { [Key in keyof Type]-?: DeepNonNullable<NonNullable<Type[Key]>> }
      : NonNullable<Type>;

export type { Tail, DeepNonNullable };
