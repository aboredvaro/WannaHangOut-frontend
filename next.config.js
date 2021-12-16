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
				permanent: true,
			}
		]
	},
	webpack5: true
}
