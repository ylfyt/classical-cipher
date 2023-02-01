<script lang="ts">
	export let size: number;
	export let matrix: number[] | null[];

	let inputContructor: number[][] = Array(size).fill(Array(size).fill(1));

	$: if (size) {
		inputContructor = Array(size).fill(Array(size).fill(1));
	}
</script>

<div class="flex gap-10">
	<div class="flex gap-2 flex-col">
		{#each inputContructor as row, i}
			<div class="flex gap-2">
				{#each row as _, j}
					<input bind:value={matrix[i * size + j]} class="w-[50px] rounded-md h-[35px] text-center" placeholder="key" type="number" />
				{/each}
			</div>
		{/each}
	</div>
	<div class="flex gap-4 items-start">
		<div>Size</div>
		<div class="flex gap-2">
			<button
				on:click={() => {
					size = 2;
				}}
				class="bg-gray-400 px-2 py-1 rounded-md shadow-md active:shadow-none">2x2</button
			>
			<button
				on:click={() => {
					size = 3;
				}}
				class="bg-gray-400 px-2 py-1 rounded-md shadow-md active:shadow-none">3x3</button
			>
		</div>
	</div>
</div>

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
