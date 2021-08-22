import type { AppProps } from 'next/app'
import App from 'next/app'
import { AppMain, Footer, Header } from '@/layout'

const MyApp = ({Component, pageProps}: AppProps) => {
  return <>
    <Header/>
    <AppMain>
      <Component {...pageProps} />
    </AppMain>
    <Footer/>
  </>
}

export default MyApp