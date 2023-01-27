<script lang="ts">
	import { ciphers, selectedCipher } from '../stores/ciphers';

	let selected: string;
</script>

<div>
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
</div>
