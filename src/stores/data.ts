import { writable } from 'svelte/store';

export const contentType = writable<string>('text');
export const dataInput = writable<number[]>([]);
export const dataOutput = writable<number[]>([]);
export const secretKey = writable<number[]>([]);
export const isDecrypt = writable<boolean>(false);
