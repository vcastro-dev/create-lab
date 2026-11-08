import { createUnionValidator } from "../../shared/createUnionValidator.ts";
import { err, ok, type Result } from "../../shared/result.ts";
import { type UsageError, UsageErrorCode } from "./errors.ts";

const supportedKind = ["http"] as const;
export type Kind = (typeof supportedKind)[number];

const isValidKind = createUnionValidator(supportedKind);

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

	return ok({
		kind,
		name,
	});
};
