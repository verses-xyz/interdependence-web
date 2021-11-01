import {getDeclaration} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Fork from "../../components/Fork";
import Signatures from "../../components/Signatures";
import HeadComponent from "../../components/Head";
import Button from "../../components/core/Button";


export default function Declaration({ data, sigs, txId, status }) {
  if (status === 202) {
    return <p>for status: we are handwriting at the moment, please wait 5-10 mins.</p>
  }

  if (status === 200) {
    const {declaration, authors, timestamp} = data
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-blue-20">
        <HeadComponent/>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-10 md:px-10 sm:px-10 lg:px-20 xl:px-20 text-center">
          <div className="flex w-full">
            <div className="flex-1">
            </div>
            <div className="flex-0">
              <Button text="Sign" primary onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
                <p className="font-mono">Sign</p>
              </Button>
              <Button>
                <a className="font-mono" href="/about">About</a>
              </Button>
            </div>
          </div>

          <div className="w-1/2">
            <h1 className="text-3xl font-title my-10 sm:m-10 xl:m-20 sm:text-4xl md:text-5xl lg:text-7xl font-semibold">
              Declaration
              <span className="text-2xl block font-light italic m-5 sm:text-2xl md:text-4xl lg:text-4xl xl:text-7xl">of the</span>
              Interdependence of Cyberspace
            </h1>
          </div>

          <hr/>
          <div className="my-20
            font-body
            text-2xl
            text-justify
            space-y-12
            text-opacity-75
            max-w-3xl
            whitespace-pre-wrap">
            {declaration}
          </div>
          <hr/>
          <div className="mt-20 max-w-3xl">
            <ul className="flex flex-wrap font-mono">
              <p className="py-2 px-4 my-1 mx-2 border border-brown-120 rounded-3xl overflow-hidden">{timestamp}</p>
              {authors.map(author => <li className="my-1 mx-2 overflow-hidden py-2 px-4 rounded-3xl text-brown-120 bg-gray-200" key={author.name}><a href={author.url}>{author.name}</a></li>)}
            </ul>
          </div>

          <hr className="my-20" />

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-10 flex w-1/2">
            <div id="signatureForm" className="flex-1 mx-8">
              <Sign txId={txId} walletKey={""} />
            </div>

            <div className="flex-1 mx-8 sm:mt-10 md:mt-0 lg:mt-0">
              <Fork
                text={declaration} txId={txId} walletKey={""} />
            </div>
          </div>

          <div className="m-24 w-2/5 md:m-12 sm:m-6">
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
