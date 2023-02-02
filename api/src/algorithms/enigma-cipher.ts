import { toLower } from '../utils/ascii.js';
import { dataCleaner } from '../utils/data-cleaner.js';
import { strToBytes } from '../utils/str-to-bytes.js';
import { affineCipherCipherEncrypt } from './affine-cipher.js';

const a_ASCII_CODE = 97;
const CHAR_SIZE = 26;

const getRotors = (key: number[]): number[][] => {
	const alphabet = new Uint8Array(strToBytes('abcdefghijklmnopqrstuvwxyz'));
	const rotors: number[][] = [];
	key.forEach((val, idx) => {
		const temp = affineCipherCipherEncrypt(alphabet, `7|${idx}`);
		const delta = temp.indexOf(val);
		for (let i = 0; i < delta; i++) {
			const first = temp.shift();
			temp.push(first!);
		}
		rotors.push(temp);
	});

	return rotors;
};

export const enigmaEncrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key = dataCleaner(new Uint8Array(strToBytes(keyStr.toLowerCase())));
	const rotors = getRotors(key);
	const cleanData = dataCleaner(data);

	const result: number[] = [];

	cleanData.forEach((val) => {
		let pj = toLower(val) - a_ASCII_CODE;
		for (let i = 0; i < rotors.length; i++) {
			const rotor = rotors[i];
			pj = rotor[pj] - a_ASCII_CODE;
		}

		result.push(pj + a_ASCII_CODE);

		for (let i = rotors.length - 1; i >= 0; i--) {
			const first = rotors[i].shift();
			rotors[i].push(first!);
			if (rotors[i][0] !== key[i]) break;
		}
	});

	return result;
};

export const enigmaDecrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key = dataCleaner(new Uint8Array(strToBytes(keyStr.toLowerCase())));
	const rotors = getRotors(key);
	const cleanData = dataCleaner(data);

	const result: number[] = [];

	cleanData.forEach((val) => {
		let cj = toLower(val);
		for (let i = rotors.length - 1; i >= 0; i--) {
			const rotor = rotors[i];
			cj = rotor.indexOf(cj) + a_ASCII_CODE;
		}

		result.push(cj);

		for (let i = rotors.length - 1; i >= 0; i--) {
			const first = rotors[i].shift();
			rotors[i].push(first!);
			if (rotors[i][0] !== key[i]) break;
		}
	});

	return result;
};
