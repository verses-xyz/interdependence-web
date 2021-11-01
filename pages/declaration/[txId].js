import Head from 'next/head';
import Image from 'next/image';
import {getDeclaration} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Fork from "../../components/Fork";
import Signatures from "../../components/Signatures";


export default function Declaration({ data, sigs, txId, status }) {
  if (status === 202) {
    return <p>for status: we are handwriting at the moment, please wait 5-10 mins.</p>
  }

  if (status === 200) {
    const {declaration, authors, timestamp} = data
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-blue-20">
        <Head>
          <title>Interdependence</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full max-w-3xl flex-1 px-20 text-center">
          <div className="flex w-full">
            <div className="flex-1">
            </div>
            <div className="flex-0">
              <button className="mt-5 px-6 py-2 rounded-full bg-brown-20 text-white text-md" onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
                <p className="font-mono">Sign</p>
              </button>
              <button className="ml-2.5 mt-5 px-6 py-2 rounded-full bg-gray-200 text-brown-120 text-md">
                <p className="font-mono">About</p>
              </button>
            </div>
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
                        whitespace-pre-wrap
                        mb-10">
            {declaration}
          </div>

          <div classname="mt-5">
            <ul className="ml-10 grid grid-cols-5 gap-3">
              <p className="p-2 border-2 border-black rounded-3xl">{timestamp}</p>
                {authors.map(author => <li className="p-2 border-2 border-black rounded-3xl bg-brown-80" key={author.name}><a href={author.url}>{author.name}</a></li>)}
            </ul>
          </div>
          
          <div className="mt-10">
            <Sign txId={txId} walletKey={""} />
          </div>

          <div className="mt-10">
            <Fork 
              text={declaration} txId={txId} walletKey={""} />
          </div>

          <div className="mt-10"> 
            <Signatures sigs={sigs}/>
          </div>
        </main>
      </div>
    );
  } else {
    // error
    return <div>can't find that version of the declaration</div>;
  }
}

export async function getServerSideProps(context) {
  return {
    props: await getDeclaration(context.params.txId),
  };
}
