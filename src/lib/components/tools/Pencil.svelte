<script lang="ts">
    export let selected: boolean;
</script>

<div class="pencil" class:selected on:click>
    <div class="pencil__wrapper">
        <div class="nib"></div>
        <div class="body"></div>
    </div>
</div>

<style lang="scss">
    @import "../../variables.scss";

    //colours 
    $pencil: #fda155;
    $nib: #ffd8b0;
    $lead: #4a4a4a;

    $pencil-height: 50;

    .pencil {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        transition: transform 0.2s linear;

        &::after {
            content: "";
            display: block;
            width: 20px;
            height: 5px;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            position: absolute;
            bottom: 0px;
            left: 5.5px;
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

    .pencil__wrapper {
        position: relative;
        width: 15px;
        overflow: hidden;
        height: auto;
        margin: 0 auto;
    }

    .body {
        height: $pencil-height*1px;
        background: $pencil;

        &:before {
            content: "";
            position: absolute;
            width: 7.5px;
            left: 7.5px;
            height: $pencil-height*1px;
            background-color: darken($pencil, 5%);
        }
    }

    .nib {
        border-bottom: 15px solid $nib;
        border-left: 7.5px solid transparent;
        border-right: 7.5px solid transparent;
    }

    .nib:before {
        content: "";
        position: absolute;
        border-bottom: 15px solid darken($nib, 5%);
        border-right: 7.5px solid transparent;
        bottom: 0px;
    }

    .nib:after {
        content: "";
        position: absolute;
        border-bottom: 7.5px solid $lead;
        border-right: 3.75px solid transparent;
        border-left: 3.75px solid transparent;
        top: 0px;
        left: 3.75px;
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
            left: 13px;
            border-radius: 50%;
        }
    }
</style>