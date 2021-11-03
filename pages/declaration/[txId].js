import {getDeclaration, getSigs} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Fork from "../../components/Fork";
import Signatures from "../../components/Signatures";
import HeadComponent from "../../components/Head";
import Button from "../../components/core/Button";
import {useAsync} from "react-async-hook";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from 'next/router';
import React from "react";

export const CANONICAL = "e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4";
export const ORIGINAL = "pB-rlYjCZJcLK7205sjHzeci6DEsX4PU0xG00GYpahE"
function Header({ show }) {
  return (
  <div className="flex w-full">
    <div className={(show ? 'opacity-100' : 'opacity-0') + " transition duration-500 flex-0 w-full space-x-2 lg:space-x-4 flex justify-end"}>
      <Button>
        <a className="font-mono" href="/about">About</a>
      </Button>
      <Button text="Sign" primary onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
        <p className="font-mono">Sign</p>
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
      
      <div className="md:mx-4 mt-16 md:mt-20 font-body leading-9 text-gray-primary text-2xl text-left max-w-2xl whitespace-pre-wrap">
        {declaration}
        <p className="font-bold text-left text-gray-primary font-title text-2xl mt-8">{timestamp}</p>
        <p className="font-mono text-gray-placeholder text-base mt-8">This document lives on Arweave at transaction <a className="underline" href={`https://viewblock.io/arweave/tx/${txId}`}>{txId.slice(0,12)}</a>. It was forked from <a className="underline" href={ancestorUrl}>{ancestorText}</a>.</p>
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
      <div id="signatureForm" className="mx-4 w-full max-w-2xl">
        <Sign txId={txId} declaration={declaration} />
      </div>
      <div className="mt-8 mx-4 max-w-2xl w-full">
        {(maybeSigs.loading || maybeSigs.error) ?
          <div className="my-4">
            <p className="my-4 font-mono text-xl">Loading signatures</p>
            <BarLoader speedMultiplier=".75" height="2px" width ="300px" color="#bababa"/>
          </div> :
          <Signatures sigs={maybeSigs.result}/>
        }
    </div>

      <hr className="my-20" />
        <div className="mx-4 w-full max-w-2xl">
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
    <>
    <div className="flex flex-col items-center bg-gray-bg justify-center pt-8 pb-24 bg-blue-20">
      <HeadComponent/>
      <main className="flex flex-col items-center min-h-screen w-full flex-1 px-4 lg:px-8 text-center">
        <Header show={!maybeDeclaration.loading} />
        <div className="w-full">
          <h1 className="text-4xl font-title mt-16 mb-16 md:mb-20 md:text-7xl font-semibold text-gray-primary">
            A Declaration
            <span className="text-2xl block font-light italic -mb-5 md:-mb-1 mt-1 md:mt-4 text-xl md:text-4xl text-gray-primary">of the</span>
            {/* Two responsive elements to fix line breaking on xs viewports. */}
            <div className="hidden md:block max-w-2xl m-auto text-gray-primary" style={{ lineHeight: "5.25rem" }}>Interdependence of Cyberspace</div>
            <div className="md:hidden max-w-2xl m-auto mt-5 text-gray-primary" style={{ lineHeight: "2.5rem" }}>Interdependence of Cyberspace</div>
          </h1>
        </div>
        {maybeDeclaration.loading ? <BarLoader speedMultiplier=".75" height="2px" width ="300px" color="#bababa"/> : <Body txId={txId} {...maybeDeclaration.result} />}
      </main>
      
    </div>      
    <footer className="sticky bottom-0 bg-gray-primary w-full p-6 mt-2 mb-2 text-sm leading-6 font-mono text-left text-white"> 

        <p className="font-light">
        You are trusted to steward this link. If you're seeing this banner, we are still in soft launch mode.&nbsp; 
        <u>Please do not share this link on social media.</u>
        </p>
    </footer>
      </>
    
  );
}
