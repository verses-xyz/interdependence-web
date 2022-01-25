import {getCharter, fetchSignatures} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Signatures from "../../components/Signatures";
import HeadComponent from "../../components/Head";
import Button from "../../components/core/Button";
import {useAsync} from "react-async-hook";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from 'next/router';
import React from "react";
import ReactMarkdown from 'react-markdown'

const CANONICAL = process.env.CANONICAL || "mJvuy-UJ1dP_30HYx1QJtGuNJDvTB2PWCd-Ebi1bUBE";

function Header({ show }) {
  return (
  <div className="flex w-full">
    <div className={(show ? 'opacity-100' : 'opacity-0') + " transition duration-500 flex-0 w-full space-x-2 lg:space-x-4 flex justify-end"}>
      <Button text="Sign" primary onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
        <p className="font-mono">Sign</p>
      </Button>
    </div>
  </div>);
}

function Body({ txId, data, status }) {
  if (status === 200) {
    const maybeSigs = useAsync(fetchSignatures, [txId]);
    const [clientSigList, setClientSigList] = React.useState([])

    React.useEffect(() => {
      if (maybeSigs.result) {
        setClientSigList(maybeSigs.result)
      }
    }, [maybeSigs.result])

    const {body, title, authors, timestamp} = data;

    const parsedAuthors = Array.isArray(authors) ? authors : JSON.parse(authors || "[]");
    return (<>
      <hr/>
      <div className="md:mx-4 mt-16 md:mt-20 font-body text-gray-primary text-left max-w-2xl">
        {title && <h2 className="text-4xl my-16 font-bold text-center">{title}</h2>}
        <ReactMarkdown className="prose prose-2xl">{body}</ReactMarkdown>
        <p className="font-bold text-left text-gray-primary font-title text-2xl mt-8">{timestamp}</p>
        <p className="font-mono text-gray-placeholder text-base mt-8">
          This document lives on Arweave at transaction <a className="underline" href={`https://viewblock.io/arweave/tx/${txId}`}>{txId.slice(0,12)}</a>.
        </p>
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
        <Sign txId={txId} charter={body} />
      </div>
      <div className="mt-8 mx-4 max-w-2xl w-full">
        {(maybeSigs.loading || maybeSigs.error) ?
          <div className="my-4">
            <p className="my-4 font-mono text-xl">Loading signatures</p>
            <BarLoader speedMultiplier=".75" height="2px" width ="300px" color="#bababa"/>
          </div> :
          <Signatures txId={txId} sigs={clientSigList} setSigs={setClientSigList} />
        }
     </div>
    </>);
  } else {
    return <div className="w-1/4 font-title">
      <h3 className="text-2xl font-bold">Not Found</h3>
      <p className="text-lg leading-tight my-4">Either this transaction doesn't exist or the data format is incorrect.</p>
    </div>;
  }
}

export default function Charter() {
  const router = useRouter();
  const txId = router.query.txId || CANONICAL;
  const maybeCharter = useAsync(getCharter, [txId]);

  return (
    <>
    <div className="flex flex-col items-center bg-gray-bg justify-center pt-8 pb-24 bg-blue-20">
      <HeadComponent/>
      <main className="flex flex-col items-center min-h-screen w-full flex-1 px-4 lg:px-8 text-center">
        <Header show={!maybeCharter.loading} />
        <div className="w-3/5">
          <h1 className="text-4xl font-title mt-16 mb-16 md:mb-20 md:text-7xl font-semibold text-gray-primary">
            Founding Charter
          </h1>
        </div>
        {maybeCharter.loading ? <BarLoader speedMultiplier=".75" height="2px" width ="300px" color="#bababa"/> : <Body txId={txId} {...maybeCharter.result} />}
      </main>
      
    </div>
    </>
  );
}
