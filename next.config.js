module.exports = {
	basePath: '',
	async redirects() {
		return [
			{
				source: '/404',
				destination: '/',
				permanent: true,
			},
			{
				source: '/',
				destination: '/activities',
				permanent: false,
			}
		]
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	webpack5: true
}
