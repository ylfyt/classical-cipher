<script lang="ts">
	import CipherOption from '../components/cipher-option.svelte';
	import Input from '../components/input.svelte';
	import Key from '../components/key.svelte';
	import Output from '../components/output.svelte';
	import { selectedCipher } from '../stores/ciphers';
	import { dataInput, dataOutput } from '../stores/data';
	import { strToUtf16Bytes } from '../utils/str-to-16-bytes';
</script>

<div class="">
	<h1 class="text-4xl text-center mb-10">{$selectedCipher.name}</h1>
	<div class="flex flex-col gap-5">
		<CipherOption />
		<Key />
		<Input />
		<div class="flex gap-2 px-4 py-2 border-2 rounded-md">
			<button
				class="p-2 bg-gray-300 shadow-md rounded-md hover:bg-gray-600"
				on:click={() => {
					const result = $selectedCipher.encrypter(strToUtf16Bytes($dataInput), [10, 10]);
					dataOutput.set(result);
				}}>Encrypt</button
			>
			<button class="p-2 bg-gray-300 shadow-md rounded-md hover:bg-gray-600">Decrypt</button>
		</div>
		<Output />
	</div>
</div>
