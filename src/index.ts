import type { ESLint, Linter } from 'eslint';
import { noInlineTypes } from './no-inline-types';

interface PluginConfig {
    name: string;
    meta: {
        name: string;
        version: string;
    };
    rules: Record<string, any>;
    configs: Record<string, Linter.FlatConfig>;
}

const plugin: PluginConfig & ESLint.Plugin = {
    name: 'eslint-plugin-typefile',
    meta: {
        name: 'eslint-plugin-typefile',
        version: '1.0.0',
    },
    rules: { 
        'no-inline-types': noInlineTypes 
    },
    configs: {},
};

// Рекомендованная конфигурация для ESLint 9+ (Flat Config)
plugin.configs.recommended = {
    name: 'eslint-plugin-typefile/recommended',
    plugins: {
        'typefile': plugin
    },
    rules: {
        'typefile/no-inline-types': 'error',
    },
    languageOptions: {
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
};

// Конфигурация только с правилами (без парсера)
plugin.configs['rules-only'] = {
    name: 'eslint-plugin-typefile/rules-only',
    plugins: {
        'typefile': plugin
    },
    rules: {
        'typefile/no-inline-types': 'error',
    },
};

export default plugin;