/* oxlint-disable-next-line eslint-plugin-unicorn/prefer-native-coercion-functions */
function isEnabled<T>(option: T): option is Exclude<T, boolean> {
	return Boolean(option);
}

export { isEnabled };
