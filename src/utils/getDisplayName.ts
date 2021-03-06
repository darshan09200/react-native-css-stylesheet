import type { ComponentClass, ElementType, FunctionComponent } from "react";
import { ForwardRef, Memo } from "react-is";

// Simplified polyfill for IE11 support
// https://github.com/JamesMGreene/Function.name/blob/58b314d4a983110c3682f1228f845d39ccca1817/Function.name.js#L3
const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
// eslint-disable-next-line @typescript-eslint/ban-types
export function getFunctionName(fn: Function): string {
	const match = `${fn}`.match(fnNameMatchRegex);
	const name = match && match[1];
	return name || "";
}

function getFunctionComponentName(
	Component: FunctionComponent | ComponentClass,
	fallback = ""
) {
	return (
		Component.displayName ||
		Component.name ||
		getFunctionName(Component) ||
		fallback
	);
}

function getWrappedName(outerType: any, innerType: any, wrapperName: string) {
	const functionName = getFunctionComponentName(innerType);
	return (
		outerType.displayName ||
		(functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName)
	);
}

/**
 * cherry-pick from
 * https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 * originally forked from recompose/getDisplayName with added IE11 support
 */
export default function getDisplayName(
	Component: ElementType
): string | undefined {
	if (Component == null) {
		return undefined;
	}

	if (typeof Component === "string") {
		return Component;
	}

	if (typeof Component === "function") {
		return getFunctionComponentName(Component, "Component");
	}

	// TypeScript can't have components as objects but they exist in the form of `memo` or `Suspense`
	if (typeof Component === "object") {
		switch ((Component as any).$$typeof) {
			case ForwardRef:
				return getWrappedName(
					Component,
					(Component as any).render,
					"ForwardRef"
				);
			case Memo:
				return getWrappedName(
					Component,
					(Component as any).type,
					"memo"
				);
			default:
				return undefined;
		}
	}

	return undefined;
}
