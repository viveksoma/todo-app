export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    "^.+\\.css$": "jest-transform-stub", 
  },
  moduleNameMapper: {
    "^@hello-pangea/dnd$": "<rootDir>/src/__mocks__/@hello-pangea/dnd.js",
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
};
