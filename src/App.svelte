<script lang="ts">
	import { Router, Route } from 'svelte-navigator';
	import Home from './pages/home.svelte';  
</script>

<Router>
	<main class="app bg-slate-300 min-h-screen flex justify-center">
		<div class="w-3/4 lg:w-1/2">
			<Route path="/*" primary={false}>
				<Route path="/">
					<Home />
				</Route>
			</Route>
		</div>
	</main>
</Router>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
