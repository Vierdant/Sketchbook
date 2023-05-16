import { get } from 'svelte/store';
import { Tool, activeTool, isInteracting, isShifting, lastDrawLocation } from '$lib/stores/session';
import { historyPosition, history } from '$lib/stores/history';
import { getToolSettings } from '$lib/stores/tool-settings';

/**
 * Start the drawing proccess with a pencil or an eraser
 * Clicking shift allows the user to draw straight lines
 */
const startDraw = (event, context) => {
    if (get(activeTool) === Tool.Pencil || get(activeTool) === Tool.Eraser) {
        isInteracting.set(true);
        context.beginPath();
        context.moveTo(event.clientX - context.canvas.offsetLeft, 
                    event.clientY - context.canvas.offsetTop)
        
        // draw from last location a straight line to current if user is shifting
        if (get(isShifting)) {
            drawFromLast(event, context);
            return;
        }
        draw(event, context);
    }
}

/**
 * Draw a dot or a continuous line during mouse movements/clicks
 * This function also stores the last location of the mouse
 */
const draw = (event, context) => {
    if (get(isInteracting)) {
        const toolSettings = getToolSettings();
        context.lineTo(getX(event, context.canvas), getY(event, context.canvas));
        lastDrawLocation.set({ x: getX(event, context.canvas), y: getY(event, context.canvas) })
        context.strokeStyle = toolSettings.color;
        context.lineWidth = toolSettings.size;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
}

/**
 * Draws a straight line from the last location of the mouse to the current location
 * Doesn't update location of the mouse to the new one
 */
const drawFromLast = (event, context) => {
    if (get(lastDrawLocation).x != null || get(lastDrawLocation).y != null) {
        context.moveTo(get(lastDrawLocation).x!, get(lastDrawLocation).y!);
    }
    // because draw contains an update for last location, it's not done here
    draw(event, context);
}

/**
 * Halt or completly stop the drawing process
*/
const stopDraw = (event, context) => {
    if (get(isInteracting)) {
        context.stroke();
        context.closePath();
        isInteracting.set(false);

        if (get(historyPosition) != -1) {
            get(history).length = get(historyPosition) + 1;
        }

        get(history).push(context.getImageData(0, 0, context.canvas.width, context.canvas.height));
        historyPosition.set(get(historyPosition) + 1);

        console.log(get(history));
    }
}

const getX = (event, canvas) => {
    if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
    else {return event.pageX - canvas.offsetLeft}
}


const getY = (event, canvas) => {
    if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
    else {return event.pageY - canvas.offsetTop}
}

export { startDraw, draw, stopDraw, drawFromLast, getX, getY };