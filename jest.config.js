module.exports = {
  setupFiles: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.test.js"], // Only run tests in the tests directory
};
