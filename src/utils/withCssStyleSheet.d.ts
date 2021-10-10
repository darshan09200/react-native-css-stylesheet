import { StyleSheet } from "react-native";

import type {
	ForwardRefExoticComponent,
	PropsWithoutRef,
	RefAttributes,
} from "react";

import type { FormattedCssStyleSheet } from "../types";

export interface WithCssStyleSheetProps {
	cssStyleSheet?: StyleSheet.NamedStyles<any>;
}
export default function withCssStyleSheet<
	Style extends FormattedCssStyleSheet<any>,
	Component
>(
	style: Style,
	component: React.ComponentType<Component>
): ForwardRefExoticComponent<
	PropsWithoutRef<Omit<Component, keyof WithCssStyleSheetProps>> &
		RefAttributes<any>
>;
