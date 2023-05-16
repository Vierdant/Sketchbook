<script lang="ts">
    export let icon: string;
    export let size: string;
</script>


<span on:click class="material-symbols-sharp" style="font-size: {size};">
    {icon}
</span>

<style lang="scss">
    @import "../variables.scss";

    span {
        cursor: pointer;
        color: $text-color;
        transition: color 0.1s ease-in-out;

        &:hover {
            color: $primary-color;
        }
    }
</style>