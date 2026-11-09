import { err, ok, type Result, type Success } from "../../shared/result.ts";
import { type UsageError, UsageErrorCode } from "./errors.ts";
import type { Kind } from "./types.ts";
import { isValidKind, isValidName } from "./validators.ts";

type ParseArgsResult = Result<
	{
		name: string;
		kind: Kind;
	},
	UsageError
>;

export const parseArgs = ([
	kind,
	name,
	...extra
]: string[]): ParseArgsResult => {
	if (extra.length > 0) {
		return err({
			code: UsageErrorCode.TooManyArgs,
			message: "accepts at most 2 arg(s), received 3",
			extra,
		});
	}

	if (!kind) {
		return err({
			code: UsageErrorCode.MissingKind,
			message: "kind must be defined",
		});
	}

	if (!name) {
		return err({
			code: UsageErrorCode.MissingName,
			message: "name must be defined",
		});
	}

	if (!isValidKind(kind)) {
		return err({
			code: UsageErrorCode.UnsupportedKind,
			message: "unsupported kind",
			received: kind,
		});
	}

	if (!isValidName(name)) {
		return err({
			code: UsageErrorCode.InvalidName,
			message: "invalid name",
			received: name,
		});
	}

	return ok({
		kind,
		name,
	});
};
