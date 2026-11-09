import { equal } from "node:assert/strict";

type CodedError = {
	code: string;
};

type ErrorWithCode<E, C> = Extract<
	E,
	{
		code: C;
	}
>;

export function expectCode<E extends CodedError, C extends E["code"]>(
	error: E,
	code: C,
): asserts error is ErrorWithCode<E, C> {
	equal(error.code, code);
}
