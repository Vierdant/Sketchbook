import { writable } from 'svelte/store';
import { Tool, activeTool, backgroundColor } from "./session";
import { get } from "svelte/store";

type PencilSettings = {
    size: number;
    color: string;
};

type EraserSettings = {
    size: number;
};

const pencilSettings = writable<PencilSettings>({
    size: 10,
    color: '#000000'
});

const eraserSettings = writable<EraserSettings>({
    size: 25
});

const getToolSettings = () => {
    switch (get(activeTool)) {
        case Tool.Pencil:
            return {
                color: get(pencilSettings).color,
                size: get(pencilSettings).size
            };
        case Tool.Eraser:
            return {
                color: get(backgroundColor),
                size: get(eraserSettings).size
            };
    }
}

export { getToolSettings, pencilSettings, eraserSettings };
