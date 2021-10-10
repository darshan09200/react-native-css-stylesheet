import { Dimensions, StyleSheet } from "react-native";

import {
	calculateSize,
	getCurrentOrientation,
	isValidSize,
} from "./calculations";
import { regexTest } from "./utils";

const isResponsiveKey =
	/^.*(?:\(|\)|min-|max-|-width|-height|orientation|landscape|portrait).*$/;
const styleRegex =
	/^\(\s*(?:(?:(?:(min|max)-(width|height)):\s*(.*))|(orientation):\s*(landscape|portrait))\s*\)$/;
// const groupRegex = /(?<=\))(?:\s*(?:,)\s*)(?=\()/g;
// const queryRegex = /(?<=\))(?:\s*(?:and)\s*)/g;
const groupRegex = /\)(?:\s*(?:,)\s*)\(/g;
const queryRegex = /\)(?:\s*(?:and)\s*)/g;

const extractGroups = (styleKey: string): string[] => {
	const groups = styleKey.split(groupRegex);
	if (groups && groups.length > 0) {
		for (let i = 0; i < groups.length; i += 1) {
			if (i > 0) {
				groups[i] = `(${groups[i]}`;
			}
			if (i < groups.length - 1) {
				groups[i] = `${groups[i]})`;
			}
		}
	}
	return groups;
};
const extractQuery = (group: string): string[] => {
	const queries = group.split(queryRegex);
	if (queries && queries.length > 0) {
		for (let i = 0; i < queries.length; i += 1) {
			if (i < queries.length - 1) {
				queries[i] = `${queries[i]})`;
			}
		}
	}
	return queries;
};

const validateAndExtract = (styleCondition) => {
	const styleKey = styleCondition?.toLowerCase()?.trim();
	const error = {};
	const results = [];
	if (!styleKey || styleKey.length === 0) {
		error.msg = "String is required";
	} else if (styleKey.startsWith("(") && styleKey.endsWith(")")) {
		const groups = extractGroups(styleKey);
		for (let i = 0; i < groups.length; i += 1) {
			const group = groups[i];
			const groupResults = [];
			const queries = extractQuery(group);
			const conditions = [];
			let breakFlag = false;
			for (let j = 0; j < queries.length; j += 1) {
				const query = queries[j];
				if (query && query.length > 0) {
					const queryResult = regexTest(styleRegex, query);
					if (queryResult && queryResult.length > 0) {
						let condition = queryResult[1];
						if (queryResult.length > 3) {
							condition += `-${queryResult[2]}`;
						}
						const common = conditions.indexOf(condition);
						if (common > -1) {
							error.msg = `One group query cannot contain two condition for ${condition}: "${group}`;
							breakFlag = true;
							break;
						} else {
							conditions.push(condition);
						}

						if (queryResult.length > 3) {
							const size = queryResult[3];
							if (!isValidSize(size)) {
								error.msg = `Invalid Size: "${size}"`;
								breakFlag = true;
								break;
							}
						}
					} else {
						error.msg = `Invalid Query: "${query}"`;
						breakFlag = true;

						break;
					}
					groupResults.push(queryResult);
				}
			}
			if (breakFlag) {
				break;
			}
			results.push(groupResults);
		}
	} else {
		const illegalPre = styleKey.slice(0, styleKey.indexOf("("));
		const illegalPost = styleKey.slice(styleKey.lastIndexOf(")") + 1);
		const illegal = illegalPre || illegalPost;
		error.msg = `Illegal Character(s): "${illegal}" in query: "${styleKey}""`;
	}
	return { error, results };
};

export const isStyleActive = (styleCondition) => {
	const { results = [], error = {} } =
		validateAndExtract(styleCondition) || {};
	let flag = false;
	if (
		error &&
		Object.keys(error).length === 0 &&
		results &&
		results.length > 0
	) {
		for (let i = 0; i < results.length; i += 1) {
			const group = results[i];
			let isGroupActive = true;
			for (let j = 0; j < group.length; j += 1) {
				const query = group[j];
				const condition = query[1];
				let value = query[2];
				const dimension = query[2];
				if (query.length > 3) {
					value = query[3];
				}
				if (
					condition === "orientation" &&
					value === getCurrentOrientation()
				) {
					isGroupActive = isGroupActive && true;
				} else if (
					(condition === "min" || condition === "max") &&
					(dimension === "height" || dimension === "width")
				) {
					const currentDimension =
						Dimensions.get("window")[dimension];
					const calculatedSize = calculateSize(value);
					if (condition === "min") {
						isGroupActive =
							isGroupActive && currentDimension >= calculatedSize;
					} else {
						isGroupActive =
							isGroupActive && currentDimension < calculatedSize;
					}
				} else {
					isGroupActive = isGroupActive && false;
				}
				if (!isGroupActive) {
					break;
				}
			}
			if (isGroupActive) {
				flag = true;
				break;
			}
		}
	}
	return { error, flag };
};

export const formatStyles = (style) => {
	const styleKey = Object.keys(style);
	const formattedStyle = {};
	for (let i = 0; i < styleKey.length; i += 1) {
		const styleProperty = styleKey[i];
		const styleValue = style[styleProperty];
		const size = styleValue;
		if (isValidSize(size)) {
			const calculatedSize = calculateSize(size);
			formattedStyle[styleProperty] = calculatedSize;
		} else {
			formattedStyle[styleProperty] = styleValue;
		}
	}
	return formattedStyle;
};

function calculateStyles(styles) {
	const stylesKey = Object.keys(styles);
	const finalStyles = {};
	for (let i = 0; i < stylesKey.length; i += 1) {
		const key = stylesKey[i];
		const style = styles[key];
		const formattedStyle = {};
		let responsiveStyle = {};
		const styleKey = Object.keys(style);
		for (let j = 0; j < styleKey.length; j += 1) {
			let insertedStyle = true;
			const styleProperty = styleKey[j];
			const stylePropertyResult = regexTest(
				isResponsiveKey,
				styleProperty
			);
			let styleValue;

			if (stylePropertyResult && stylePropertyResult.length > 0) {
				styleValue = style[styleProperty];
				if (
					typeof styleValue === "object" &&
					!Array.isArray(styleValue)
				) {
					const { flag, error } = isStyleActive(styleProperty);
					if (flag) {
						responsiveStyle = {
							...responsiveStyle,
							...styleValue,
						};
					} else if (error?.msg) {
						throw new Error(error?.msg || "Unknown error");
					}
					insertedStyle = false;
				}
			}
			if (insertedStyle) {
				styleValue = style[styleProperty];
				formattedStyle[styleProperty] = styleValue;
			}
		}
		finalStyles[key] = formatStyles({
			...formattedStyle,
			...responsiveStyle,
		});
	}
	return finalStyles;
}

export function create(styles) {
	const responsiveStyles = () => {
		const finalStyles = calculateStyles(styles);
		const stylesheet = StyleSheet.create(finalStyles);
		return stylesheet;
	};
	return {
		responsiveStyles,
		styles: responsiveStyles(),
	};
}

const CssStyleSheet = {
	...StyleSheet,
	create,
};

export default CssStyleSheet;
export * from "./calculations";
export { default as useCssStyleSheet } from "./utils/useCssStyleSheet";
export {
	default as withCssStyleSheet,
	WithCssStyleSheetProps,
} from "./utils/withCssStyleSheet";
