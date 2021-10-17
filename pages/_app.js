import Head from 'next/head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Wanna Hang Out</title>
				<meta property="og:title" content="Wanna Hang Out" key="title" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
