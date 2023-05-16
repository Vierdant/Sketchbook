<script lang="ts">
    export let selected: boolean;
</script>

<div class="eraser" class:selected on:click>
    <div class="eraser_wrapper">
        <div class="material"></div>
        <div class="body"></div>
    </div>
</div>

<style lang="scss">
    @import "../../variables.scss";

    //colours
    $eraser: #a698fc;
    $material: rgb(219, 194, 248);

    $eraser-height: 34;

    .eraser {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        transition: transform 0.2s linear;

        &::after {
            content: "";
            display: block;
            width: 26px;
            height: 5px;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            position: absolute;
            bottom: 0px;
            left: 36px;
            opacity: 0;
            background: $primary-color;
            transform: scale(0.5);
            transform-origin: bottom;
            transition: transform 0.1s linear;
        }

        &:hover:not(.selected) {

            &::after {
                transform: scale(1);
                bottom: 0px;
                opacity: 1;
            }
        }
    }

    .eraser_wrapper {
        position: relative;
        width: 20px;
        bottom: -8px;
        overflow: hidden;
        height: auto;
        margin: 0 auto;
    }

    .body {
        height: $eraser-height*1px;
        background: $eraser;

        &:before {
            content: "";
            position: absolute;
            width: 10px;
            left: 10px;
            height: $eraser-height*1px;
            background-color: darken($eraser, 5%);
        }
    }

    .material {
        border-bottom: 14px solid $material;
        border-top-left-radius: 0.5rem;
        border-right: 1px solid transparent;
    }

    .selected {
        &::after {
            transform: scale(1);
            bottom: 0px;
            opacity: 1;
        }

        &::before {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: $primary-color;
            bottom: -15px;
            left: 46px;
            border-radius: 50%;
        }
    }

</style>