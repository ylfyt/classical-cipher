export const bytesToStr = (bytes: number[]): string => {
	let str = '';
	for (let i = 0; i < bytes.length; i++) {
		str += String.fromCharCode(bytes[i]);
	}

	return str;
};
