module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', 'jest-styled-components'],
};
process.env = Object.assign(process.env, {
  DISABLE_MOCKED_WARNING: 'true',
});
