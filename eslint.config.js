const globals = require('globals');
const js = require('@eslint/js'); // Это может не работать, так как @eslint/js сам является ES модулем
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
const pluginPrettier = require('eslint-plugin-prettier');

module.exports = [
	// Рекомендуемые правила ESLint для JavaScript
	js.configs.recommended,

	// Конфигурации для TypeScript
	...tseslint.configs.recommended, // Включает @typescript-eslint/eslint-recommended и @typescript-eslint/recommended

	// Конфигурации Prettier (должны идти последними, чтобы отключать конфликтующие правила)
	prettier, // Отключает конфликтующие правила ESLint
	{
		// Настройка плагина Prettier
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					useTabs: true,
					trailingComma: 'all',
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: 'auto',
				},
			],
		},
	},
	// Ваши пользовательские правила или отключения
	{
		rules: {
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/explicit-function-return-type': 'warn',
		},
	},
];
