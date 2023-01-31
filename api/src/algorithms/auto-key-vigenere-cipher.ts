import { dataCleaner } from '../utils/data-cleaner.js';
import { mod } from '../utils/mod.js';

const a_ASCII_CODE = 97;
const A_ASCII_CODE = 65;

const E = (pj: number, ki: number): number => {
	return mod(pj + ki, 26);
};

const D = (cj: number, ki: number): number => {
	return mod(cj - ki, 26);
};

export const autoKeyVigenereEncrypt = (data: number[], key: number[]): number[] => {
	const cleanData = dataCleaner(data, a_ASCII_CODE);
	const cleanKey = dataCleaner(key, a_ASCII_CODE);

	const result: number[] = [];

	let keyCounter = 0;
	cleanData.forEach((val) => {
		const pj = val - a_ASCII_CODE;

		let ki: number;
		if (keyCounter >= cleanKey.length) {
			ki = cleanData[keyCounter - cleanKey.length];
		} else {
			ki = cleanKey[keyCounter];
		}
		ki -= a_ASCII_CODE;

		keyCounter++;
		const e = E(pj, ki);
		result.push(e + A_ASCII_CODE);
	});

	return result;
};

export const autoKeyVigenereDecrypt = (data: number[], key: number[]): number[] => {
	const cleanData = dataCleaner(data, A_ASCII_CODE);
	const cleanKey = dataCleaner(key, a_ASCII_CODE);

	const result: number[] = [];

	let keyCounter = 0;
	cleanData.forEach((val) => {
		const cj = val - A_ASCII_CODE;

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
