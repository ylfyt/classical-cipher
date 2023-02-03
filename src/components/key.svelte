<script lang="ts">
	import { selectedCipher } from '../stores/ciphers';
	import { secretKey } from '../stores/data';
	import MatrixInput from './matrix-input.svelte';

	let matrixSize = 3;
	let matrix: number[] | null[] = Array(matrixSize * matrixSize).fill(null);

	let keyM: number;
	let keyB: number;
	$: $selectedCipher.label === 'affine-cipher' &&
		(() => {
			if (!keyM || !keyB) return secretKey.set('');
			secretKey.set(`${keyM}|${keyB}`);
		})();

	$: if ($selectedCipher.label === 'hill-cipher' && matrix) {
		if (matrix.filter((val) => val == null).length !== 0) secretKey.set('');
		else secretKey.set(matrix.join('|'));
	}

	$: if (matrixSize) {
		matrix = Array(matrixSize * matrixSize).fill(null);
	}
</script>

<div class="flex flex-col gap-2">
	<label for="key text-xl">Secret Key</label>
	{#if $selectedCipher.label === 'affine-cipher'}
		<div class="flex gap-4">
			<input bind:value={keyM} class="w-full p-2 rounded-md" type="number" placeholder="Key M" max="26" min="1" />
			<input bind:value={keyB} class="w-full p-2 rounded-md" type="number" placeholder="Key B" max="26" min="1" />
		</div>
	{:else if $selectedCipher.keyType === 'matrix'}
		<MatrixInput bind:matrix bind:size={matrixSize} />
	{:else}
		<input bind:value={$secretKey} class="p-2 rounded-md" placeholder="Key..." type="text" />
	{/if}
</div>

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
