export const supportedKind = ["http"] as const;
export type Kind = (typeof supportedKind)[number];
