import { writable } from 'svelte/store';

export const contentType = writable<string>('text');
export const dataInput = writable<string>('');
export const dataOutput = writable<number[]>([]);
