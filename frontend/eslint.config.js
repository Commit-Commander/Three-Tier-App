/**
 * ESLint Configuration
 * This configuration is tailored for a React project with modern JavaScript features.
 * It uses plugins for React, React Hooks, and React Refresh to enforce best practices and ensure code quality.
 */

import js from '@eslint/js'; // Provides the core ESLint recommended rules
import globals from 'globals'; // Contains predefined global variables for different environments
import react from 'eslint-plugin-react'; // ESLint plugin for React-specific linting rules
import reactHooks from 'eslint-plugin-react-hooks'; // ESLint plugin for React Hooks-specific linting rules
import reactRefresh from 'eslint-plugin-react-refresh'; // ESLint plugin for React Fast Refresh support

export default [
  // Global settings for files or directories to be ignored
  {
    ignores: ['dist'], // Ignore the `dist` directory
  },
  {
    // Apply these rules to JavaScript and JSX files
    files: ['**/*.{js,jsx}'],

    // Language options for the parser
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020 syntax
      globals: globals.browser, // Include browser global variables
      parserOptions: {
        ecmaVersion: 'latest', // Enable the latest ECMAScript features
        ecmaFeatures: { jsx: true }, // Enable JSX syntax support
        sourceType: 'module', // Use ES module syntax
      },
    },

    // Settings for React version
    settings: {
      react: { version: '18.3' }, // Specify the React version to avoid warnings
    },

    // Define plugins to extend ESLint functionality
    plugins: {
      react, // React-specific linting rules
      'react-hooks': reactHooks, // Enforce React Hooks rules
      'react-refresh': reactRefresh, // Support for React Fast Refresh
    },

    // Linting rules for the project
    rules: {
      // Include recommended rules from the ESLint core configuration
      ...js.configs.recommended.rules,

      // Include recommended rules for React
      ...react.configs.recommended.rules,

      // Include rules for JSX runtime
      ...react.configs['jsx-runtime'].rules,

      // Include recommended rules for React Hooks
      ...reactHooks.configs.recommended.rules,

      // Disable the rule that prevents using `target="_blank"` without `rel="noopener noreferrer"`
      'react/jsx-no-target-blank': 'off',

      // Warn when components are not exported correctly in Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow exports of constants without warnings
      ],
    },
  },
];