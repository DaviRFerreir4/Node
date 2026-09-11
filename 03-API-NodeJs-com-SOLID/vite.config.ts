import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          name: 'unit',
          dir: 'src/use-cases',
        },
      },
      {
        plugins: [tsconfigPaths()],
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment:
            'prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ],
  },
})
