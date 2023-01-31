import { mod } from '../utils/mod.js';

const E = (pj: number, ki: number): number => {
	return mod(pj + ki, 256);
};

const D = (cj: number, ki: number): number => {
	return mod(cj - ki, 256);
};

export const extendedVigenereCipherEncrypt = (data: number[], key: number[]): number[] => {
	const result: number[] = [];

	let keyCounter = 0;
	data.forEach((pj) => {
		const keyIdx = keyCounter % key.length;
		const ki = key[keyIdx];

		keyCounter++;
		const e = E(pj, ki);
		result.push(e);
	});

	return result;
};

export const extendedVigenereCipherDecrypt = (data: number[], key: number[]): number[] => {
	const result: number[] = [];

	let keyCounter = 0;
	data.forEach((cj) => {
		const keyIdx = keyCounter % key.length;
		const ki = key[keyIdx];

		keyCounter++;
		const d = D(cj, ki);
		result.push(d);
	});

	return result;
};
