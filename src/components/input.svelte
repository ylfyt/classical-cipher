<script lang="ts">
	let isFile = true;
	let text = '';
</script>

<div class="flex flex-col gap-4">
	<div class="flex rounded h-[40px]">
		<button class={`w-full shadow-md rounded-l-lg ${!isFile ? 'bg-gray-600' : 'bg-gray-300'}`} on:click={() => (isFile = false)}>Text</button>
		<button class={`rounded-r-lg shadow-md w-full ${isFile ? 'bg-gray-600' : 'bg-gray-300'}`} on:click={() => (isFile = true)}>File</button>
	</div>
	<div class="">
		{#if !isFile}
			<textarea class="w-full p-2 rounded-md" rows="5" placeholder="text" />
		{:else}
			<input class="bg-white file:rounded-md file:bg-gray-300 hover:file:bg-gray-600 w-full p-2 rounded-md" type="file" />
		{/if}
	</div>
</div>

<style>
	input[type='file']::file-selector-button {
		margin-right: 20px;
		border: none;
		padding: 10px 20px;
		color: #fff;
		cursor: pointer;
	}
</style>
