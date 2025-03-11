export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    "^.+\\.css$": "jest-transform-stub", 
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-beautiful-dnd).+\\.js$',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
};
