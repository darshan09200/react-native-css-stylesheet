import React from "react";
import { Text, View } from "react-native";

import CssStyleSheet, {
	useCssStyleSheet,
	withCssStyleSheet,
	WithCssStyleSheetProps,
} from "react-native-css-stylesheet";

export const ResponsiveFunctionExample = React.memo((): JSX.Element => {
	const styles = useCssStyleSheet(responsiveStyles);
	return (
		<View style={styles.container}>
			<Text style={styles.box}>ResponsiveFunctionExample</Text>
		</View>
	);
});

class ClassWithoutStyles extends React.Component<WithCssStyleSheetProps> {
	render(): JSX.Element {
		const { cssStyleSheet } = this.props;
		return (
			<View style={cssStyleSheet.container}>
				<Text style={cssStyleSheet.box}>ResponsiveClassExample</Text>
			</View>
		);
	}
}

const { responsiveStyles } = CssStyleSheet.create({
	box: {
		"(orientation:landscape)and(min-width: 10)and (min-height: 50)": {
			fontSize: "28mvs0.5",
			width: "10rem",
		},
		"(orientation:portrait)and(min-width: 10)and (min-height: 50)": {
			fontSize: "12mvs0.5",
			width: "10rem",
		},
		marginVertical: 20,
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});

export const ResponsiveClassExample = withCssStyleSheet(
	responsiveStyles,
	ClassWithoutStyles
);
