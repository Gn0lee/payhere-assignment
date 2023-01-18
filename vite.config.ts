import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src/'),
		},
	},
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin'],
			},
		}),
	],

	build: {
		outDir: 'build',
	},

	server: {
		open: true,
		port: 3000,
	},
});
