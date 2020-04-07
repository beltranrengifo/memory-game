// jest.config.js
const path = require('path')
module.exports = {
  rootDir: 'src',
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testRegex: '\\.spec\\.js$',
  testPathIgnorePatterns: [
    '<rootDir>/js/lib/'
  ],
  coverageDirectory: path.resolve(__dirname, 'reports/unit/coverage'),
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!ignore/**/*.js'
  ],
  verbose: true
}
