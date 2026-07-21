type Truthy<Type> = Exclude<Type, false | 0 | '' | [] | null | undefined>;

function isTruthy<Type>(value: Type): value is Truthy<Type> {
  return Boolean(value);
}

export { isTruthy };
