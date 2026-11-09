export const UsageErrorCode = {
	MissingKind: "MISSING_KIND",
	MissingName: "MISSING_NAME",
	UnsupportedKind: "UNSUPPORTED_KIND",
	TooManyArgs: "TOO_MANY_ARGS",
	InvalidName: "INVALID_NAME",
} as const;

export type MissingKindError = {
	code: typeof UsageErrorCode.MissingKind;
	message: string;
};

export type MissingNameError = {
	code: typeof UsageErrorCode.MissingName;
	message: string;
};

export type UnsupportedKindError = {
	code: typeof UsageErrorCode.UnsupportedKind;
	message: string;
	received: string;
};

export type TooManyArgsError = {
	code: typeof UsageErrorCode.TooManyArgs;
	message: string;
	extra: string[];
};

export type InvalidNameError = {
	code: typeof UsageErrorCode.InvalidName;
	message: string;
	received: string;
};

export type UsageError =
	| MissingKindError
	| MissingNameError
	| UnsupportedKindError
	| TooManyArgsError
	| InvalidNameError;
