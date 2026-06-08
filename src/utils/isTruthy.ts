type Truthy<Type> = Exclude<Type, 0 | '' | null | false | undefined>;

function isTruthy<Type>(value: Type): value is Truthy<Type> {
  return Boolean(value);
}

export { isTruthy };
