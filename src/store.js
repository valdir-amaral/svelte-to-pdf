import { writable } from "svelte/store";

export const totalPages = writable(0);

export const configs = writable({
    orientation: 'portrait',
    
})