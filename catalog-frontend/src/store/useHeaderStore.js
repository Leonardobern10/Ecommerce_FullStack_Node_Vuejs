import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('headerStore', {
    state: () => ({ header: true }),
    actions: {
        async showHeader() {
            this.header = true;
        },
        async hideHeader() {
            this.header = false;
        },
    },
});
