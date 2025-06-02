import type { Rule } from 'eslint';

const noInlineTypes: Rule.RuleModule = {
    meta: {
        type: "problem",
        docs: {
            description: "Types must be declared only in the 'types.ts' file, not directly where they are used.",
            category: "Best Practices",
            recommended: false,
        },
        messages: {
            noInlineType: "Type declarations must be located in the 'types.ts' file.",
        },
        schema: []
    },
    create(context: Rule.RuleContext) {
        // Получаем имя файла, где производится анализ
        const filename = context.filename || context.getFilename();
        // Если имя файла заканчивается на "types.ts", то правило применять не нужно
        const isTypesFile = filename.endsWith("types.ts");

        // Функция для репорта нарушения
        function reportIfNotTypesFile(node: any) {
            // Если имя файла заканчивается на "types.ts", то правило применять не нужно
            if (isTypesFile) return;

            context.report({
                node,
                messageId: "noInlineType",
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
