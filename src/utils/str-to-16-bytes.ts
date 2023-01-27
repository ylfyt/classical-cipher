export function strToUtf16Bytes(str: string) {
	const bytes: number[] = [];
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i); // x00-xFFFF
		bytes.push(code & 255, code >> 8); // low, high
	}
	return bytes;
}
