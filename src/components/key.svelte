<script lang="ts">
	export let isMatrix = false;
</script>

<div>
	{#if !isMatrix}
		<div class="flex flex-col">
			<label for="key">Secret Key</label>
			<input class="p-2 rounded-md" placeholder="Key..." type="text" />
		</div>
	{:else}
		<div>matrix</div>
	{/if}
</div>
