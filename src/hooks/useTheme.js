'use client';

import { useSyncExternalStore, useCallback, useState, useEffect } from 'react';

// Singleton global state
let currentTheme = 'dark';
const listeners = new Set();

function emitChange() {
    listeners.forEach((listener) => listener());
}

function subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function getSnapshot() {
    if (typeof window === 'undefined') return 'dark';
    return currentTheme;
}

function getServerSnapshot() {
    return 'dark';
}

// Client-side initialization
if (typeof window !== 'undefined') {
    try {
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') {
            currentTheme = saved;
        } else if (document.documentElement.classList.contains('dark')) {
            currentTheme = 'dark';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            currentTheme = 'light';
        } else {
            currentTheme = 'dark';
        }
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    } catch (e) {}

    // Listen to changes in other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
            setGlobalTheme(e.newValue);
        }
    });

    // Listen to OS preference change if user has no stored theme
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const saved = localStorage.getItem('theme');
            if (!saved) {
                setGlobalTheme(e.matches ? 'dark' : 'light');
            }
        };
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleChange);
        }
    }
}

export function setGlobalTheme(nextTheme) {
    if (nextTheme !== 'dark' && nextTheme !== 'light') return;
    currentTheme = nextTheme;
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('theme', nextTheme);
            document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        } catch (e) {}
    }
    emitChange();
}

export function toggleTheme() {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    setGlobalTheme(next);
}

const emptySubscribe = () => () => {};
const getClientMounted = () => true;
const getServerMounted = () => false;

export function useTheme() {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const mounted = useSyncExternalStore(emptySubscribe, getClientMounted, getServerMounted);

    useEffect(() => {
        if (document.documentElement.classList.contains('dark') !== (currentTheme === 'dark')) {
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        }
    }, []);

    const changeTheme = useCallback(() => {
        toggleTheme();
    }, []);

    return [theme, changeTheme, mounted];
}
