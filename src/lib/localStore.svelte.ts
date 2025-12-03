import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export class LocalStore<T> {
    value: Writable<T>;
    key = '';

    constructor(key: string, initialValue: T) {
        this.key = key;
        this.value = writable(initialValue);

        if (browser) {
            const item = localStorage.getItem(key);
            if (item) {
                try {
                    this.value.set(this.deserialize(item));
                } catch (e) {
                    console.error('Failed to deserialize:', e);
                    this.value.set(initialValue);
                }
            }

            // Subscribe to store changes and persist to localStorage
            this.value.subscribe((currentValue) => {
                try {
                    localStorage.setItem(this.key, this.serialize(currentValue));
                } catch (e) {
                    console.error('Failed to serialize:', e);
                }
            });
        }
    }

    serialize(value: T): string {
        if (value instanceof Map) {
            return JSON.stringify({
                __type: 'Map',
                data: Array.from(value.entries())
            });
        }
        return JSON.stringify(value);
    }

    deserialize(item: string): T {
        const parsed = JSON.parse(item);

        if (parsed.__type === 'Map' && Array.isArray(parsed.data)) {
            return new Map(parsed.data) as T;
        }

        return parsed;
    }
}

export function localStore<T>(key: string, value: T) {
    return new LocalStore(key, value);
}
