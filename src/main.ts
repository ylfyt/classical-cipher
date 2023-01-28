import App from './App.svelte';
import { vigenereDecrypt, vigenereEncrypt } from './algorithms/vigener-cipher';
import { bytesToStr } from './utils/bytes-to-str';
import { strToUtf16Bytes } from './utils/str-to-16-bytes';

const app = new App({
	target: document.getElementById('app'),
});

// const str = 'thisplaintext';
// const key = 'sony';
// const bytes = strToUtf16Bytes(str);
// const keyBytes = strToUtf16Bytes(key);

// console.log("P", bytes)
// console.log("K", keyBytes);

// const resE = vigenereEncrypt(bytes, keyBytes);
// console.log('E', bytesToStr(resE), resE);

// const resD = vigenereDecrypt(resE, keyBytes);
// console.log('D', bytesToStr(resD), resD);

export default app;
