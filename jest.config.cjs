module.exports = {
  preset: "./development/jest/jest.config",
  bail: true,
  rootDir: ".",
  projects: ["<rootDir>/development/*", "<rootDir>/packages/*"],
};
