import type {
	ImageStyle,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from "react-native";

type CustomViewStyle = {
	borderBottomEndRadius?: string | number;
	borderBottomLeftRadius?: string | number;
	borderBottomRightRadius?: string | number;
	borderBottomStartRadius?: string | number;
	borderBottomWidth?: string | number;
	borderLeftWidth?: string | number;
	borderRadius?: string | number;
	borderRightWidth?: string | number;
	borderTopEndRadius?: string | number;
	borderTopLeftRadius?: string | number;
	borderTopRightRadius?: string | number;
	borderTopStartRadius?: string | number;
	borderTopWidth?: string | number;
	borderWidth?: string | number;
};
type CustomTextStyle = {
	fontSize?: string | number;
	letterSpacing?: string | number;
	lineHeight?: string | number;
	textShadowRadius?: string | number;
};
export type Styles =
	| CustomViewStyle
	| CustomTextStyle
	| ViewStyle
	| TextStyle
	| ImageStyle;
export type NamedStyles = {
	[key: string]: Styles;
};
export type ResponsiveNamedStyles = {
	[key: string]: Styles | NamedStyles;
};
export type Error = {
	msg?: string;
};
export type FormattedCssStyleSheet<T> = () => StyleSheet.NamedStyles<T>;
