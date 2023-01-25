<script lang="ts">
	import { Router, Route } from 'svelte-navigator';
	import Home from './pages/home.svelte';
</script>

<Router>
	<main class="app">
		<Route path="/*" primary={false}>
			<Route path="/">
				<Home />
			</Route>
		</Route>
	</main>
</Router>

<style>
</style>
