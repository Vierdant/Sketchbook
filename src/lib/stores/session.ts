import { writable } from 'svelte/store';

enum Tool {
    Pencil,
    Eraser
}

type CanvasCoords = {
    x: number | null;
    y: number | null;
};

// The current tool the user is using
const activeTool = writable(Tool.Pencil);
// True if the user is currently drawing
const isInteracting = writable(false);
// True if the user is holding shift down
const isShifting = writable(false);
// The current color of the background
const backgroundColor = writable('#ffffff');
// The current color of the background
const lastDrawLocation = writable({ x: null, y: null } as CanvasCoords);

export { Tool, activeTool, isInteracting, backgroundColor, isShifting, lastDrawLocation };