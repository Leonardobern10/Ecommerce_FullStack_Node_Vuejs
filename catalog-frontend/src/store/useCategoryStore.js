import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('currentCategory', {
    state: () => ({ category: '' }),
    actions: {
        clean() {
            this.category = '';
        },
        save(typeCategory) {
            this.category = typeCategory.toUpperCase();
        },
    },
});
