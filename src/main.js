import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		selector: '#main-content'
	}
});

export default app;