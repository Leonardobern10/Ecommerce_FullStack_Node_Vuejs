module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    rules: { 'vue/no-v-model-argument': 'off' },
};
