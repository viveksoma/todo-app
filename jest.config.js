export default {
    transform: {
      "^.+\\.tsx?$": "babel-jest",
      "^.+\\.css$": "jest-transform-stub", 
    },
    testEnvironment: "jsdom",
};
  