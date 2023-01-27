<script lang="ts">
	let isFile = false;
</script>

<div>
	<div>
		<button on:click={() => (isFile = true)}>File</button>
		<button on:click={() => (isFile = false)}>Text</button>
	</div>
	{#if isFile}
		<input type="file" />
	{:else}
		<input type="text" />
	{/if}
</div>
