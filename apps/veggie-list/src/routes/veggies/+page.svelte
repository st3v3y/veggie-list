<script lang="ts">
    import { _ } from 'svelte-i18n';
	import CreateFormfrom from '../../lib/components/veggies/createForm.svelte';
	import Veggie from '../../lib/components/veggies/veggie.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$_("page.veggies.title")}</title>
	<meta name="description" content="{$_("page.veggies.description")}" />
</svelte:head>

<section class="flex flex-col items-center">
	<h1 class="mb-10">{$_("page.veggies.title")} <span class="text-slate-500">({data.veggies.length})</span></h1>

	{#each data.veggies as veggie (veggie.id)}
		<Veggie veggie={veggie}></Veggie>
	{/each}

	<CreateFormfrom></CreateFormfrom>
</section>