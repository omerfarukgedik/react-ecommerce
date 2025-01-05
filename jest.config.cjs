module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/_mocks_/fileMock.cjs',
    '^.+\\.svg$': '<rootDir>/_mocks_/fileMock.cjs',
  },
  collectCoverageFrom: [
    'src//*.{js,jsx}',
    '!src//*.d.ts',
    '!src/main.jsx',
    '!src/vite-env.d.ts',
    '!/node_modules/',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};
