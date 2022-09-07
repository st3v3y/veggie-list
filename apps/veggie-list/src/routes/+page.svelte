<script lang="ts">
	import VeggieOrder from '$lib/components/veggies/veggie-order.svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import Clipboard from 'svelte-clipboard';
	import { _, locale } from 'svelte-i18n'
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	export let data: PageData;

	$: addedVeggies = data.veggies.filter((x) => x.is_favorite);

	$: orderText = () => {
		let text = "";
		if (!addedVeggies || addedVeggies.length == 0) {
			return "";
		}
		addedVeggies.forEach((x) => {
			const veggieName = $locale?.startsWith('es') ? x.name_es : x.name;
			if (!x.amount) {
				text = text + `- ${veggieName}\r\n`;
			} else {
				const constant = $_(`constants.units.${x.amount != undefined && x.amount > 1 ? 'plural' : 'singular'}.${x.order_unit}`).toLowerCase();
				const comment = x.hasComment ? ' (' + x.comment + ')' : '';
				text = text + `- ${x.name_es}, ${x.amount} ${constant}${comment}\r\n`;
			}
		});
		return text;
	}
</script>

<svelte:head>
	<title>{$_("page.order.title")}</title>
	<meta name="description" content="{$_("page.order.description")}" />
</svelte:head>

<section>
	<h1 class="mt-3">{$_("page.order.title")} <span class="text-slate-500">({addedVeggies.length})</span></h1>

	<section class="flex flex-col items-center mt-10">
		{#each data.veggies as veggie (veggie.id)}
			<VeggieOrder bind:veggie={veggie}></VeggieOrder>
		{/each}
	</section>

	<section class="flex flex-col mt-10 items-center w-full">
		<div class="max-w-[600px] w-full">
			<div class="mb-10">
				<h3 class="text-md font-bold text-red-500">
					{addedVeggies.filter((x)=>{return x.amount == undefined}).length} 
					{$_('page.order.text.missing_amounts')}
				</h3>
				<ul>
					{#each addedVeggies as veggie (veggie.id)}
						{#if veggie.amount == undefined}
							<li class="text-red-500">- 
								{#if $locale?.startsWith('es')}
									{veggie.name_es}
								{:else}
									{veggie.name}
								{/if}
							</li>
						{/if}
					{/each}
				</ul>
			</div>

			<textarea value={orderText()} readonly class="form-input rounded-lg px-4 py-3 rounded-lg border border-slate-400 w-full min-h-[300px]"/>
			<Clipboard
				text={orderText()}
				let:copy
				on:copy={() => addNotification({
					text: $_('page.order.text.copied'),
					type: 'success',
					position: 'bottom-center',
					removeAfter: 2000
				})}
			>
				<button class="shadow-veggie py-4 px-6 text-lg bg-white font-bold rounded-lg disabled:opacity-50 flex gap-2" on:click={copy}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
					{$_('page.order.form.copy.label')}
				</button>
			</Clipboard>
		</div>
	</section>
</section>
