/* eslint-disable no-undef */
module.exports = {
	basePath: '',
	async redirects() {
		return [
			{
				source: '/404',
				destination: '/',
				permanent: true,
			}
		]
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	webpack5: true,
	env: {
		DB_HOST_PRODUCTION: process.env.REACT_APP_DB_HOST_PRODUCTION,
		DB_USER_PRODUCTION: process.env.REACT_APP_DB_USER_PRODUCTION,
		DB_PASSWORD_PRODUCTION: process.env.REACT_APP_DB_PASSWORD_PRODUCTION,
		DB_NAME_PRODUCTION: process.env.REACT_APP_DB_NAME_PRODUCTION,
		DB_HOST_DEV: process.env.REACT_APP_DB_HOST_DEV,
		DB_USER_DEV: process.env.REACT_APP_DB_USER_DEV,
		DB_PASSWORD_DEV: process.env.REACT_APP_DB_PASSWORD_DEV,
		DB_NAME_DEV: process.env.REACT_APP_DB_NAME_DEV,
		SERVER_PRODUCTION: process.env.REACT_APP_SERVER_PRODUCTION,
		SERVER_DEV: process.env.REACT_APP_DB_SERVER_DEV,
	},
}
