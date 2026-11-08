export function createUnionValidator<T extends string>(
	validValues: readonly T[],
) {
	return function isValid(value: string): value is T {
		return (validValues as readonly string[]).includes(value);
	};
}
