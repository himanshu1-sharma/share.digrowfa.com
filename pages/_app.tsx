import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '~video-react/dist/video-react.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
