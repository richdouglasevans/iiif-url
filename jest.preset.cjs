/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.[t]sx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testEnvironment: "node",
};
