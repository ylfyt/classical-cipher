import { writable } from 'svelte/store';
import type { ICipher } from '../interfaces/cipher';
const alg = ['vigenere-cipher', 'varian-vigenere-cipher', 'extended-vigenere-cipher', 'affine-cipher', 'playfair-cipher', 'hill-cipher', 'enigma-cipher'];

const temp = (buff: Buffer): Buffer => {
	throw new Error('not implemented yet');
};

export const ciphers: ICipher[] = [
	{
		name: 'Vigenere Cipher',
		label: 'vigenere-cipher',
		isMatrixKey: false,
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Varian Vigenere Cipher',
		label: 'varian-vigenere-cipher',
		isMatrixKey: false,
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Extended Vigenere Cipher',
		label: 'extended-vigenere-cipher',
		isMatrixKey: false,
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Affine Cipher',
		label: 'affine-cipher',
		isMatrixKey: false,
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Playfair Cipher',
		label: 'playfair-cipher',
		isMatrixKey: false,
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Hill Cipher',
		label: 'hill-cipher',
		isMatrixKey: false,
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Enigma cipher',
		label: 'enigma-cipher',
		isMatrixKey: false,
		encrypter: temp,
		decrypter: temp,
	},
];

export const selectedCipher = writable<ICipher>(ciphers[0]);
