import { createUnionValidator } from "../../shared/createUnionValidator.ts";
import { supportedKind } from "./types.ts";

export const isValidKind = createUnionValidator(supportedKind);

const regex = /^[a-z0-9][-a-z0-9]{0,99}$/;
export const isValidName = (name: string) => {
	return regex.test(name);
};
