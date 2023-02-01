<script lang="ts">
	import Action from '../components/action.svelte';
	import CipherOption from '../components/cipher-option.svelte';
	import Input from '../components/input.svelte';
	import Key from '../components/key.svelte';
	import Output from '../components/output.svelte';
	import { selectedCipher } from '../stores/ciphers';
</script>

<div class="">
	<h1 class="text-4xl text-center mb-10 mt-5">{$selectedCipher.name}</h1>
	<div class="flex flex-col gap-5 mb-10">
		<CipherOption />
		<Key />
		<Input />
		<Action />
		<Output />
	</div>
</div>
