export const isUpper = (code: number): boolean => {
	return code >= 65 && code <= 90;
};
export const isLower = (code: number): boolean => {
	return code >= 97 && code <= 122;
};

export const isAlphabet = (code: number): boolean => {
	return isUpper(code) || isLower(code);
};

export const toLower = (code: number): number => {
	if (!isUpper(code)) return code;
	return code + 32;
};
export const toUpper = (code: number): number => {
	if (!isLower(code)) return code;
	return code - 32;
};
