import { isAlphabet } from './ascii.js';

export const dataCleaner = (data: Uint8Array) => {
	const temp: number[] = [];
	for (let i = 0; i < data.length; i++) {
		if (!isAlphabet(data[i])) continue;

		temp.push(data[i]);
	}
	return temp;
};
