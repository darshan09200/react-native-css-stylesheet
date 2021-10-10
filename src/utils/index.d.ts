export const regexTest: (regex: RegExp, str: string | number) => string[];
export const isNumber: (number: string | number) => boolean;
export const isValidPositiveNumber: (
	number: string | number,
	notNumberMsg?: string | undefined,
	shouldBePositiveMsg?: string | undefined
) => number;
