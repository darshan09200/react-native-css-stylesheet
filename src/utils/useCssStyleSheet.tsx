import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import type { FormattedCssStyleSheet } from "../types";

export default function useCssStyleSheet<T>(
	responsiveStyles: FormattedCssStyleSheet<T>
): StyleSheet.NamedStyles<T> {
	const window = useWindowDimensions();
	const [newStyles, setNewStyles] = useState(responsiveStyles());
	useEffect(() => {
		setNewStyles(responsiveStyles());
	}, [window, responsiveStyles]);
	return newStyles;
}
