<script lang="ts">
	import { slide } from "svelte/transition";


    export let value;
    const onInput = event => {
        value = event.target.value;
        document.documentElement.style.setProperty("--selectedColor", event.target.value)
    }
</script>

<div class="input-container" in:slide>
    <input id="field" type="color" {value} on:input={onInput} />
    <div id="custom-input" class="custom"/>
</div>

<style lang="scss">
    $selectedColor: #000;

    input[type="color"] {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border: none;
        outline: none;
        opacity: 0;
        margin-bottom: 30px;

        &:hover {
            cursor: pointer;
        }
    }



    .custom {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50px;
        margin-top: -65px;
        margin-left: -3px;
        border: 5px solid lighten($selectedColor, 85%);

        &:hover {
            cursor: pointer;
        }
    }

    #field {
        margin-top: 0;
    }

    #custom-input {
        background-color: var(--selectedColor, $selectedColor);
    }

</style>

