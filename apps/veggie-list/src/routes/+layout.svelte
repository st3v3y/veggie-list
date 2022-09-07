<script context="module">
	import { waitLocale } from 'svelte-i18n'

	export async function preload() {
		// awaits for the loading of the 'es' and 'en' dictionaries
		return waitLocale()
	}
</script>

<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import { isLoading, register, init, getLocaleFromNavigator } from 'svelte-i18n';
	import '../app.css';
	import { Modals, closeModal } from 'svelte-modals';
	import Notifications from 'svelte-notifications';

	register('es', () => import('../locales/es.json'));
    register('en', () => import('../locales/en.json'));
	
	init({
        fallbackLocale: 'es',
        initialLocale: getLocaleFromNavigator(),
    });

</script>

<Modals>
	<div
	  slot="backdrop"
	  class="backdrop"
	  on:click={closeModal}
	/>
</Modals>

<Notifications>
	{#if $isLoading} 
		Loading...
	{:else}
		<Header />

		<main>
			<slot />
		</main>

		<footer>
			<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
		</footer>
	{/if}
</Notifications>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0,0,0,0.50)
	}
</style>
