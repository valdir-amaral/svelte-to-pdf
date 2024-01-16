import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		contentSelector: '#main-content',
		headerSelector: '#header',
		footerSelector: '#footer',
		watermark: '#watermark',
	}
});

export default app;