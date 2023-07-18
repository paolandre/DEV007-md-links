export default {
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  globals: {
    NODE_ENV: 'test',
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true,
  },
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/test/**/*.spec.js',
  ],

};
