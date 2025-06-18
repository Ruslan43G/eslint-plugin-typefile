import type { Rule } from 'eslint';

type Config = { ignore?: string[]; }
const DEFAULT_IGNORE: string[] = [];

function normalizePath(str: string): string {
    return str.replace(/\\/g, '/');
}

const noInlineTypes: Rule.RuleModule = {
    meta: {
        type: "problem",
        docs: {
            description: "Types must be declared in 'types.ts' or ignored files: {{ ignore }}, not directly where they are used.",
            category: "Best Practices",
            recommended: false,
        },
        messages: {
            noInlineType: "Type declarations must be located in 'types.ts' or ignored files: {{ ignore }}.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    ignore: {
                        type: "array",
                        items: { type: "string" },
                        default: DEFAULT_IGNORE,
                    },
                },
                additionalProperties: false,
            }
        ],
    },
    create(context: Rule.RuleContext) {
        // Получаем config из eslint
        const config: Config = context.options?.[0] || {};
        const ignore = config.ignore ?? DEFAULT_IGNORE;

        // Получаем имя файла, где производится анализ
        const filename = context.getFilename?.() ?? context.filename ?? '';
        const normalizedFilename = normalizePath(filename)

        // Если имя файла заканчивается на "types.ts || ignore[]", то правило применять не нужно
        const isIgnoredFile = normalizedFilename.endsWith("types.ts") || ignore.some((pattern) => normalizedFilename.endsWith(pattern));

        // Функция для репорта нарушения
        function reportIfNotTypesFile(node: any) {
            // Если имя файла заканчивается на "types.ts || ignore[]", то правило применять не нужно
            if (isIgnoredFile) return;

            context.report({
                node,
                messageId: "noInlineType",
                data: { ignore: ignore.join(', ') }
            });
        }

        return {
            // Проверяем объявление type alias (например, "type MyType = {...}")
            TSTypeAliasDeclaration: reportIfNotTypesFile,
            // Проверяем объявление интерфейсов (например, "interface MyInterface {...}")
            TSInterfaceDeclaration: reportIfNotTypesFile,
        };
    },
};

export default noInlineTypes;