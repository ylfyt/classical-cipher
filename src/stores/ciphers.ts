import { writable } from 'svelte/store';
import type { ICipher } from '../interfaces/cipher';
import { vigenereDecrypt, vigenereEncrypt } from '../algorithms/vigener-cipher';
import { autoKeyVigenereDecrypt, autoKeyVigenereEncrypt } from '../algorithms/auto-key-vigenere-cipher';
import { extendedVigenereCipherDecrypt, extendedVigenereCipherEncrypt } from '../algorithms/extended-vigenere-cipher';

const temp = (data: number[], key: number[]): number[] => {
	throw new Error('not implemented yet');
};

export const ciphers: ICipher[] = [
	{
		name: 'Affine Cipher',
		label: 'affine-cipher',
		keyType: 'number',
		encrypter: temp,
		decrypter: temp,
	},
	{
		name: 'Extended Vigenere Cipher (256 ASCII)',
		label: 'extended-vigenere-cipher',
		keyType: 'text',
		encrypter: extendedVigenereCipherEncrypt,
		decrypter: extendedVigenereCipherDecrypt,
	},
	{
		name: 'Auto Key Vigenere Cipher',
		label: 'auto-key-vigenere-cipher',
		keyType: 'text',
		encrypter: autoKeyVigenereEncrypt,
		decrypter: autoKeyVigenereDecrypt,
	},
	{
		name: 'Vigenere Cipher',
		label: 'vigenere-cipher',
		keyType: 'text',
		encrypter: vigenereEncrypt,
		decrypter: vigenereDecrypt,
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
