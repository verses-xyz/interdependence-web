import {getDeclaration} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Fork from "../../components/Fork";
import Signatures from "../../components/Signatures";
import HeadComponent from "../../components/Head";
import Button from "../../components/core/Button";


export default function Declaration({ data, sigs, txId, status }) {
  if (status === 202) {
    return (
      <div className="my-20 max-w-lg m-auto">
        <HeadComponent/>
        <p className="text-center text-sm font-mono">Indexing in progress, please wait 5-10 minutes for the document to be written to Arweave.</p>
      </div>
    );
  }

  if (status === 200) {
    const {declaration, authors, timestamp} = data;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-blue-20">
        <HeadComponent/>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-10 lg:px-20 xl:px-20 text-center">
          <div className="flex w-full mb-8 sm:mb-0">
            <div className="hidden sm:block flex-1">
            </div>
            <div className="flex-0 w-full flex justify-center sm:justify-end">
              <Button text="Sign" primary onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
                <p className="font-mono">Sign</p>
              </Button>
              <Button>
                <a className="font-mono"
                  // href="/about"
                  >
                    About</a>
              </Button>
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-4xl font-title my-10 sm:my-10 xl:my-20 sm:text-4xl md:text-5xl lg:text-7xl font-semibold">
              Declaration
              <span className="text-2xl block font-light italic -mb-5 sm:-mb-4 md:-mb-1.5 lg:-mb-1 mt-1 sm:mt-2 md:mt-4 lg:mt-4 text-xl sm:text-2xl md:text-3xl xl:text-4xl">of the</span>
              {/* Two responsive elements to fix line breaking on xs viewports. */}
              <div className="hidden sm:block max-w-2xl m-auto" style={{ lineHeight: "5.25rem" }}>Interdependence of Cyberspace</div>
              <div className="sm:hidden max-w-2xl m-auto mt-5" style={{ lineHeight: "2.5rem" }}>Interdependence of Cyberspace</div>
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
              {authors.map(author => <li className="my-1 mx-2 overflow-hidden py-2 px-4 rounded-3xl text-brown-120 hover:text-brown-20 bg-gray-200" key={author.name}><a href={author.url}>{author.name}</a></li>)}
            </ul>
          </div>

          <hr className="my-20" />

          <div className="grid grid-cols-1 lg:grid-cols-2 flex w-full sm:w-4/5 md:w-1/2 lg:w-3/5">
            <div id="signatureForm" className="flex-1 mx-4 xl:mx-8">
              <p className="font-mono">
                To endorse this declaration, you can sign by clicking the button below. Signatures will become part of this document's permanent history on the Arweave blockchain.
              </p>
              <p className="text-gray-400 font-mono mt-2"> * Coming soon * </p>
              <Button
                primary>
                Sign
              </Button>
              {/* <Sign txId={txId} walletKey={""} /> */}
            </div>

            <div className="flex-1 mt-20 lg:mt-0 mx-4 xl:mx-8">
              <Fork
                text={declaration} txId={txId} walletKey={""} />
            </div>
          </div>

          <div className="m-24 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 md:m-12 sm:m-6">
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
