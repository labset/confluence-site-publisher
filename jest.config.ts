// noinspection JSUnusedGlobalSymbols

import type { Config } from 'jest';

export default async (): Promise<Config> => {
    return {
        collectCoverage: true,
        coverageDirectory: 'dist/coverage',
        preset: 'ts-jest',
        testEnvironment: 'node',
        roots: ['<rootDir>/modules'],
        globalSetup: '<rootDir>/modules/_test/global-setup.ts',
        globalTeardown: '<rootDir>/modules/_test/global-teardown.ts',
        testMatch: ['**/?(*.)+(spec|test).+(ts|tsx)'],
        verbose: true,
        transform: {
            '^.+\\.tsx?$': 'ts-jest'
        }
    };
};
