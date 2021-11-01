import Head from 'next/head'
import Image from 'next/image'
import {getDeclaration} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Signatures from "../../components/Signatures";
import Fork from "../../components/Fork"


export default function Declaration({ data, sigs, txId, status }) {
  if (status === 202) {
    return <p>for status: we are handwriting at the moment, please wait 5-10 mins.</p>
  }

  if (status === 200) {
    const {declaration, authors, timestamp} = data
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4">
        <Head>
          <title>Interdependence</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-blue-20 ">
          
          {/*
          TODO: SOMEONE MAKE THE HEADER 
          */}
          <div classNamee=""> 
            <Fork text={data} txId={txId} walletKey={""} />
            <a href="/about"> About </a>
          </div>

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
            {declaration}
          </div>
          <p>{timestamp}</p>
          <ul>
            {authors.map(author => <li key={author.name}><a href={author.url}>{author.name}</a></li>)}
          </ul>
          <Sign txId={txId} walletKey={""} />
          <Fork text={declaration} txId={txId} walletKey={""} />
          <Signatures sigs={sigs}/>
        </main>
      </div>
    )
  } else {
    // error
    return <div>can't find that version of the declaration</div>
  }
}

export async function getServerSideProps(context) {
  return {
    props: await getDeclaration(context.params.txId),
  }
}
