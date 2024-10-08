import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/services'],
  coverageProvider: 'babel',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@components': '<rootDir>/src/components',
    '@pages': '<rootDir>/src/app-pages',
    '@statics': '<rootDir>/src/statics',
    '@constants': '<rootDir>/src/constants',
    '@types': '<rootDir>/src/types',
    '@services': '<rootDir>/src/services',
    '@utils': '<rootDir>/src/utils',
    '@app-utils': '<rootDir>/src/app/utils',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
