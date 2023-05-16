<script lang="ts">
    import VisualButton from './VisualButton.svelte';

    export let value: number = 10;
    const onInput = event => (value = event.target.value);
</script>

<input type="number" {value} on:input={onInput} />
<div class="buttons">
    <VisualButton icon="add" size="1rem" on:click={() => value++}/>
    <VisualButton icon="remove" size="1rem" on:click={() => value--}/>
</div>

<style lang="scss">
    @import "../variables.scss";

    .buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        user-select: none;
        margin-right: 0.3rem; 
        margin-left: -0.3rem; 
    }

    input {
        width: 1rem;
        padding: 0.4rem;
        margin-right: 0.1rem;
        text-align: center;
        border: none;
        background: none;
        font-size: 0.9rem;

        &:focus {
            outline: none;
            background: lighten($primary-color, 20%);
            border-radius: 0.3rem;
        }
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>