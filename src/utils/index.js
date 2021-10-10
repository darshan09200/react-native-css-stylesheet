export const regexTest = (regex: RegExp, str: string | number): string[] => {
	const results: string[] = [];
	const m = regex.exec(str);
	if (m !== null) {
		m.forEach((match) => {
			if (match && match.length > 0) {
				results.push(match.trim());
			}
		});
	}
	return results;
};

const numberRegex = /^\d+(?:\.\d+)?$/;
export const isNumber = (number: string | number): boolean =>
	regexTest(numberRegex, number).length > 0;

export const isValidPositiveNumber = (
	number: string | number,
	notNumberMsg?: string,
	shouldBePositiveMsg?: string
): number => {
	let formattedNumber = number;
	if (!isNumber(formattedNumber)) {
		throw new Error(`${notNumberMsg}\n Found: ${formattedNumber}`);
	} else {
		formattedNumber = parseFloat(formattedNumber);
	}
	if (formattedNumber <= 0) {
		throw new Error(
			`${shouldBePositiveMsg || notNumberMsg}\n Found: ${formattedNumber}`
		);
	}
	return formattedNumber;
};
