import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyledToastContainer } from '../components';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>isms management</title>
      </Head>
      <StyledToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
