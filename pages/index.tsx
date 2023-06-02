import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navigation from './Includes/Navigation/Navigation'
import DownloadButton from './Includes/DownloadButton/DownloadButton'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Digrowfa | Digitally Grow Fast.</title>
        <meta name="description" content="World's 1st Complete Digital Growth Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <section className='container-fluid p-0'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className={styles.headerText}>
                <h1>Worlds 1st Complete Digital <br /> Growth Platform</h1>
                <p>It is a long established fact that a reader will be distracted by the readable <br /> content of a page when looking at its layout.</p>
                <div className='d-flex justify-content-center'>
                  <DownloadButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
