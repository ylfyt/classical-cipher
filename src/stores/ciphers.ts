import { writable } from 'svelte/store';
import type { ICipher } from '../interfaces/cipher';
import { vigenereDecrypt, vigenereEncrypt } from '../algorithms/vigener-cipher';

const temp = (data: number[], key: number[]): number[] => {
	throw new Error('not implemented yet');
};

export const ciphers: ICipher[] = [
	{
		name: 'Vigenere Cipher',
		label: 'vigenere-cipher',
		keyType: 'text',
		encrypter: vigenereEncrypt,
		decrypter: vigenereDecrypt,
	},
	{
		name: 'Varian Vigenere Cipher',
		label: 'varian-vigenere-cipher',
		keyType: 'text',
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Extended Vigenere Cipher',
		label: 'extended-vigenere-cipher',
		keyType: 'text',
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Affine Cipher',
		label: 'affine-cipher',
		keyType: 'number',
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Playfair Cipher',
		label: 'playfair-cipher',
		keyType: 'matrix',
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Hill Cipher',
		label: 'hill-cipher',
		keyType: 'matrix',
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Enigma cipher',
		label: 'enigma-cipher',
		keyType: 'text',
		encrypter: temp,
		decrypter: temp,
	},
];

export const selectedCipher = writable<ICipher>(ciphers[0]);
