// jest.config.js
const path = require('path')
module.exports = {
  rootDir: 'src',
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  testRegex: '\\.spec\\.js$',
  testPathIgnorePatterns: [
    // '<rootDir>/js/lib/'
  ],
  coverageDirectory: path.resolve(__dirname, 'reports/unit/coverage'),
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!ignore/**/*.js'
  ],
  verbose: true
}
