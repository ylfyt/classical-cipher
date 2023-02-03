import { writable } from 'svelte/store';

export const dataOutput = writable<Uint8Array | null>(null);
export const secretKey = writable<string>('');
export const isDecrypt = writable<boolean>(false);
export const strInput = writable<string>('');
export const isFromFile = writable<boolean>(false);
export const fileInput = writable<
	| {
			file: File;
			isText: boolean;
	  }
	| undefined
>();

export const resetState = () => {
	dataOutput.set(null);
	strInput.set('');
	fileInput.set(undefined);
};
