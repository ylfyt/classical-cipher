import { toLower } from '../utils/ascii.js';
import { dataCleaner } from '../utils/data-cleaner.js';
import { mod } from '../utils/mod.js';
import { strToBytes } from '../utils/str-to-bytes.js';

const a_ASCII_CODE = 97;

const E = (pj: number, ki: number): number => {
	return mod(pj + ki, 26);
};

const D = (cj: number, ki: number): number => {
	return mod(cj - ki, 26);
};

export const autoKeyVigenereEncrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key = new Uint8Array(strToBytes(keyStr.toLowerCase()));
	const cleanData = dataCleaner(data);
	const cleanKey = dataCleaner(key);

	const result: number[] = [];

	let keyCounter = 0;
	cleanData.forEach((val) => {
		val = toLower(val);
		const pj = val - a_ASCII_CODE;

		let ki: number;
		if (keyCounter >= cleanKey.length) {
			ki = toLower(cleanData[keyCounter - cleanKey.length]);
		} else {
			ki = cleanKey[keyCounter];
		}
		ki -= a_ASCII_CODE;

		keyCounter++;
		const e = E(pj, ki);
		result.push(e + a_ASCII_CODE);
	});

	return result;
};

export const autoKeyVigenereDecrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key = new Uint8Array(strToBytes(keyStr.toLowerCase()));
	const cleanData = dataCleaner(data);
	const cleanKey = dataCleaner(key);

	const result: number[] = [];

	let keyCounter = 0;
	cleanData.forEach((val) => {
		const cj = val - a_ASCII_CODE;

		let ki: number;
		if (keyCounter >= cleanKey.length) {
			ki = result[keyCounter - cleanKey.length];
		} else {
			ki = cleanKey[keyCounter];
		}
		ki -= a_ASCII_CODE;

		keyCounter++;
		const d = D(cj, ki);
		result.push(d + a_ASCII_CODE);
	});

	return result;
};
