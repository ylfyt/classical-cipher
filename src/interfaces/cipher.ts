export interface ICipher {
	name: string;
	label: string;
	keyType: 'matrix' | 'number' | 'text';
	encrypter: (data: number[], key: number[]) => number[];
	decrypter: (data: number[], key: number[]) => number[];
}
