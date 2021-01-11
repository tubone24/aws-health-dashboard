import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Table from '../components/table'

import { RecoilRoot } from 'recoil'



const Home = ({ Component, pageProps }: AppProps): JSX.Element => {

  return (
    <>
      <RecoilRoot>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Table />
      </RecoilRoot>
    </>
  )
}

export default Home
