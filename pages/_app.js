import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps: { ...pageProps } }) {
	return (
		// `session` comes from `getServerSideProps` or `getInitialProps`.
		// Avoids flickering/session loading on first load.
		<CookiesProvider>
			<Component {...pageProps} />
		</CookiesProvider>
	);
}
