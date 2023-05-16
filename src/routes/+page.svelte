<script lang="ts">
    import { tick, onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import VisualButton from '$lib/components/VisualButton.svelte';
    import SizeField from '$lib/components/SizeField.svelte';
    import ColorField from '$lib/components/ColorField.svelte';
    import Pencil from '$lib/components/tools/Pencil.svelte';
    import Eraser from '$lib/components/tools/Eraser.svelte';
	import { Tool, activeTool, isShifting, backgroundColor } from '$lib/stores/session';
    import { pencilSettings, eraserSettings } from '$lib/stores/tool-settings';
    import { startDraw, draw, stopDraw } from '$lib/draw';
    import { clearCanvas } from '$lib/canvas';
    import { historyPosition, history, undoCount } from '$lib/stores/history';
    
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    onMount(async () => {
        await tick();

        context = canvas.getContext('2d') as CanvasRenderingContext2D;

        context.canvas.width  = window.outerWidth;
        context.canvas.height = window.outerHeight;

        context.fillStyle = $backgroundColor;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    });

    const redoLast = () => {
        if ($undoCount <= 0) {
            return;
        }

        $historyPosition += 1;
        $undoCount -= 1;
        context.putImageData($history[$historyPosition], 0, 0);
    }

    const undoLast = () => {
        if ($historyPosition <= 0) {
            clearCanvas(context);
            return;
        }

        $historyPosition -= 1;
        $undoCount += 1;
        if ($undoCount > 4) {
            $undoCount -= 1;
            $history.pop();
        }

        context.putImageData($history[$historyPosition], 0, 0);
    } 


    const handleToolSelection = (tool: Tool) => {
        $activeTool = tool;
    } 

    const handleKeydown = (event) => {
        if (event.key === 'z' && event.ctrlKey) {
            undoLast();
            return;
        }

        if (event.shiftKey) {
            console.log("shift key pressed");
            $isShifting = true;
        }
    };

    const handleKeyup = (event) => {
        if (event.key === "Shift") {
            console.log("shift key released");
            $isShifting = false;
        }
    };

</script>

<svelte:window on:keydown|preventDefault|stopPropagation={handleKeydown} on:keyup|preventDefault|stopPropagation={handleKeyup}/>


<canvas id="main" bind:this={canvas} class="main-canvas"
    on:mousemove|preventDefault={(e) => draw(e, context)}
    on:touchmove|preventDefault={(e) => draw(e, context)}
    on:mousedown|preventDefault={(e) => startDraw(e, context)}
    on:touchstart|preventDefault={(e) => startDraw(e, context)}
    on:touchend|preventDefault={(e) => stopDraw(e, context)}
    on:mouseup|preventDefault={(e) => stopDraw(e, context)}
    on:mouseleave|preventDefault={(e) => stopDraw(e, context)}

/>

<div class="tool-bar">
    <div class="time-controls">
        <VisualButton icon="redo" size="1.5rem" on:click={redoLast} />
        <VisualButton icon="undo" size="1.5rem" on:click={undoLast} />
    </div>
    <div class="tool-set">
        <Pencil selected={$activeTool == Tool.Pencil} on:click={() => handleToolSelection(Tool.Pencil)}/>
        <Eraser selected={$activeTool == Tool.Eraser} on:click={() => handleToolSelection(Tool.Eraser)}/>
    </div>
    {#if $activeTool == Tool.Pencil || Tool.Eraser}
        <div class="draw-controls" transition:slide>
            {#if $activeTool == Tool.Pencil}
                <SizeField bind:value={$pencilSettings.size} />
                <ColorField bind:value={$pencilSettings.color} />
            {:else if $activeTool == Tool.Eraser}
                <SizeField bind:value={$eraserSettings.size} />
            {/if}
        </div>
    {/if}
    <VisualButton on:click={() => clearCanvas(context)} icon="delete" size="1.5rem" />
    <VisualButton icon="more_vert" size="1.5rem" />


</div>

<style lang="scss">
    .main-canvas {
        position: fixed;
        background: red;
    }

    .tool-bar {
        display: flex;
        flex-direction: row;
        position: absolute;
        background: rgba(211, 211, 211, 0.674);
        align-items: center;
        justify-content: center;
        bottom: 2rem;
        padding: 0 1.5rem;
        border-radius: 100vmax;
        border: 1px solid rgba(0, 0, 0, 0.564);
        left: 50%;
        transform: translateX(-50%);
        user-select: none;
    }

    .time-controls {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tool-set {
        display: flex;
        position: relative;
        bottom: calc(1.5rem - 2px);
        flex-direction: row;
        align-items: center;
        margin-left: 0.8rem;
        border-bottom: 2px solid black;
    }

    .draw-controls {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 0.8rem;
        padding-right: 0.5rem;
        gap: 0.2rem;
    }
</style>