<script lang="ts">
	import Input from '../components/input.svelte';
	import Key from '../components/key.svelte';
	import Output from '../components/output.svelte';
  import { dataInput } from '../stores/data-input';
</script>

<div class="">
	<h1 class="text-4xl text-center mb-4">Vigenere Cipher</h1>
	<div class="flex flex-col gap-5">
		<Key />
		<Input />
    <div class="flex gap-2 px-4 py-2 border-2 rounded-md">
      <button class="p-2 bg-gray-300 shadow-md rounded-md hover:bg-gray-600">Encrypt</button>
      <button class="p-2 bg-gray-300 shadow-md rounded-md hover:bg-gray-600">Decrypt</button>
    </div>
		<Output />
	</div>
  {$dataInput.data}
</div>
