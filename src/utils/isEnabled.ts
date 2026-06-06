function isEnabled<T>(option: T): option is Exclude<T, boolean> {
  return Boolean(option);
}

export { isEnabled };
