import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    test: {
        environment: 'jsdom', // Utilisation de jsdom pour les tests DOM
        globals: true, // Permet d'utiliser des variables globales comme `describe`, `it`, etc.
        include: ['**/*.{test,spec}.ts'], // Filtres les fichiers de tests
        coverage: {
            provider: 'v8', // Fournisseur de couverture de code
            reporter: ['text', 'html'], // Rapports de couverture
        },
    },
    plugins: [
        vue(), // Le plugin Vue pour les tests
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'), // Alias pour les imports
        },
    },
});
