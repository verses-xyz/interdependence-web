import {getDeclaration, getSigs} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Fork from "../../components/Fork";
import Signatures from "../../components/Signatures";
import HeadComponent from "../../components/Head";
import Button from "../../components/core/Button";
import {useAsync} from "react-async-hook";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from 'next/router';
import ScaleLoader from "react-spinners/ScaleLoader";
import React from "react";

const CANONICAL = "e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4";
const ORIGINAL = "pB-rlYjCZJcLK7205sjHzeci6DEsX4PU0xG00GYpahE"
function Header({ show }) {
  return (<div className="flex w-full">
    <div className="sm:block flex-1">
    </div>
    <div className={(show ? 'opacity-100' : 'opacity-0') + " transition duration-500 flex-0 w-full flex justify-end"}>
      <div className="hidden sm:inline-block">
        <Button text="Sign" primary onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
          <p className="font-mono">Sign</p>
        </Button>
      </div>
      <Button>
        <a className="font-mono" href="/about">About</a>
      </Button>
    </div>
  </div>);
}

function Body({ txId, data, status }) {
  if (status === 200) {
    const maybeSigs = useAsync(getSigs, [txId]);
    const {declaration, authors, timestamp, ancestor} = data;

    const isOriginal = ancestor === ""
    const ancestorText = isOriginal ? "A Declaration of the Independence of Cyberspace" : ancestor.slice(0, 12)
    const ancestorUrl = isOriginal ? "https://www.eff.org/cyberspace-independence" : `/declaration/${ancestor}`

    const parsedAuthors = Array.isArray(authors) ? authors : JSON.parse(authors || "[]");
    return (<>
      <hr/>

      <div className="mt-20 font-body text-gray-primary text-2xl text-left space-y-12 max-w-2xl whitespace-pre-wrap">
        {declaration}
        <p className="font-bold text-left text-gray-primary max-w-2xl font-title text-2xl my-8">{timestamp}</p>
        <p className="font-mono text-gray-detail text-base">This Declaration lives on ARWeave under transaction <a className="underline" href={`https://viewblock.io/arweave/tx/${txId}`}>{txId.slice(0,12)}</a>. The most recent ancestor of this document is <a className="underline" href={ancestorUrl}>{ancestorText}</a>.</p>
      </div>

      {parsedAuthors.length > 0 && <>
        <hr className="mt-12" />
        <div className="mt-20 max-w-3xl">
          <ul className="flex flex-wrap font-mono">
            {parsedAuthors.map(author => <li className="my-1 mx-2 overflow-hidden py-2 px-4 rounded-3xl text-gray-120 hover:text-gray-20 bg-gray-200" key={author.name}><a target="_blank" href={author.url}>{author.name}</a></li>)}
          </ul>
        </div>
      </>}

      <hr className="my-20" />
      <div id="signatureForm" className="mx-4 lg:mx-8 w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
        <Sign txId={txId} declaration={declaration} />
      </div>
      <div className="mt-8 mx-4 lg:mx-8 w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
        {(maybeSigs.loading || maybeSigs.error) ?
          <div className="my-4">
            <p className="my-4 font-mono text-xl">Loading signatures</p>
            <ScaleLoader color="#999" height={20} width={5} radius={2} margin={5} />
          </div> :
          <Signatures sigs={maybeSigs.result}/>
        }
      </div>

      <hr className="my-20" />
      <div className="mb-12 mx-4 lg:mx-8 w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
        <Fork text={declaration} txId={txId} />
      </div>
    </>);
  } else if (status === 202) {
    return <div className="w-1/4 font-title">
      <h3 className="text-2xl font-bold">Forking in Progress</h3>
      <p className="text-lg leading-tight my-4">The block containing your new declaration has not been mined yet. Check back in 5-10 minutes.</p>
    </div>;
  } else {
    return <div className="w-1/4 font-title">
      <h3 className="text-2xl font-bold">Not Found</h3>
      <p className="text-lg leading-tight my-4">Either this transaction doesn't exist or the data format is incorrect.</p>
    </div>;
  }
}

export default function Declaration() {
  const router = useRouter();
  const txId = router.query.txId || CANONICAL;
  const maybeDeclaration = useAsync(getDeclaration, [txId]);

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-blue-20">
      <HeadComponent/>
      <main className="flex flex-col items-center min-h-screen w-full flex-1 px-2 sm:px-8 lg:px-8 xl:px-8 text-center">
        <Header show={!maybeDeclaration.loading} />
        <div className="w-full">
          <h1 className="text-4xl font-title my-10 sm:my-10 lg:my-20 sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-gray-primary">
            A Declaration
            <span className="text-2xl block font-light italic -mb-5 sm:-mb-4 md:-mb-1.5 lg:-mb-1 mt-1 sm:mt-2 md:mt-4 lg:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-primary">of the</span>
            {/* Two responsive elements to fix line breaking on xs viewports. */}
            <div className="hidden sm:block max-w-2xl m-auto text-gray-primary" style={{ lineHeight: "5.25rem" }}>Interdependence of Cyberspace</div>
            <div className="sm:hidden max-w-2xl m-auto mt-5 text-gray-primary" style={{ lineHeight: "2.5rem" }}>Interdependence of Cyberspace</div>
          </h1>
        </div>
        {maybeDeclaration.loading ? <BarLoader speedMultiplier=".75" height="2px" width ="300px" color="#bababa"/> : <Body txId={txId} {...maybeDeclaration.result} />}
      </main>
    </div>
  );
}
