import type { TypeA } from '../types'
import Head from 'next/head'


const Example: TypeA = {
  name: 'next',
}

export default function Home() {
  return <>
    <Head>
      <title>首页</title>
    </Head>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>
        <p>{Example.name}</p>
      </h1>
    </div>
  </>
}

