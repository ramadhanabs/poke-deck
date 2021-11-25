import 'tailwindcss/tailwind.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
