import * as React from "react";
import { View } from "react-native";

import CssStyleSheet, {
	withCssStyleSheet,
	WithCssStyleSheetProps,
} from "react-native-css-stylesheet";

import { ClassExample, FunctionExample } from "./Example";
import {
	ResponsiveClassExample,
	ResponsiveFunctionExample,
} from "./ResponsiveExample";

class SimpleExample extends React.Component<WithCssStyleSheetProps> {
	render(): JSX.Element {
		const { cssStyleSheet } = this.props;
		return (
			<View style={cssStyleSheet.container}>
				<ResponsiveClassExample />
				<ResponsiveFunctionExample />
				<ClassExample />
				<FunctionExample />
			</View>
		);
	}
}

const { responsiveStyles } = CssStyleSheet.create({
	container: {
		"(orientation: landscape)": {
			flexDirection: "row",
		},
		alignItems: "center",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
});

export default withCssStyleSheet(responsiveStyles, SimpleExample);
