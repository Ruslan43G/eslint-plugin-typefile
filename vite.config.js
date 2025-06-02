import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts', // точка входа вашего плагина
            name: 'eslint-plugin-typefile', // имя библиотеки (можно любое)
            formats: ['es', 'cjs'], // форматы сборки: ESM и CommonJS
            fileName: (format) => format === 'cjs' ? 'index.cjs' : 'index.es.js', // имена выходных файлов
        },
        rollupOptions: {
            external: ['eslint'], // исключаем ESLint из бандла
            output: [
                {
                    format: 'es',
                    exports: 'named',
                },
                {
                    format: 'cjs',
                    exports: 'default',
                },
            ],
        },
    },
});