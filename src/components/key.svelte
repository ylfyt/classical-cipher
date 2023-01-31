<script lang="ts">
	import { selectedCipher } from '../stores/ciphers';
	import { secretKey } from '../stores/data';

	let keyM: number;
	let keyB: number;
	$: $selectedCipher.label === 'affine-cipher' &&
		(() => {
			if (!keyM || !keyB) {
				secretKey.set('');
        return
			}
      secretKey.set(`${keyM}|${keyB}`)
		})();
</script>

<div class="flex flex-col">
	<label for="key text-xl">Secret Key</label>
	{#if $selectedCipher.label === 'affine-cipher'}
		<div class="flex gap-4">
			<input bind:value={keyM} class="w-full p-2 rounded-md" type="number" placeholder="Key M" max="26" min="1" />
			<input bind:value={keyB} class="w-full p-2 rounded-md" type="number" placeholder="Key B" max="26" min="1" />
		</div>
	{:else if $selectedCipher.keyType === 'matrix'}
		<div>matrix</div>
	{:else}
		<input bind:value={$secretKey} class="p-2 rounded-md" placeholder="Key..." type="text" />
	{/if}
</div>
