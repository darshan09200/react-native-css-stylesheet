import { Dimensions } from "react-native";

import { isValidPositiveNumber, regexTest } from "./utils";

export const sizeRegex =
	/^(?:(?:(\d+(?:\.\d+)?){1}((?:(mv?s)+(0*(?:\.\d+)|1(\.0+)){1}){1}|s|vs|px)?)|(?:(100|\d\d?(?:\.\d+)?){1}(rem|vh|vw|vmin|vmax)))$/;

const getHeight = () => Dimensions.get("window").height;
const getWidth = () => Dimensions.get("window").width;

const getShortDimension = () => {
	return Math.min(getWidth(), getHeight());
};
const getLongDimension = () => {
	return Math.max(getWidth(), getHeight());
};

// Default guideline sizes are based on standard ~5" screen mobile device
const defaultSize = {
	defaultFontSize: 16,
	guidelineBaseHeight: 600,
	guidelineBaseWidth: 350,
};

export const scale = (size: string | number): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	return (
		(getShortDimension() / defaultSize.guidelineBaseWidth) * formattedSize
	);
};
export const verticalScale = (size: string | number): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	return (
		(getLongDimension() / defaultSize.guidelineBaseHeight) * formattedSize
	);
};

export const moderateScale = (
	size: string | number,
	factor: string | number = 0.5
): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	const formattedFactor = isValidPositiveNumber(
		factor,
		"Factor should be a number.",
		"Factor should be greater than 0."
	);
	return (
		formattedSize + (scale(formattedSize) - formattedSize) * formattedFactor
	);
};

export const moderateVerticalScale = (
	size: string | number,
	factor: string | number = 0.5
): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	const formattedFactor = isValidPositiveNumber(
		factor,
		"Factor should be a number.",
		"Factor should be greater than 0."
	);
	return (
		formattedSize +
		(verticalScale(formattedSize) - formattedSize) * formattedFactor
	);
};

export const rem = (size: string | number): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	return formattedSize * defaultSize.defaultFontSize;
};

export const viewportMin = (size: string | number): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	return (formattedSize / 100) * getShortDimension();
};

export const viewportMax = (size: string | number): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	return (formattedSize / 100) * getLongDimension();
};

export const viewportHeight = (size: string | number): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);

	return (formattedSize / 100) * getHeight();
};

export const viewportWidth = (size: string | number): number => {
	const formattedSize = isValidPositiveNumber(
		size,
		"Size should be a number.",
		"Size should be greater than 0."
	);
	return (formattedSize / 100) * getWidth();
};

export const isValidSize = (size: string | number): boolean =>
	regexTest(sizeRegex, size).length > 0;

export const calculateSize = (size: string | number): string | number => {
	const splitSize = regexTest(sizeRegex, size);
	if (!splitSize || splitSize.length === 0) {
		throw new Error(`Size is not valid: ${size}`);
	}
	const extractedSize = parseFloat(splitSize[1]);
	let properties = splitSize.slice(2);
	if (properties.length > 1) {
		properties = properties.slice(1);
	}
	let calculatedSize: string | number = 0;
	switch (properties[0]) {
		case "s":
			calculatedSize = scale(extractedSize);
			break;
		case "vs":
			calculatedSize = verticalScale(extractedSize);
			break;
		case "ms":
			calculatedSize = moderateScale(extractedSize, properties[1]);
			break;
		case "mvs":
			calculatedSize = moderateVerticalScale(
				extractedSize,
				properties[1]
			);
			break;
		case "rem":
			calculatedSize = rem(extractedSize);
			break;
		case "vmin":
			calculatedSize = viewportMin(extractedSize);
			break;
		case "vmax":
			calculatedSize = viewportMax(extractedSize);
			break;
		case "vh":
			calculatedSize = viewportHeight(extractedSize);
			break;
		case "vw":
			calculatedSize = viewportWidth(extractedSize);
			break;
		default:
			calculatedSize = properties[0]
				? extractedSize + (properties[0] || "")
				: extractedSize;
			break;
	}
	return calculatedSize;
};

// export const s = scale;
// export const vs = verticalScale;
// export const ms = moderateScale;
// export const mvs = moderateVerticalScale;
// export const vmin = viewportMin;
// export const vmax = viewportMax;
// export const vh = viewportHeight;

export const getCurrentOrientation = (): "landscape" | "portrait" => {
	const width = getWidth();
	const height = getHeight();
	return width > height ? "landscape" : "portrait";
};

export const setGuidelineBaseDimensions = (
	guidelineBaseWidth = 0,
	guidelineBaseHeight = 0
): void => {
	const baseWidth = isValidPositiveNumber(
		guidelineBaseWidth,
		"Guideline Base Width should be a number.",
		"Guideline Base Width should be greater than 0."
	);
	const baseHeight = isValidPositiveNumber(
		guidelineBaseHeight,
		"Guideline Base Height should be a number.",
		"Guideline Base Height should be greater than 0."
	);
	defaultSize.guidelineBaseHeight = baseHeight;
	defaultSize.guidelineBaseWidth = baseWidth;
};

export const setDefaultFontSize = (
	defaultFontSize = 0,
	responsive: boolean
): void => {
	const fontSize = isValidPositiveNumber(
		defaultFontSize,
		"Default Font Size should be a number.",
		"Default Font Size should be greater than 0."
	);
	defaultSize.defaultFontSize = responsive ? scale(fontSize) : fontSize;
};

setDefaultFontSize(16, true);
