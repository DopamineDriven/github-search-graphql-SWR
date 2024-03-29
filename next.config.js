const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')(
	{
		enabled: !!process.env.ANALYZE
	}
);

module.exports = withBundleAnalyzer({
	webpack(
		config,
		{
			dev = process.env.NODE_ENV === 'development',
			isServer = typeof window === 'undefined'
		}
	) {
		if (isServer) {
			require('./scripts/generate-sitemap');
		}
		/**
		 * !dev ? preact/compat : react, react-dom on build
		 * reduce page weight in production by ~10%
		 */
		if (!dev && !isServer) {
			Object.assign(
				(config.resolve.alias['@/'] = path.resolve('./')),
				{
					react: 'preact/compat',
					'react-dom': 'preact/compat'
				}
			);
		}
		config.module.rules.push({
			test: /\.ya?ml$/,
			type: 'json',
			use: 'yaml-loader'
		});
		return config;
	},
	reactStrictMode: true,
	sourceMaps: {
		productionBrowserSourceMaps: true
	},
	images: {
		domains: [
			'avatars.githubusercontent.com',
			'github.githubassets.com',
			'serve.onegraph.com',
			'onegraph.com',
			'api.github.com',
			'repository-images.githubusercontent.com'
		]
	},
	future: {
		webpack5: true,
		strictPostcssConfiguration: true
	},
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US'
	}
});

console.log(
	'next.config.js',
	JSON.stringify(module.exports, null, 2)
);
