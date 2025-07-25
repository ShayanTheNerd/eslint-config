function isEmptyString(value: unknown): boolean {
	return typeof value === 'string' && value.trim().length === 0;
}

export { isEmptyString };
