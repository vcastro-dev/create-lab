import { fail } from "node:assert/strict";
import type { Failure, Result, Success } from "./result.ts";

export function expectFailure<T, E>(
	result: Result<T, E>,
): asserts result is Failure<E> {
	if (result.ok) {
		const { value } = result;
		fail(`\nexpected: failure \nreceived: ${JSON.stringify(value, null, 2)}`);
	}
}

export function expectSuccess<T, E>(
	result: Result<T, E>,
): asserts result is Success<T> {
	if (!result.ok) {
		const { error } = result;
		fail(`\nexpected: success \nreceived: ${JSON.stringify(error, null, 2)}`);
	}
}
