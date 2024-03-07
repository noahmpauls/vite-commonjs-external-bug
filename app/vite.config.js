import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
        include: [
            "test-package"
        ]
    },
    build: {
        commonjsOptions: {
            include: [
                "/package/", "/node_modules/"
            ]
        }
    }
})