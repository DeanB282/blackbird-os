// web/jest.config.cjs
// Plain CJS Jest config for the Next.js web app.
// Uses the official Next.js + Jest setup pattern.

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Path to the Next.js app
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',

  // Keep tests scoped to the simple web specs for now
  testMatch: ['<rootDir>/specs/**/*.spec.(ts|tsx|js|jsx)'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

module.exports = createJestConfig(customJestConfig);
