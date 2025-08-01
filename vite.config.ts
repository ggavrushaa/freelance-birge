import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
// import fs from 'fs';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    // server: {
    //     https: {
    //         key: fs.readFileSync('./localhost+2-key.pem'),
    //         cert: fs.readFileSync('./localhost+2.pem'),
    //     },
    //     cors: {
    //         origin: ['https://03d884f3c651.ngrok-free.app',"http://localhost:8000"],
    //         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //         allowedHeaders: ['*'],
    //         credentials: true,
    //     },
    // },
});
