import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
	appName: 'kick-on',
	brand: {
		displayName: '킥온',
		primaryColor: '#c00c0b',
		icon: '/favicon.svg',
	},
	web: {
		host: 'localhost',
		port: 3000,
		commands: {
			dev: 'vite',
			build: 'vite build',
		},
	},
	permissions: [],
	outdir: 'dist',
});
