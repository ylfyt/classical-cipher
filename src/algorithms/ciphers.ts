import { affineDecrypt, affineEncrypt } from './affine-cipher.js';
import { autoKeyVigenereDecrypt, autoKeyVigenereEncrypt } from './auto-key-vigenere-cipher.js';
import { enigmaDecrypt, enigmaEncrypt } from './enigma-cipher.js';
import { extendedVigenereDecrypt, extendedVigenereEncrypt } from './extended-vigenere-cipher.js';
import { hillDecrypt, hillEncrypt } from './hill-cipher.js';
import { playfairDecrypt, playfairEncrypt } from './playfair-cipher.js';
import { vigenereDecrypt, vigenereEncrypt } from './vigener-cipher.js';

export interface ICipher {
	encrypter: (data: Uint8Array, key: string) => Uint8Array;
	decrypter: (data: Uint8Array, key: string) => Uint8Array;
}

export const ciphers = new Map<string, ICipher>([
	[
		'extended-vigenere-cipher',
		{
			encrypter: extendedVigenereEncrypt,
			decrypter: extendedVigenereDecrypt,
		},
	],
	[
		'auto-key-vigenere-cipher',
		{
			encrypter: autoKeyVigenereEncrypt,
			decrypter: autoKeyVigenereDecrypt,
		},
	],
	[
		'vigenere-cipher',
		{
			encrypter: vigenereEncrypt,
			decrypter: vigenereDecrypt,
		},
	],
	[
		'affine-cipher',
		{
			encrypter: affineEncrypt,
			decrypter: affineDecrypt,
		},
	],
	[
		'hill-cipher',
		{
			encrypter: hillEncrypt,
			decrypter: hillDecrypt,
		},
	],
	[
		'playfair-cipher',
		{
			encrypter: playfairEncrypt,
			decrypter: playfairDecrypt,
		},
	],
	[
		'enigma-cipher',
		{
			encrypter: enigmaEncrypt,
			decrypter: enigmaDecrypt,
		},
	],
]);
