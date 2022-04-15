module.exports = {
    // the root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],

    // jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },

    // runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
        '@testing-library/react/cleanup-after-each',
        '@testing-library/jest-dom/extend-expect'
    ],

    // test spec file resolution pattern
    // matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    // module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}