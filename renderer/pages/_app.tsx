import type { AppProps } from 'next/app';
import 'sweetalert2/src/sweetalert2.scss';
import ReduxProvider from '../redux/provider';
import '../styles/globals.css';
import Layout from './_layout';
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ReduxProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ReduxProvider>
    );
}

export default MyApp;
