<script lang="ts">
    import type { Veggie } from '$lib/types/veggie';
    import { _, locale } from 'svelte-i18n';
    import { quartInOut, cubicOut } from "svelte/easing";
	import { fade } from 'svelte/transition';
    import { tweened } from "svelte/motion";

    export let veggie:Veggie;

    const initColor = veggie.is_favorite ? [73, 222, 128] : [148, 163, 184];
    const checkColor = tweened(initColor, {
        duration: 1000,
        easing: cubicOut,
    });
    const initSize = veggie.is_favorite ? 35 : 25;
    const checkSize = tweened(initSize, {
        duration: 1000,
        easing: quartInOut,
    });
    const initBoxPadding = veggie.is_favorite ? 30 : 10;
    const boxPadding = tweened(initBoxPadding, {
        duration: 1000,
        easing: quartInOut,
    });
    const initImgSize =  veggie.is_favorite ? 80 : 60;
    const imgSize = tweened(initImgSize, {
        duration: 1000,
        easing: quartInOut,
    });
    function onCheckClick(){
        veggie.is_favorite = !veggie.is_favorite;
        if (veggie.is_favorite) {
            checkColor.set([73, 222, 128]);
            checkSize.set(35);
            boxPadding.set(30);
            imgSize.set(80);
        } else {
            checkColor.set([148, 163, 184]);
            checkSize.set(25);
            boxPadding.set(10);
            imgSize.set(60);
        }
    }
</script>

<div class="shadow-veggie flex flex-row items-center justify-between max-w-[600px] w-full mb-6 px-5 bg-[#F9FAFC] gap-5 rounded-xl" class:opacity-40={!veggie.is_favorite} style:padding-top={`${$boxPadding}px`} style:padding-bottom={`${$boxPadding}px`}>
    <div class="w-[80px] flex justify-center flex-start">
        <div class="rounded-full overflow-hidden" style:width={`${$imgSize}px`} style:height={`${$imgSize}px`}>
            <input class="object-cover h-full w-full cursor-default" type="image" src={veggie.picture_url} alt={veggie.name}/>
        </div>
    </div>
    <div class="flex flex-col gap-2 grow">
        <div class="flex flex-row gap-2 items-center">
            <h3 class="text-2xl font-bold">
                {#if $locale?.startsWith('es')}
                    {veggie.name_es}
                {:else}
                    {veggie.name}
                {/if}
            </h3>
            <span class="text-[#AAA]">${veggie.price} / {$_(`constants.units.singular.${veggie.unit}`)}</span>
        </div>
        {#if veggie.is_favorite}
            <div transition:fade class="flex justify-start w-full gap-4">
                <input name="amount" bind:value={veggie.amount} class="form-input w-full px-4 py-3 rounded-lg border border-slate-400" aria-label="Amount" placeholder={$_("page.order.form.amount.placeholder")}  />
                <div class="min-w-[120px]">
                    <select name="order_unit" bind:value={veggie.order_unit} class="form-input w-full px-3 py-3 rounded-lg border border-slate-400">
                        <option value="unit">{$_('constants.units.singular.unit')}</option>
                        <option value="dollar">{$_('constants.units.singular.dollar')}</option>
                        <option value="libra">{$_('constants.units.singular.libra')}</option>
                        <option value="kilogram">{$_('constants.units.singular.kilogram')}</option>
                        <option value="gram">{$_('constants.units.singular.gram')}</option>
                    </select>
                </div>
                <div class="flex items-center">
                    <button on:click={() => veggie.hasComment = true} disabled={veggie.hasComment}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={veggie.hasComment ? "#dbdbdb" : "#aaa"} stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </button>
                </div>
            </div>
            {#if veggie.hasComment}
                <div transition:fade class="flex flex-col">
                    <label for="comment" class="text-slate-500 text-sm">{$_("page.order.form.comment.label")}</label>
                    <div class="flex gap-4">
                        <input name="comment" bind:value={veggie.comment} class="form-input w-full px-4 py-3 rounded-lg border border-slate-400" aria-label="Amount" placeholder={$_("page.order.form.comment.placeholder")}  />
                        <button on:click={() => veggie.hasComment = false}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            {/if}
        {/if}
    </div>
    <div class="flex justify-center w-[50px]">
        <button on:click={onCheckClick} class="rounded-full p-1" style:background-color={`rgb(${$checkColor.join(',')})`} style:width={`${$checkSize}px`} style:height={`${$checkSize}px`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={$checkSize-10} height={$checkSize-10} viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
    </div>
</div>