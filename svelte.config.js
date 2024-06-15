import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from "node:path"

const aliases = {
  '$lib': 'src/lib',
  '$components': 'src/components',
  '$assets': 'src/assets',
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
		/** @param {string} url */
		scss: {
			importer(url) {
			// Make import aliases work in SASS.
			for (const [alias, subpath] of Object.entries(aliases)) {
				if (url.startsWith(`${alias}/`)) {
					const file = url.replace(alias, path.join(__dirname, subpath))
					return {file}
				}
			}
		}},
	}),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
    alias: aliases,
	}
};

export default config;
