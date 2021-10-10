module.exports = {
	env: {
		browser: true,
		// "jest/globals": true,
		es6: true,
		node: true,
	},
	extends: [
		"airbnb",
		"eslint:recommended",
		"prettier",
		"plugin:prettier/recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/typescript",
	],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			plugins: ["@typescript-eslint"],
			rules: {
				"react/prop-types": "off",
			},
			settings: {
				"import/resolver": {
					node: {
						extensions: [".ts", ".tsx", ".js", ".jsx"],
					},
				},
			},
		},
	],
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: "2021",
		sourceType: "module",
	},
	plugins: [
		"simple-import-sort",
		"import",
		"sort-keys-fix",
		"jest",
		"prettier",
		"react-hooks",
		"@typescript-eslint",
		"react",
	],
	rules: {
		"@typescript-eslint/ban-types": [
			"error",
			{
				extendDefaults: true,
				types: {
					object: false,
					"{}": false,
				},
			},
		],
		"@typescript-eslint/no-var-requires": "off",
		"array-bracket-newline": "off",
		"class-methods-use-this": "off",
		"consistent-return": "off",
		"import/extensions": "off",
		"import/no-dynamic-require": "off",
		"import/no-extraneous-dependencies": "off",
		"import/no-unresolved": "error",
		"import/order": "error",
		"import/prefer-default-export": "off",
		indent: "off",
		"jsx-a11y/click-events-have-key-events": "off",
		"jsx-a11y/no-noninteractive-element-interactions": "off",
		"linebreak-style": "off",
		"lines-around-comment": [
			"error",
			{
				afterBlockComment: false,
				afterLineComment: false,
				allowArrayEnd: true,
				allowArrayStart: true,
				allowBlockEnd: true,
				allowBlockStart: true,
				allowObjectEnd: true,
				allowObjectStart: true,
				beforeBlockComment: false,
				beforeLineComment: false,
			},
		],
		"multiline-ternary": ["off", "always"],
		"no-mixed-spaces-and-tabs": "off",
		"no-multi-spaces": "warn",
		"no-nested-ternary": "off",
		"no-restricted-syntax": ["error", "WithStatement"],
		"no-tabs": ["warn", { allowIndentationTabs: true }],
		"no-underscore-dangle": "off",
		"no-use-before-define": "off",
		"object-curly-newline": [
			"off",
			{
				ExportDeclaration: {
					minProperties: 2,
					multiline: true,
				},
				ImportDeclaration: {
					minProperties: 2,
					multiline: true,
				},
				ObjectExpression: {
					minProperties: 2,
					multiline: true,
				},
				ObjectPattern: {
					minProperties: 2,
					multiline: true,
				},
			},
		],
		"prefer-destructuring": [
			"error",
			{
				array: false,
				object: true,
			},
		],
		"prefer-template": "error",
		"prettier/prettier": [
			"error",
			{
				bracketSpacing: true,
				endOfLine: "auto",
				semi: true,
				singleQuote: false,
				tabWidth: 4,
				trailingComma: "es5",
				useTabs: true,
			},
		],
		"promise/always-return": "off",
		"promise/prefer-await-to-then": "off",
		quotes: ["warn", "double"],
		"react-hooks/exhaustive-deps": "warn",
		"react-hooks/rules-of-hooks": "warn",
		"react/display-name": "off",
		"react/function-component-definition": [
			"error",
			{ namedComponents: "arrow-function" },
		],
		"react/jsx-curly-newline": [
			"off",
			{
				multiline: "require",
				singleline: "consistent",
			},
		],
		"react/jsx-filename-extension": [
			1,
			{ extensions: [".js", ".jsx", ".ts", ".tsx"] },
		],
		"react/jsx-fragments": ["warn", "element"],
		"react/jsx-indent": ["warn", "tab"],
		"react/jsx-indent-props": ["warn", "tab"],
		"react/jsx-max-props-per-line": "warn",
		"react/jsx-one-expression-per-line": ["off", { allow: "literal" }],
		"react/jsx-props-no-spreading": ["warn", { custom: "ignore" }],
		"react/jsx-wrap-multilines": [
			"warn",
			{
				arrow: "parens-new-line",
				assignment: "parens-new-line",
				condition: "parens-new-line",
				declaration: "parens-new-line",
				logical: "parens-new-line",
				prop: "parens-new-line",
				return: "parens-new-line",
			},
		],
		"react/no-typos": "error",
		"react/prefer-es6-class": ["warn", "always"],
		"react/prefer-stateless-function": "off",
		"react/prop-types": "warn",
		"react/require-default-props": "warn",
		"react/sort-comp": "error",
		"react/sort-prop-types": [
			"error",
			{
				callbacksLast: true,
				ignoreCase: true,

				noSortAlphabetically: false,
				requiredFirst: true,
				sortShapeProp: true,
			},
		],
		"react/static-property-placement": [0],
		semi: ["warn", "always"],
		"simple-import-sort/imports": [
			"error",
			{
				groups: [
					// Packages. `react` related packages come first.

					["^react$", "^react-native$"],
					["^@?\\w"],

					// Internal packages.

					["^(views+)(/?).*$"],
					["^(components+)(/?).*$"],
					["^(hooks+)(/?).*$"],
					["^(contexts+)(/?).*$"],
					["^(reducers+)(/?).*$"],
					["^(misc+)(/?).*$"],
					["^(assets+)(/?).*$"],

					// Side effect imports.

					["^\\u0000"],

					// Parent imports. Put `..` last.

					["^\\.\\.(?!/?$)", "^\\.\\./?$"],

					// Other relative imports. Put same-folder imports and `.` last.

					["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

					// Style imports.

					["^.+\\.s?css$"],
				],
			},
		],
		"sort-imports": "off",
		"sort-keys-fix/sort-keys-fix": "warn",
		"sort-vars": "warn",
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
};
