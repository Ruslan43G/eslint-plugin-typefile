# eslint-plugin-typefile

ESLint плагин для проверки того, что все типы и интерфейсы TypeScript объявляются только в файлах `types.ts`.

## Установка

```bash
npm install eslint-plugin-typefile --save-dev
```

## Использование с ESLint 9+ (Flat Config)

### Рекомендованная конфигурация

```javascript
// eslint.config.js
import typefile from 'eslint-plugin-typefile';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      typefile,
    },
    rules: {
      'typefile/no-inline-types': 'error',
    },
  },
];
```

### Использование готовой конфигурации

```javascript
// eslint.config.js
import typefile from 'eslint-plugin-typefile';

export default [
  // Для TypeScript файлов с парсером
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...typefile.configs.recommended,
  },
  
  // Или только правила без парсера
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...typefile.configs['rules-only'],
  },
];
```

## Правила

### `typefile/no-inline-types`

Запрещает объявление типов и интерфейсов вне файлов `types.ts`.

#### ❌ Неправильно

```typescript
// src/components/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

type ButtonVariant = 'primary' | 'secondary';

export const Button = ({ label, onClick }: ButtonProps) => {
  // ...
};
```

#### ✅ Правильно

```typescript
// src/types.ts
export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export type ButtonVariant = 'primary' | 'secondary';
```

```typescript
// src/components/Button.tsx
import type { ButtonProps } from '../types';

export const Button = ({ label, onClick }: ButtonProps) => {
  // ...
};
```

## Конфигурация

Правило не требует дополнительной конфигурации. Оно автоматически разрешает объявление типов в файлах, заканчивающихся на `types.ts`.

## Совместимость

- ESLint 9.0.0+
- TypeScript 5.0.0+
- @typescript-eslint/parser 8.0.0+
