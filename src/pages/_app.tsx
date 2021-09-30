import Head from "next/head"

import "tailwindcss/tailwind.css"

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>TODO</title>
				<link rel="icon" href="/ico.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
