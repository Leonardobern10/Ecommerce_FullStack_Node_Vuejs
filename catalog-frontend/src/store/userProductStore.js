import { defineStore } from 'pinia';

export const useProductStore = defineStore('productState', {
    state: () => ({ product: '' }),
    actions: {
        clean() {
            this.product = '';
        },
        save(id) {
            this.product = id;
        },
    },
});
