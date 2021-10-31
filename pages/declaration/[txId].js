import Head from 'next/head'
import Image from 'next/image'
import {getDeclaration} from "../../arweaveFns";
import Sign from "../../components/Sign";

export default function Declaration({ data, sigs, txId }) {
  console.log(sigs)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <Head>
        <title>Interdependence</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-blue-20 ">
        <h1 className="text-2xl font-body mt-20 italic">
          A Declaration of the Interdependence of Cyberspace
        </h1>
        <div className="mt-10
                        font-body
                        text-2xl
                        text-left
                        space-y-12
                        text-opacity-75
                        max-w-4xl
                        ml-10
                        sm:ml-5
                        lg:ml-20
                        xl:mx-40
                        whitespace-pre-wrap">
          {data}
        </div>
        <Sign txId={txId} />

        <br/>
        <h2 className="font-body">Signatures</h2>
        <div>
          {sigs.map(sig => <div className="font-body">
            <h3>{sig.SIG_NAME}, @{sig.SIG_HANDLE}</h3>
            <a href={`https://arweave.net/tx/${sig.SIG_ID}`}>tx: {sig.SIG_TX.slice(0, 30)}</a>
          </div>)}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: await getDeclaration(context.params.txId),
  }
}
