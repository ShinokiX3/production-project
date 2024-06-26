import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:5173' || 'http://localhost:3000',
    },

    port: 4000,

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
