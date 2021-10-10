# react-native-css-stylesheet

Create responsive design with the help of css queries

## Installation

```bash
npm install react-native-css-stylesheet
```

## Usage

Define styles using [`CssStyleSheet.create()`](#create-styles) instead of `StyleSheet.create()`

```js
import React from "react";
import { Text, View } from "react-native";

import CssStyleSheet from "react-native-css-stylesheet";

const Example = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Example</Text>
		</View>
	);
};

const { styles } = CssStyleSheet.create({
	text: {
		"(orientation: landscape)": {
			fontSize: "3rem",
		},
		fontSize: "2rem",
		marginVertical: 20,
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});
```

## Styling Options

### Size with custom units

| Unit                | Description                                                                                             | Example            |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ------------------ |
| `<size>s`           | scales `size` in a linear manner relative to screen width                                               | `7.5s`             |
| `<size>vs`          | scales `size` in a linear manner relative to screen height                                              | `9vs`              |
| `<size>ms<factor>`  | scales `size` in a linear manner relative to screen width. `factor` is resize factor. Default is `0.5`  | `7ms` or `7ms0.25` |
| `<size>mvs<factor>` | scales `size` in a linear manner relative to screen height. `factor` is resize factor. Default is `0.5` | `9ms` or `9ms0.75` |
| `<size>rem`         | size relative to the default font size                                                                  | `1rem`             |
| `<size>vw`          | size relative to the window width                                                                       | `1.02vw`           |
| `<size>vh`          | size relative to the window height                                                                      | `10vh`             |
| `<size>vmin`        | size relative to the shortest dimension compared between window width and height                        | `10vmin`           |
| `<size>vmax`        | size relative to the largest dimension compared between window width and height                         | `10vmax`           |

> **Note:**
>
> 1. `size` can be any positive number (including decimal) for `s`, `vs`, `ms`, and `mvs`
> 2. `size` can be any positive number ranging from 0 to 100 (including decimal) for `rem`, `vw`, `vh`, `vmin`, and `vmax`
> 3. `factor` can be any positive number ranging from 0 and 1 (including decimal)

### Queries

| Query                    | Supported Values                                 | Description                                                | Example                                                          |
| ------------------------ | ------------------------------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| `(orientation: <value>)` | `portrait` or `landscape`                        | Matches the orientation with the provided value            | 1. `(orientation: landscape)` <br/> 2. `(orientation: portrait)` |
| `(min-width: <value>)`   | [custom size](#size-with-custom-units) or number | Matches the minimum window width with the provided value.  | 1. `(min-width: 320)` <br/> 2. `(min-width: 10s)`                |
| `(max-width: <value>)`   | [custom size](#size-with-custom-units) or number | Matches the maximum window width with the provided value.  | 1. `(max-width: 600)` <br/> 2. `(max-width: 10rem)`              |
| `(min-height: <value>)`  | [custom size](#size-with-custom-units) or number | Matches the minimum window height with the provided value. | 1. `(min-height: 600)` <br/> 2. `(min-height: 15vs)`             |
| `(max-height: <value>)`  | [custom size](#size-with-custom-units) or number | Matches the maximum window height with the provided value. | 1. `(max-height: 1200)` <br/> 2. `(max-height: 25mvs0.75)`       |

> **Note:**
>
> 1. Brackets around queries are compulsory.
> 2. Any [custom size](#size-with-custom-units) defined in the above section will work, but using units like `vw`, `vh`, `vmin`, or `vmax` would always result in true since they are relative to the window with and height.

#### Grouping Queries

| Keyword               | Description                                                                                      | Example                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `<query> and <query>` | Applies the styles if queries preceding and succeeding to the keyword `and` is true.             | `(orientation: landscape) and (min-width:320)`                                                  |
| `<query> , <query>`   | Applies the styles if either of the queries preceding and succeeding to the keyword `,` is true. | `(min-height: 600) , (min-width:320)`                                                           |
| `(<queries>)`         | Create group of queries if you have more than one conditional keyword                            | `((orientation: landscape) and (min-width:320)),((orientation: portrait) and (min-height:600))` |

## API

### `create (styles)`

A function which returns computed styles on the basis of media queries specified.

#### Arguments

1. `styles` (_object_) : A style object either the normal or with custom properties and queries.

#### Return

-   `cssStyleSheet` (_object_)

    -   `styles` (_object_): A style object which is generated during application start. See basic [example](#usage) above.

    -   `responsiveStyles` (_Function_): A function to regenerate the styles during run time. When used inside a component, it will generate a new style object every time the component updates. See [example](#example) below.

#### Example

```js
import React from "react";
import { Text, View } from "react-native";

import CssStyleSheet from "react-native-css-stylesheet";

const Example = () => {
	const styles = responsiveStyles();
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Example</Text>
		</View>
	);
};

const { responsiveStyles } = CssStyleSheet.create({
	text: {
		"(orientation: landscape)": {
			fontSize: "3rem",
		},
		fontSize: "2rem",
		marginVertical: 20,
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});
```

### useCssStyleSheet (responsiveStyles)

Hook which returns recalculated styles every time there is a dimension change.

#### Arguments

1. `responsiveStyles` (_Function_) : `responsiveStyles` function returned from [`create`](#create-styles) function.

#### Return

-   `styles` (_object_): An object which is recalculated every time dimension change happens. See example below.

#### Example

```js
import React from "react";
import { Text, View } from "react-native";

import CssStyleSheet, { useCssStyleSheet } from "react-native-css-stylesheet";

const ResponsiveFunctionExample = () => {
	const styles = useCssStyleSheet(responsiveStyles);
	return (
		<View style={styles.container}>
			<Text style={styles.text}>ResponsiveFunctionExample</Text>
		</View>
	);
});

const { responsiveStyles } = CssStyleSheet.create({
	text: {
		"(orientation: landscape)": {
			fontSize: "3rem",
		},
		fontSize: "2rem",
		marginVertical: 20,
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});

export default ResponsiveFunctionExample;

```

### withCssStyleSheet (responsiveStyles, Component)

Link a style sheet with a component using the higher-order component pattern. It does not modify the component passed to it; instead, it returns a new component with a `cssStyleSheet` prop. This prop contains the responsive style object which gets recalculated every time there is a dimension change detected. This props can be used as a normal style object.

-   It adds a `cssStyleSheet` prop.
-   It forwards refs to the inner component.

#### Arguments

1. `responsiveStyles` (_Function_) : `responsiveStyles` function returned from [`create`](#create-styles) function.

2. `Component` (_React Element_) : The component that will be wrapped

#### Return

-   `Component` (_React Element_): The new component created.

#### Example

```js
import React from "react";
import { Text, View } from "react-native";

import CssStyleSheet, { withCssStyleSheet } from "react-native-css-stylesheet";

class ClassWithoutStyleSheet extends React.Component {
	render() {
		const { cssStyleSheet } = this.props;
		return (
			<View style={cssStyleSheet.container}>
				<Text style={cssStyleSheet.text}>ResponsiveClassExample</Text>
			</View>
		);
	}
}

const { responsiveStyles } = CssStyleSheet.create({
	text: {
		"(orientation: landscape)": {
			fontSize: "3rem",
		},
		fontSize: "2rem",
		marginVertical: 20,
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});

const ResponsiveClassExample = withCssStyleSheet(responsiveStyles, ClassWithoutStyleSheet);

export default ResponsiveClassExample;

/**
 * OR
 * export default withCssStyleSheet(responsiveStyles, ClassWithoutStyleSheet);
 */
```

<!-- ## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow. -->

## Todo

-   [ ] Add Examples screenshot/gif
-   [ ] Nested queries support
-   [ ] Platform based media queries

## License

[MIT](LICENSE)
