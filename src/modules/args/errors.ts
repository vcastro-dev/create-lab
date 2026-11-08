export const UsageErrorCode = {
    MissingKind: 'MISSING_KIND',
    MissingName: 'MISSING_NAME',
    UnsupportedKind: 'UNSUPPORTED_KIND',
    TooManyArgs: 'TOO_MANY_ARGS'
} as const

export type MissingKindError = {
    code: typeof UsageErrorCode.MissingKind
}

export type MissingNameError = {
    code: typeof UsageErrorCode.MissingName
}

export type UnsupportedKindError = {
    code: typeof UsageErrorCode.UnsupportedKind
    message: string
    received: string
}

export type TooManyArgsError = {
    code: typeof UsageErrorCode.TooManyArgs
    message: string
    extra: string[]
}

export type UsageError = 
    | MissingKindError
    | MissingNameError
    | UnsupportedKindError
    | TooManyArgsError