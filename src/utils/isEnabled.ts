function isEnabled<Type>(option: Type): option is Exclude<Type, boolean> {
  return Boolean(option);
}

export { isEnabled };
