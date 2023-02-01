import { writable } from 'svelte/store';

export interface ICipher {
	name: string;
	label: string;
	keyType: 'matrix' | 'number' | 'text';
}

export const ciphers: ICipher[] = [
	{
		name: 'Vigenere Cipher',
		label: 'vigenere-cipher',
		keyType: 'text',
	},
	{
		name: 'Auto Key Vigenere Cipher',
		label: 'auto-key-vigenere-cipher',
		keyType: 'text',
	},
	{
		name: 'Extended Vigenere Cipher (256 ASCII)',
		label: 'extended-vigenere-cipher',
		keyType: 'text',
	},
	{
		name: 'Affine Cipher',
		label: 'affine-cipher',
		keyType: 'number',
	},
	{
		name: 'Hill Cipher',
		label: 'hill-cipher',
		keyType: 'matrix',
	},
	{
		name: 'Playfair Cipher',
		label: 'playfair-cipher',
		keyType: 'text',
	},
	{
		name: 'Enigma cipher',
		label: 'enigma-cipher',
		keyType: 'text',
	},
];

export const selectedCipher = writable<ICipher>(ciphers[0]);
