import { writable } from 'svelte/store';

export const contentType = writable<string>('text');
export const dataInput = writable<number[]>([]);
export const dataOutput = writable<number[]>([]);
export const secretKey = writable<number[]>([]);
export const isDecrypt = writable<boolean>(false);
export const strInput = writable<string>('');

export const resetState = () => {  
	contentType.set('text');
	dataInput.set([]);
	dataOutput.set([]);
	secretKey.set([]);
	strInput.set('');
};
