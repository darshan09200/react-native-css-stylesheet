export const sizeRegex: RegExp;
export const scale: (size: string | number) => number;
export const verticalScale: (size: string | number) => number;
export const moderateScale: (
	size: string | number,
	factor?: string | number
) => number;
export const moderateVerticalScale: (
	size: string | number,
	factor?: string | number
) => number;
export const rem: (size: string | number) => number;
export const viewportMin: (size: string | number) => number;
export const viewportMax: (size: string | number) => number;
export const viewportHeight: (size: string | number) => number;
export const viewportWidth: (size: string | number) => number;
export const isValidSize: (size: string | number) => boolean;
export const calculateSize: (size: string | number) => string | number;
export const getCurrentOrientation: () => "landscape" | "portrait";
export const setGuidelineBaseDimensions: (
	guidelineBaseWidth?: number,
	guidelineBaseHeight?: number
) => void;
export const setDefaultFontSize: (
	defaultFontSize: number | undefined,
	responsive: boolean
) => void;

interface Calculations {
	scale: typeof scale;
	verticalScale: typeof verticalScale;
	moderateScale: typeof moderateScale;
	moderateVerticalScale: typeof moderateVerticalScale;
	rem: typeof rem;
	viewportMin: typeof viewportMin;
	viewportMax: typeof viewportMax;
	viewportHeight: typeof viewportHeight;
	viewportWidth: typeof viewportWidth;
	isValidSize: typeof isValidSize;
	calculateSize: typeof calculateSize;
	getCurrentOrientation: typeof getCurrentOrientation;
	setGuidelineBaseDimensions: typeof setGuidelineBaseDimensions;
	setDefaultFontSize: typeof setDefaultFontSize;
}
export default Calculations;
