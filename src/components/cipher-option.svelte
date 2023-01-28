<script lang="ts">
	import { ciphers, selectedCipher } from '../stores/ciphers';
  import { isDecrypt } from '../stores/data';
	import Switch from './switch.svelte';

	let selected: string;
</script>

<div class="flex gap-10">
	<select
		bind:value={selected}
		on:change={() => {
			const cipher = ciphers.find((ch) => ch.label === selected);
			if (!cipher) return;
			selectedCipher.set(cipher);
		}}
	>
		{#each ciphers as cipher}
			<option value={cipher.label}>{cipher.name}</option>
		{/each}
	</select>
	<div class="flex items-center gap-4">
		<span>Encrypt</span>
		<Switch bind:active={$isDecrypt} />
		<span>Decrypt</span>
	</div>
</div>
