<script lang="ts">
  import CipherOption from '../components/cipher-option.svelte';
	import Input from '../components/input.svelte';
	import Key from '../components/key.svelte';
	import Output from '../components/output.svelte';
  import { selectedCipher } from '../stores/ciphers';
</script>

<div class="">
	<h1 class="text-4xl text-center mb-10">{$selectedCipher.name}</h1>
	<div class="flex flex-col gap-5">
    <CipherOption />
		<Key />
		<Input />
		<div class="flex gap-2 px-4 py-2 border-2 rounded-md">
			<button class="p-2 bg-gray-300 shadow-md rounded-md hover:bg-gray-600">Encrypt</button>
			<button class="p-2 bg-gray-300 shadow-md rounded-md hover:bg-gray-600">Decrypt</button>
		</div>
		<Output />
	</div>
</div>
