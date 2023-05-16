import { writable } from 'svelte/store';

let ImageDataArray: ImageData[] = [];

const historyPosition = writable(-1);

const history = writable(ImageDataArray);

const undoCount = writable(0);

export { historyPosition, history, undoCount };