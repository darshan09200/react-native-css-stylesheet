/* eslint-disable max-classes-per-file */
import * as React from "react";
import { Text, View } from "react-native";

import CssStyleSheet from "react-native-css-stylesheet";

export const FunctionExample = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.box}>FunctionExample</Text>
		</View>
	);
};

export class ClassExample extends React.Component {
	render(): JSX.Element {
		return (
			<View style={styles.container}>
				<Text style={styles.box}>ClassExample</Text>
			</View>
		);
	}
}
const { styles } = CssStyleSheet.create({
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
