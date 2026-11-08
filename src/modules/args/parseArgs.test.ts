import assert from "node:assert/strict";
import test from "node:test";
import { UsageErrorCode } from "./errors.ts";
import { parseArgs } from "./parseArgs.ts";

test("throws an error when more than 2 args are provided", () => {
	const extra = ["rest"];
	const result = parseArgs(["http", "test", ...extra]);

	if (result.ok) {
		assert.fail("expected failure");
	}

	assert.equal(result.error.code, UsageErrorCode.TooManyArgs);

	if (result.error.code === UsageErrorCode.TooManyArgs) {
		assert.deepEqual(result.error.extra, [...extra]);
	}
});

test("throws an error when kind is missing", () => {
	const result = parseArgs([]);

	if (result.ok) {
		assert.fail("expected failure");
	}
	assert.equal(result.error.code, UsageErrorCode.MissingKind);
});

test("throws an error when name is missing", () => {
	const result = parseArgs(["http"]);

	if (result.ok) {
		assert.fail("expected failure");
	}
	assert.equal(result.error.code, UsageErrorCode.MissingName);
});

test("throws an error when kind is invalid", () => {
	const result = parseArgs(["test", "lab"]);

	if (result.ok) {
		assert.fail("expected failure");
	}
	assert.equal(result.error.code, UsageErrorCode.UnsupportedKind);
});

test("accepts valid kind and name", () => {
	const result = parseArgs(["http", "test"]);

	if (!result.ok) {
		assert.fail("expected success");
	}

	assert.deepEqual(result.value, { kind: "http", name: "test" });
});
