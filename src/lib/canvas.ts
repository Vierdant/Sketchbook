import { historyPosition, history, undoCount } from './stores/history';
import { backgroundColor } from './stores/session';
import { get } from 'svelte/store';

const clearCanvas = (context) => {
    context.fillStyle = get(backgroundColor);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    historyPosition.set(-1);
    undoCount.set(0);
    history.set([]);
}

export { clearCanvas }