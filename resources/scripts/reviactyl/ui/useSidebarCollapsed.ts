import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'hector:sidebar-collapsed';
const listeners = new Set<() => void>();

const read = (): boolean => {
    try {
        return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
        return false;
    }
};

let collapsed = read();

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

export const setSidebarCollapsed = (value: boolean) => {
    collapsed = value;
    try {
        window.localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
    } catch {
        // storage unavailable, keep the in-memory state only
    }
    listeners.forEach((listener) => listener());
};

/**
 * Shared collapsed state for the desktop sidebar so the sidebar and the content
 * offset stay in sync. Persisted per browser.
 */
export const useSidebarCollapsed = (): [boolean, (value: boolean) => void] => {
    const value = useSyncExternalStore(
        subscribe,
        () => collapsed,
        () => false,
    );
    return [value, setSidebarCollapsed];
};
