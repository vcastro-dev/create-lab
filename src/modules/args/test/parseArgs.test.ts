import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { expectCode } from "../../../shared/test-helpers/expectCode.ts";
import {
	expectFailure,
	expectSuccess,
} from "../../../shared/test-helpers/result.ts";
import { UsageErrorCode } from "../errors.ts";
import { parseArgs } from "../parseArgs.ts";

test("fail when more than 2 args are provided", () => {
	const extra = ["rest"];
	const result = parseArgs(["http", "test", ...extra]);

	expectFailure(result);
	expectCode(result.error, UsageErrorCode.TooManyArgs);

	if (result.error.code === UsageErrorCode.TooManyArgs) {
		assert.deepEqual(result.error.extra, [...extra]);
	}
});

test("fail when kind is missing", () => {
	const result = parseArgs([]);

	expectFailure(result);
	expectCode(result.error, UsageErrorCode.MissingKind);
});

test("fail when name is missing", () => {
	const result = parseArgs(["http"]);

	expectFailure(result);
	expectCode(result.error, UsageErrorCode.MissingName);
});

test("fail when kind is invalid", () => {
	const result = parseArgs(["test", "lab"]);

	expectFailure(result);
	expectCode(result.error, UsageErrorCode.UnsupportedKind);
});

describe("fail when name is invalid", () => {
	const testCases = [
		{ title: "contains uppercase letter", name: "Test" },
		{ title: "contains blank space", name: "test test" },
		{ title: "starts with dot", name: ".test" },
		{ title: "starts with hyphen", name: "-test" },
		{ title: "starts with backslash", name: "\\test" },
		{ title: "contains a path separator", name: "test/test" },
		{ title: "is longer than 100 characters", name: "a".repeat(101) },
	];

	for (const { title, name } of testCases) {
		test(title, () => {
			const result = parseArgs(["http", name]);

			if (result.ok) {
				assert.fail(
					`\nexpected: failure \nreceived: ${JSON.stringify(result.value, null, 2)}`,
				);
			}

			expectCode(result.error, UsageErrorCode.InvalidName);
			assert.equal(result.error.received, name);
		});
	}
});

describe("accepts valid kind and name", () => {
	const testCases = [
		{
			args: ["http", "test"],
			expected: { kind: "http", name: "test" },
		},
		{
			args: ["http", "test-1"],
			expected: { kind: "http", name: "test-1" },
		},
		{
			args: ["http", "t"],
			expected: { kind: "http", name: "t" },
		},
	];

	for (const { args, expected } of testCases) {
		const [kind, name] = args;

		test(`name "${name}" and kind "${kind}"`, () => {
			const result = parseArgs(args);

			expectSuccess(result);
			assert.deepEqual(result.value, expected);
		});
	}
});
