<script lang="ts">
    export let isOpen:boolean = false;
    export let title:string;
    export let message:string = "";
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="contents">
            <h2>{title}</h2>
            {#if message}
                <p>{message}</p>
            {/if}
            <slot name="actions" class="actions">
            </slot>
        </div>
    </div>
{/if}
  
<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    
        /* allow click-through to backdrop */
        pointer-events: none;
    }
  
    .contents {
        min-width: 240px;
        border-radius: 15px;
        padding: 35px 45px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
        box-shadow: 0 0 20px 10px rgba(124, 124, 124, 0.3);

    }
  
    h2 {
        text-align: center;
        font-size: 24px;
    }
  
    p {
        text-align: center;
        margin-top: 16px;
    }
  
    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: flex-end;
    }
</style>