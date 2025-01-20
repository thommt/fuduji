module.exports = {
  root: true,
  env: {
    browser: true, // 浏览器全局变量
    es2021: true, // 启用 ES2021 语法
    node: true, // Node.js 全局变量
  },
  extends: [
    'eslint:recommended', // 启用 ESLint 推荐规则
    'plugin:react/recommended', // React 推荐规则
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
    'plugin:prettier/recommended', // Prettier 推荐规则
  ],
  parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
  parserOptions: {
    ecmaVersion: 2021, // 启用最新的 ECMAScript 语法支持
    sourceType: 'module', // 支持模块化
    ecmaFeatures: {
      jsx: true, // 支持 JSX
    },
  },
  plugins: [
    'react', // React 插件
    '@typescript-eslint', // TypeScript 插件
    'prettier', // Prettier 插件
  ],
  rules: {
    // 自定义规则
    'indent': ['error', 2], // 强制使用两个空格缩进
    'linebreak-style': ['error', 'unix'], // 强制使用 Unix 风格换行符
    'quotes': ['error', 'single'], // 强制使用单引号
    'semi': ['error', 'always'], // 强制在语句末尾添加分号
    'react/react-in-jsx-scope': 'off', // 不强制在 JSX 中引入 React
    '@typescript-eslint/no-unused-vars': ['warn'], // 警告未使用的变量
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf', // 统一换行符为 LF
        semi: true, // 在语句末尾添加分号
        singleQuote: true, // 使用单引号
        tabWidth: 2, // Tab 等价于两个空格
        useTabs: false, // 禁止使用 Tab
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },
};
