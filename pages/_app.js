import 'tailwindcss/tailwind.css';
import './styles.css';
import {MetaMaskProvider} from "metamask-react";

function MyApp({ Component, pageProps }) {
  return <MetaMaskProvider>
    <Component {...pageProps} />
  </MetaMaskProvider>;
}

export default MyApp;
