import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
	appName: 'kick-on',
	brand: {
		displayName: '킥온',
		primaryColor: '#c00c0b',
		icon: 'https://static.toss.im/appsintoss/21251/aa5fdfd5-898a-4d96-bb32-9dadcc838101.png',
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
