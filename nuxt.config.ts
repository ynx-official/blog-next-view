import { appDescription } from './constants/index';

export default defineNuxtConfig({
	modules: [
		'@vueuse/nuxt',
		'@unocss/nuxt',
		'@pinia/nuxt',
		'@nuxtjs/color-mode',
		'@nuxt/ui',
		'@nuxtseo/module',
		'@formkit/auto-animate/nuxt',
		'nuxt-markdown-render',
	],

	nuxtMarkdownRender: {
		as: 'article',
		vueRuntimeCompiler: true,
		global: true,
		options: {
			html: true,
			linkify: true,
			xhtmlOut: true,
		},
	},

	linkChecker: {
		enabled: false,
		showLiveInspections: false,
		runOnBuild: false,
	},

	site: {
		url: 'https://mrsunshine.cn',
		name: '魚的小屋',
		description:
			'A Web Developer. Code for Fun. AKA ZZSLL, Violet, Vio, VioVin, Lnbiuc, kunkida, hi@lnbiuc.com',
		defaultLocale: 'ch',
		identity: {
			type: 'Person',
		},
		github: 'lnbiuc',
		email: 'hi@lnbiuc.com',
		trailingSlash: true,
		twitterCard: 'summary_large_image',
		twitterSite: '@ZZSLL_53387',
		twitterCreator: '@ZZSLL_53387',
		twitterImage: 'https://vio.vin/favicon.ico',
	},

	experimental: {
		// when using generate, payload js assets included in sw precache manifest
		// but missing on offline, disabling extraction it until fixed
		payloadExtraction: false,
		// inlineSSRStyles: false,
		renderJsonPayloads: true,
		typedPages: true,
	},

	colorMode: {
		classSuffix: '',
	},

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			viewport: 'width=device-width,initial-scale=1',
			link: [
				{ rel: 'icon', href: '/favicon.ico', sizes: 'any' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
			],
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: appDescription },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
			],
			// umami analytics
			script: [
				{
					async: true,
					src: 'https://analytics.eu.umami.is/script.js',
					'data-website-id': 'afdca035-1988-40f8-89a0-e9ed73267348',
				},
			],
		},
	},

	runtimeConfig: {
		public: {
			// 公共运行时配置，可以在客户端访问
			apiURL: process.env.NUXT_API_URL,
			// 其他公共配置...
		},
		private: {
			// 私有运行时配置，只能在服务器端访问
			apiKey: process.env.NUXT_API_KEY,
			// 其他私有配置...
		},
	},

	devtools: {
		enabled: true,
	}
});
