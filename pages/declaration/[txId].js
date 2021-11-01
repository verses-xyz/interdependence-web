import {getDeclaration} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Fork from "../../components/Fork";
import Signatures from "../../components/Signatures";
import HeadComponent from "../../components/Head";


export default function Declaration({ data, sigs, txId, status }) {
  if (status === 202) {
    return <p>for status: we are handwriting at the moment, please wait 5-10 mins.</p>
  }

  if (status === 200) {
    const {declaration, authors, timestamp} = data
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-blue-20">
        <HeadComponent/>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="flex w-full">
            <div className="flex-1">
            </div>
            <div className="flex-0">
              <button className="mt-5 px-6 py-2 rounded-full bg-brown-20 text-white text-md" onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
                <p className="font-mono">Sign</p>
              </button>
              <button className="ml-2.5 mt-5 px-6 py-2 rounded-full bg-gray-200 text-brown-120 text-md">
                <a className="font-mono" href="/about">About</a>
              </button>
            </div>
          </div>

          <div className="w-1/2">
            <h1 className="text-7xl font-title m-20 font-semibold">
              Declaration
              <span className="block font-light italic m-5 text-4xl">of the</span>
              Interdependence of Cyberspace
            </h1>
          </div>

          <hr/>
          <div className="mt-10
                        font-body
                        text-2xl
                        text-left
                        space-y-12
                        text-opacity-75
                        max-w-3xl
                        ml-10
                        sm:ml-5
                        whitespace-pre-wrap
                        mb-10">
            {declaration}
          </div>
          <div classname="mt-5">
            <ul className="ml-10 grid grid-cols-5 gap-3 sm:grid-cols-2">
              <p className="p-2 border-2 border-black rounded-3xl overflow-hidden">{timestamp}</p>
                {authors.map(author => <li className=" overflow-hidden p-2 border-2 border-black rounded-3xl bg-brown-80" key={author.name}><a href={author.url}>{author.name}</a></li>)}
            </ul>
          </div>

          <div className="mt-10" id="signatureForm">
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
