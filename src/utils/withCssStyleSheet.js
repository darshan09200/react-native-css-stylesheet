import React from "react";

import hoistNonReactStatics from "hoist-non-react-statics";

import getDisplayName from "./getDisplayName";
import useCssStyleSheet from "./useCssStyleSheet";

// react-native-responsive-screen
const withCssStyleSheet = (responsiveStyles, Component): React.ReactElement => {
	const WithStylesCssStyleSheet = React.forwardRef((props, ref) => {
		const cssStyleSheet = useCssStyleSheet(responsiveStyles);

		return <Component ref={ref} {...props} cssStyleSheet={cssStyleSheet} />;
	});

	if (process.env.NODE_ENV !== "production") {
		WithStylesCssStyleSheet.displayName = `WithStylesCssStyleSheet(${getDisplayName(
			Component
		)})`;
	}

	hoistNonReactStatics(WithStylesCssStyleSheet, Component);

	return WithStylesCssStyleSheet;
};

export default withCssStyleSheet;
